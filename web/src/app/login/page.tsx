'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Loader2, Mail, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { apiRequest } from '@/lib/api';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const res = await apiRequest('/auth/login', {
                method: 'POST',
                body: JSON.stringify({ email: email.trim(), password: password.trim() }),
            });

            const data = await res.json();

            if (res.ok) {
                localStorage.setItem('accessToken', data.accessToken);
                localStorage.setItem('refreshToken', data.refreshToken);
                router.push('/dashboard');
            } else {
                setError(data.message || (data.errors ? data.errors.map((err: any) => err.message).join('. ') : 'Login failed'));
            }
        } catch (err: any) {
            setError('An expected network error occurred.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-theme-bg relative overflow-hidden selection:bg-purple-100 selection:text-purple-900">

            {/* Background Decor */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-full overflow-hidden -z-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                <div className="absolute top-[30%] right-[10%] w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
            </div>

            {/* Logo */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
            >
                <Link href="/" className="flex items-center gap-2 mb-10 hover:opacity-80 transition-opacity">
                    <LayoutDashboard className="w-8 h-8 text-black" />
                    <h1 className="text-3xl font-extrabold text-black tracking-tight">TaskFlow.</h1>
                </Link>
            </motion.div>

            {/* Card */}
            <motion.div
                initial={{ y: 20, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full max-w-[440px] bg-theme-card rounded-[2rem] p-8 sm:p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] border border-theme-border relative z-10"
            >
                <div className="text-center mb-10">
                    <h2 className="text-[28px] font-extrabold text-theme-textMain mb-2 tracking-tight">Welcome Back</h2>
                    <p className="text-theme-textMuted text-[15px] font-medium">Log in to manage your tasks with clarity.</p>
                </div>

                <AnimatePresence mode="wait">
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10, height: 0 }}
                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                            exit={{ opacity: 0, y: -10, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden mb-6"
                        >
                            <div className="p-4 bg-theme-badgeRed rounded-2xl text-theme-badgeRedText text-[13px] font-bold border border-rose-100 flex items-center gap-3">
                                <span className="w-1.5 h-1.5 rounded-full bg-theme-badgeRedText opacity-80 block shrink-0"></span>
                                <p>{error}</p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-1">
                        <label className="text-[13px] font-bold text-gray-500 ml-1">Email address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="email"
                                placeholder="name@company.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full bg-[#F9FAFB] border border-gray-200 text-black pl-11 pr-5 py-3.5 rounded-2xl focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50 transition-all font-medium"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-[13px] font-bold text-gray-500 ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full bg-[#F9FAFB] border border-gray-200 text-black pl-11 pr-5 py-3.5 rounded-2xl focus:outline-none focus:border-purple-300 focus:ring-4 focus:ring-purple-50 transition-all font-medium font-sans tracking-widest placeholder:tracking-normal"
                            />
                        </div>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className={`w-full py-4 mt-4 flex justify-center items-center gap-2 bg-black text-white font-extrabold rounded-full shadow-[0_8px_20px_-4px_rgba(0,0,0,0.3)] transition-all ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-gray-900 border border-black hover:shadow-xl'}`}
                    >
                        {loading ? (
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            >
                                <Loader2 className="w-5 h-5" />
                            </motion.div>
                        ) : null}
                        {loading ? 'Authenticating...' : 'Log In to Dashboard'}
                    </motion.button>
                </form>

                <div className="mt-8 text-center text-[14px] font-medium text-theme-textMuted">
                    Don't have an account?{' '}
                    <Link href="/register" className="font-extrabold text-black hover:text-purple-600 hover:underline hover:underline-offset-4 transition-all">
                        Get started for free
                    </Link>
                </div>
            </motion.div>
        </div>
    );
}
