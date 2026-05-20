'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { Note } from '@/types';
import { Plus, Search, Tag, Trash2, Edit2, Save, X, LogOut, Sparkles, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const channelRef = useRef<any>(null);

  useEffect(() => {
    let isMounted = true;
    
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (isMounted) {
        if (session) {
          setUser(session.user);
          fetchNotes(session.user.id);
          subscribeToNotes(session.user.id);
        } else {
          router.push('/login');
        }
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (isMounted) {
        if (session) {
          setUser(session.user);
          fetchNotes(session.user.id);
        } else {
          router.push('/login');
        }
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [router]);

  const fetchNotes = async (userId: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', userId)
        .order('updated_at', { ascending: false });
      
      if (!error && data) {
        setNotes(data);
      }
    } catch (e) {
      console.error('Error fetching notes:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const subscribeToNotes = (userId: string) => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    channelRef.current = supabase
      .channel('notes_realtime')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notes',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotes(prev => [payload.new as Note, ...prev]);
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'notes',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotes(prev => 
            prev.map(note => 
              note.id === (payload.new as Note).id ? (payload.new as Note) : note
            ).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
          );
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'notes',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => {
          setNotes(prev => prev.filter(note => note.id !== (payload.old as Note).id));
        }
      )
      .subscribe((status) => {
        console.log('Realtime subscription status:', status);
      });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const openModal = (note?: Note) => {
    if (note) {
      setEditingNote(note);
      setTitle(note.title);
      setContent(note.content);
      setTagsInput(note.tags.join(', '));
    } else {
      setEditingNote(null);
      setTitle('');
      setContent('');
      setTagsInput('');
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingNote(null);
    setTitle('');
    setContent('');
    setTagsInput('');
  };

  const saveNote = async () => {
    if (!user) return;
    setIsSaving(true);
    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const now = new Date().toISOString();

    try {
      if (editingNote) {
        const updatedNote = {
          ...editingNote,
          title,
          content,
          tags,
          updated_at: now,
        };
        setNotes(prev =>
          prev.map(note =>
            note.id === editingNote.id ? updatedNote : note
          ).sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
        );

        await supabase
          .from('notes')
          .update({
            title,
            content,
            tags,
            updated_at: now,
          })
          .eq('id', editingNote.id);
      } else {
        const tempId = Date.now().toString();
        const newNote: Note = {
          id: tempId,
          title,
          content,
          tags,
          user_id: user.id,
          created_at: now,
          updated_at: now,
        };
        setNotes(prev => [newNote, ...prev]);

        const { data } = await supabase.from('notes').insert({
          title,
          content,
          tags,
          user_id: user.id,
        }).select().single();

        if (data) {
          setNotes(prev =>
            prev.map(note =>
              note.id === tempId ? data : note
            )
          );
        }
      }
      closeModal();
    } catch (error) {
      console.error('Error saving note:', error);
      fetchNotes(user.id);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteNote = async (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));

    try {
      await supabase.from('notes').delete().eq('id', id);
    } catch (error) {
      console.error('Error deleting note:', error);
      if (user) {
        fetchNotes(user.id);
      }
    }
  };

  const allTags = Array.from(new Set(notes.flatMap(note => note.tags)));

  const filteredNotes = notes.filter(note => {
    const matchesSearch = !searchQuery ||
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = !selectedTag || note.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 min-h-screen">
        <nav className="border-b border-white/10 bg-white/5 backdrop-blur-2xl">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-24 items-center">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/20 animate-pulse-glow">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                  Notes
                </h1>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 px-8 py-4 text-white/70 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                  <LogOut size={24} />
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </div>
          </div>
        </nav>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="flex flex-col lg:flex-row gap-10">
            <div className="flex-1">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12 gap-6">
                <div className="relative flex-1 w-full sm:max-w-lg">
                  <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white/40" size={26} />
                  <input
                    type="text"
                    placeholder="Search notes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-16 pr-8 py-5 bg-white/5 border border-white/10 rounded-3xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 text-lg"
                  />
                </div>
                <button
                  onClick={() => openModal()}
                  className="flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-3xl font-semibold text-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-1"
                >
                  <Plus size={26} />
                  New Note
                </button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-12 h-12 text-purple-400 animate-spin" />
                    <p className="text-white/60 text-lg">Loading notes...</p>
                  </div>
                </div>
              ) : filteredNotes.length === 0 ? (
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-6">
                      <Sparkles className="w-12 h-12 text-white/30" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">No notes yet</h3>
                    <p className="text-white/60 text-lg mb-8">Create your first note to get started</p>
                    <button
                      onClick={() => openModal()}
                      className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-purple-700 hover:to-blue-700 transition-all duration-300"
                    >
                      <Plus size={22} />
                      Create First Note
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {filteredNotes.map((note, index) => (
                    <div
                      key={note.id}
                      className="group bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-9 hover:border-white/25 hover:bg-white/10 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 animate-slide-up"
                      style={{ animationDelay: `${Math.min(index * 50, 300)}ms` }}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <h3 className="text-2xl font-bold text-white flex-1 mr-4 truncate">{note.title}</h3>
                        <div className="flex gap-3">
                          <button
                            onClick={() => openModal(note)}
                            className="p-3 text-white/50 hover:text-purple-400 hover:bg-purple-500/10 rounded-2xl transition-all duration-300"
                          >
                            <Edit2 size={20} />
                          </button>
                          <button
                            onClick={() => deleteNote(note.id)}
                            className="p-3 text-white/50 hover:text-red-400 hover:bg-red-500/10 rounded-2xl transition-all duration-300"
                          >
                            <Trash2 size={20} />
                          </button>
                        </div>
                      </div>
                      <p className="text-white/60 line-clamp-4 mb-8 leading-relaxed text-lg">{note.content}</p>
                      {note.tags.length > 0 && (
                        <div className="flex flex-wrap gap-3">
                          {note.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-5 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-purple-300 text-sm font-semibold rounded-full border border-purple-500/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="w-full lg:w-80">
              <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-10 sticky top-10">
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-4">
                  <Tag size={28} className="text-purple-400" />
                  Tags
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedTag(null)}
                    className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 font-semibold ${
                      !selectedTag
                        ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/20'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    All Notes
                    <span className="float-right text-white/40">{notes.length}</span>
                  </button>
                  {allTags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      className={`w-full text-left px-6 py-4 rounded-2xl transition-all duration-300 font-semibold ${
                        selectedTag === tag
                          ? 'bg-gradient-to-r from-purple-600/20 to-blue-600/20 text-purple-300 border border-purple-500/20'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {tag}
                      <span className="float-right text-white/40">
                        {notes.filter(n => n.tags.includes(tag)).length}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-6 z-50 animate-fade-in">
            <div className="bg-slate-900/95 backdrop-blur-3xl rounded-3xl border border-white/10 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up">
              <div className="p-10 border-b border-white/10 flex justify-between items-center">
                <h2 className="text-4xl font-bold text-white">
                  {editingNote ? 'Edit Note' : 'New Note'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-4 text-white/50 hover:text-white hover:bg-white/10 rounded-2xl transition-all duration-300"
                >
                  <X size={32} />
                </button>
              </div>
              <div className="p-10 space-y-8">
                <div>
                  <label className="block text-base font-semibold text-white/80 mb-4">Title</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-7 py-5 bg-white/5 border border-white/10 rounded-3xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 text-xl"
                    placeholder="Note title"
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-white/80 mb-4">Content</label>
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full px-7 py-5 bg-white/5 border border-white/10 rounded-3xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 min-h-[260px] resize-none text-xl leading-relaxed"
                    placeholder="Write your note..."
                  />
                </div>
                <div>
                  <label className="block text-base font-semibold text-white/80 mb-4">
                    Tags (comma separated)
                  </label>
                  <input
                    type="text"
                    value={tagsInput}
                    onChange={(e) => setTagsInput(e.target.value)}
                    className="w-full px-7 py-5 bg-white/5 border border-white/10 rounded-3xl text-white placeholder-white/40 focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all duration-300 text-xl"
                    placeholder="work, personal, ideas"
                  />
                </div>
                <div className="flex gap-5 pt-6">
                  <button
                    onClick={saveNote}
                    disabled={isSaving}
                    className="flex-1 flex items-center justify-center gap-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-3xl font-semibold text-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-0.5 disabled:opacity-50"
                  >
                    {isSaving ? <Loader2 size={26} className="animate-spin" /> : <Save size={26} />}
                    {isSaving ? 'Saving...' : 'Save Note'}
                  </button>
                  <button
                    onClick={closeModal}
                    disabled={isSaving}
                    className="px-10 py-5 border border-white/10 text-white/80 rounded-3xl font-semibold text-xl hover:bg-white/5 transition-all duration-300 disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
