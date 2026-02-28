'use client';

import Link from 'next/link';
import { LayoutDashboard, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Home() {


  return (
    <div className="flex flex-col min-h-screen bg-theme-bg font-sans selection:bg-purple-100 selection:text-purple-900 overflow-hidden relative">

      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob"></div>
        <div className="absolute top-[20%] right-[-5%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      </div>

      {/* Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-6xl mx-auto flex items-center justify-between px-6 py-8 relative z-10"
      >
        <div className="flex items-center gap-2">
          <LayoutDashboard className="w-8 h-8 text-black" />
          <h1 className="text-3xl font-extrabold text-black tracking-tight">
            TaskFlow.
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden sm:block px-6 py-2.5 rounded-full font-semibold text-theme-textMain bg-white shadow-soft transition-all hover:scale-105 hover:shadow-md">
            Log in
          </Link>
          <Link href="/register" className="btn-primary hover:scale-105 shadow-md">
            + Get Started
          </Link>
        </div>
      </motion.nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center text-center w-full max-w-5xl mx-auto px-6 py-20 lg:py-32 relative z-10">


        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-[5rem] font-extrabold text-black leading-tight lg:leading-[1.05] mb-8 tracking-tighter"
        >
          Manage your <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-500 text-transparent bg-clip-text">projects</span><br className="hidden md:block" />
          with extreme clarity.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg md:text-xl text-theme-textMuted mb-12 max-w-2xl font-medium leading-relaxed"
        >
          TaskFlow brings all your team's work into one unified workspace.<br className="hidden md:block" />
          Beautifully designed typography, fluid motions, and zero clutter to keep you permanently focused.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center mb-20"
        >
          <Link href="/register" className="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-white bg-black shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-lg sm:text-base text-center flex items-center justify-center gap-2 group">
            View Live Dashboard
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>


      </main>

      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full text-center py-8 text-theme-textSubtle font-medium text-sm relative z-10"
      >
        Made by Aditya Nanda
      </motion.footer>
    </div>
  );
}
