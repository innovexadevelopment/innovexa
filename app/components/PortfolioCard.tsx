'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Portfolio } from '../lib/types'
import { getPublicUrl } from '../lib/supabaseClient'

interface PortfolioCardProps {
    portfolio: Portfolio
}

export default function PortfolioCard({ portfolio }: PortfolioCardProps) {
    const coverImageUrl = portfolio.cover_image_path
        ? (portfolio.cover_image_path.startsWith('http') ? portfolio.cover_image_path : getPublicUrl(portfolio.cover_image_path))
        : undefined
    const description = portfolio.short_description || portfolio.long_description || ''

    return (
        <Link href={`/portfolio/${portfolio.slug}`} className="block h-full">
            <motion.div
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden hover-lift h-full"
            >
                {/* Image Container */}
                <div className="relative h-[400px] sm:h-[450px] md:h-[500px] bg-black overflow-hidden">
                    {coverImageUrl ? (
                        <Image
                            src={coverImageUrl}
                            alt={portfolio.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                            <span className="text-white/50 text-4xl">{portfolio.title.charAt(0)}</span>
                        </div>
                    )}
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20 group-hover:from-black/95 group-hover:via-black/60 transition-all duration-500" />
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10 transform group-hover:translate-y-0 translate-y-2 transition-transform duration-500">
                    <div className="space-y-3">
                        {/* Category */}
                        {portfolio.category && (
                            <div className="text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-1">
                                {portfolio.category}
                            </div>
                        )}
                        
                        {/* Title */}
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white leading-tight mb-3">
                            {portfolio.title}
                        </h3>
                        
                        {/* Description */}
                        {description && (
                            <p className="text-sm sm:text-base text-white/90 leading-relaxed line-clamp-2 font-light">
                                {description.length > 100
                                    ? `${description.substring(0, 100)}...`
                                    : description}
                            </p>
                        )}
                        
                        {/* View Project Link */}
                        <div className="flex items-center text-white text-sm font-bold uppercase tracking-wider mt-4 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                            <span>View Project</span>
                            <svg 
                                className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
