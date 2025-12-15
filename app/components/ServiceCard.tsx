'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Service } from '../lib/types'
import { getPublicUrl } from '../lib/supabaseClient'

interface ServiceCardProps {
    service: Service
}

export default function ServiceCard({ service }: ServiceCardProps) {
    const description = service.short_description || service.long_description || ''

    return (
        <Link href={`/services/${service.id}`} className="block h-full">
            <motion.div
                whileHover={{ y: -8 }}
                className="card p-8 sm:p-10 h-full flex flex-col hover-lift group relative overflow-hidden"
            >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/0 to-white/0 group-hover:from-white/5 group-hover:to-white/0 transition-all duration-500" />
                
                {/* Content */}
                <div className="relative z-10 flex flex-col h-full">
                    {/* Icon */}
                    {service.icon && (
                    <div className="mb-6">
                            <div className="w-16 h-16 flex items-center justify-center text-4xl">
                                {service.icon}
                            </div>
                        </div>
                    )}

                    {/* Title */}
                    <h3 className="text-2xl sm:text-3xl font-black text-white mb-4 leading-tight">
                        {service.title}
                    </h3>

                    {/* Description */}
                    {description && (
                    <p className="text-white/70 text-base leading-relaxed flex-grow mb-8 font-light">
                            {description.length > 140
                                ? `${description.substring(0, 140)}...`
                                : description}
                    </p>
                    )}

                    {/* CTA */}
                    <div className="flex items-center text-white text-sm font-bold uppercase tracking-wider mt-auto group-hover:gap-3 transition-all duration-300">
                        <span>Learn More</span>
                        <svg 
                            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                    </div>
                </div>
            </motion.div>
        </Link>
    )
}
