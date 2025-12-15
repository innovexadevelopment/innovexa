'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface HeroProps {
    title: string
    subtitle?: string
    bannerImageUrl?: string
    ctaText?: string
    ctaLink?: string
}

export default function Hero({
    title,
    subtitle,
    bannerImageUrl,
    ctaText,
    ctaLink = '#',
}: HeroProps) {
    return (
        <div className="hero-banner relative overflow-hidden">
            {/* Banner Image Background */}
            {bannerImageUrl && (
                <>
                    <div className="absolute inset-0">
                        <Image
                            src={bannerImageUrl}
                            alt={title}
                            fill
                            priority
                            className="object-cover scale-105"
                            sizes="100vw"
                            quality={90}
                        />
                    </div>
                    <div className="hero-overlay" />
                </>
            )}

            {/* No image fallback */}
            {!bannerImageUrl && (
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-black" />
            )}

            {/* Content */}
            <div className="relative z-10 h-full flex items-center justify-center container-padding">
                <div className="max-w-6xl mx-auto text-center w-full">
                    <div className="space-y-6 sm:space-y-8 md:space-y-10">
                        <motion.h1
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
                            className="font-black text-white leading-[1.05] tracking-tight"
                        >
                            {title}
                        </motion.h1>

                        {subtitle && (
                            <motion.p
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
                                className="text-lg sm:text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed font-light"
                            >
                                {subtitle}
                            </motion.p>
                        )}

                        {ctaText && (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                className="pt-4"
                            >
                                <motion.a
                                    href={ctaLink}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="btn inline-flex"
                                >
                                    {ctaText}
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </motion.a>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.8, ease: 'easeOut' }}
                className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10"
            >
                <motion.div
                    animate={{ y: [0, 12, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                    className="text-white/60 text-xs uppercase tracking-[0.2em] flex flex-col items-center gap-3"
                >
                    <span className="font-bold">Scroll</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    )
}
