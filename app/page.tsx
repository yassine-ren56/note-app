'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="flex justify-between items-center mb-16">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold">Notes</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-8 py-3 text-white/80 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-8 py-3 bg-white text-slate-900 rounded-xl font-semibold hover:bg-gray-100 transition-all"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 border border-white/20 rounded-full mb-8">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium">Experience the future of note-taking</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Elevate Your
            </span>
            <br />
            Thoughts
          </h1>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            A sophisticated, secure, and beautifully designed notes application.
            Capture your ideas with elegance and keep them synced across all devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Start Your Journey
              <ArrowRight size={20} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-3 bg-white/10 text-white px-10 py-5 rounded-2xl font-semibold text-lg border border-white/20 hover:bg-white/20 transition-all"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Create with Elegance</h3>
            <p className="text-white/60">Craft beautiful notes with a premium interface designed for focus and productivity.</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Organize with Style</h3>
            <p className="text-white/60">Use powerful tagging and search features to organize and retrieve your notes effortlessly.</p>
          </div>

          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3">Seamless Sync</h3>
            <p className="text-white/60">Your notes are securely stored and synced in real-time across all your devices.</p>
          </div>
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-6 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-2 border-slate-900"
                />
              ))}
            </div>
            <div className="text-left">
              <p className="font-bold">Trusted by thousands</p>
              <p className="text-white/60 text-sm">Join our growing community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
