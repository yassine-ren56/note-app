'use client';

import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900" />
      <div className="absolute inset-0 opacity-25">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <nav className="flex justify-between items-center mb-20 animate-slide-up">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20 animate-pulse-glow">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="text-3xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Notes</span>
          </div>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-8 py-3.5 text-white/80 hover:text-white transition-all duration-300 font-medium hover:bg-white/5 rounded-2xl"
            >
              Sign In
            </Link>
            <Link
              href="/signup"
              className="px-8 py-3.5 bg-white text-slate-900 rounded-2xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5"
            >
              Get Started
            </Link>
          </div>
        </nav>

        <div className="text-center mb-24">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full mb-10 animate-slide-up delay-100">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="text-sm font-medium text-white/90">Experience the future of note-taking</span>
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-10 leading-tight animate-slide-up delay-200">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-300 bg-clip-text text-transparent">
              Elevate Your
            </span>
            <br />
            <span className="text-white">Thoughts</span>
          </h1>
          <p className="text-2xl text-white/70 mb-14 max-w-3xl mx-auto leading-relaxed animate-slide-up delay-300">
            A sophisticated, secure, and beautifully designed notes application.
            Capture your ideas with elegance and keep them synced across all devices.
          </p>
          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center animate-slide-up delay-400">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-12 py-6 rounded-3xl font-semibold text-xl hover:from-purple-700 hover:to-blue-700 transition-all duration-300 shadow-2xl hover:shadow-purple-500/30 transform hover:-translate-y-1.5 animate-pulse-glow"
            >
              Start Your Journey
              <ArrowRight size={24} />
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-3 bg-white/10 backdrop-blur-xl text-white px-12 py-6 rounded-3xl font-semibold text-xl border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32">
          <div className="group bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/10 hover:border-white/25 transition-all duration-500 hover:bg-white/10 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-115 transition-transform duration-300 shadow-xl shadow-blue-500/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-5">Create with Elegance</h3>
            <p className="text-white/60 text-lg leading-relaxed">Craft beautiful notes with a premium interface designed for focus and productivity.</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/10 hover:border-white/25 transition-all duration-500 hover:bg-white/10 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-115 transition-transform duration-300 shadow-xl shadow-purple-500/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-5">Organize with Style</h3>
            <p className="text-white/60 text-lg leading-relaxed">Use powerful tagging and search features to organize and retrieve your notes effortlessly.</p>
          </div>

          <div className="group bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/10 hover:border-white/25 transition-all duration-500 hover:bg-white/10 transform hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/10 animate-slide-up" style={{ animationDelay: '300ms' }}>
            <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-115 transition-transform duration-300 shadow-xl shadow-green-500/30">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-white mb-5">Seamless Sync</h3>
            <p className="text-white/60 text-lg leading-relaxed">Your notes are securely stored and synced in real-time across all your devices.</p>
          </div>
        </div>

        <div className="text-center animate-slide-up delay-400">
          <div className="inline-flex items-center gap-6 px-10 py-5 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:border-white/20 transition-all duration-300">
            <div className="flex -space-x-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 border-3 border-slate-900 shadow-lg"
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <div className="text-left">
              <p className="text-white font-bold text-lg">Trusted by thousands</p>
              <p className="text-white/60 text-sm">Join our growing community</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
