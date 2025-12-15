'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { Menu, X, Sparkles } from 'lucide-react'

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Services', href: '/services' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
]

export default function Navbar() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        setIsMobileMenuOpen(false)
    }, [pathname])

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isMobileMenuOpen])

    return (
        <>
            <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled 
                    ? 'bg-black/98 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
                    : 'bg-black/95 backdrop-blur-md'
            }`}>
                <div className="container">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <Link 
                            href="/" 
                            className="flex items-center gap-3 group relative z-50"
                        >
                            <div className="relative">
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2.5 bg-gradient-to-br from-white/10 to-white/5 rounded-xl border border-white/20 group-hover:border-white/40 transition-all"
                                >
                                    <Sparkles className="h-6 w-6 text-white" />
                                </motion.div>
                            </div>
                            <div>
                                <span className="text-2xl font-black text-white tracking-tight block leading-tight">
                                    INNOVEXA
                                </span>
                                <span className="text-[10px] text-white/60 font-medium uppercase tracking-wider block -mt-0.5">
                                    Innovation
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = pathname === link.href
                                return (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`relative px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-lg group ${
                                            isActive 
                                                ? 'text-white' 
                                                : 'text-white/70 hover:text-white'
                                        }`}
                                    >
                                        <span className="relative z-10">{link.name}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 bg-white/10 rounded-lg border border-white/20"
                                                transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                            />
                                        )}
                                        {!isActive && (
                                            <div className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                                        )}
                                    </Link>
                                )
                            })}

                            <div className="ml-2 pl-4 border-l border-white/10">
                                <Link 
                                    href="/contact" 
                                    className="inline-flex items-center gap-2 px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
                                >
                                    Get Started
                                </Link>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="lg:hidden text-white p-2.5 hover:bg-white/10 rounded-lg transition-all z-50"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? (
                                <X className="w-6 h-6" />
                            ) : (
                                <Menu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                                className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-black border-l border-white/10 shadow-2xl z-50 lg:hidden overflow-y-auto"
                            >
                                <div className="p-6 pt-24">
                                    <div className="space-y-2">
                                        {navLinks.map((link, index) => {
                                            const isActive = pathname === link.href
                                            return (
                                                <motion.div
                                                    key={link.href}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                >
                                                    <Link
                                                        href={link.href}
                                                        className={`block px-4 py-3 rounded-lg font-bold text-sm uppercase tracking-wider transition-all ${
                                                            isActive 
                                                                ? 'bg-white text-black shadow-lg' 
                                                                : 'text-white/80 hover:bg-white/10 hover:text-white'
                                                        }`}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                </motion.div>
                                            )
                                        })}
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: navLinks.length * 0.05 }}
                                        className="mt-8"
                                    >
                                        <Link
                                            href="/contact"
                                            className="block w-full text-center px-6 py-3.5 bg-white text-black font-bold uppercase tracking-wider rounded-lg shadow-lg hover:shadow-xl transition-all"
                                            onClick={() => setIsMobileMenuOpen(false)}
                                        >
                                            Get Started
                                        </Link>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </nav>

            {/* Spacer */}
            <div className="h-20" />
        </>
    )
}
