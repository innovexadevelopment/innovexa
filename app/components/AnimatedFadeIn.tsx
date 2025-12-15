'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedFadeInProps {
    children: ReactNode
    delay?: number
    className?: string
}

export default function AnimatedFadeIn({
    children,
    delay = 0,
    className = ''
}: AnimatedFadeInProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.4, 0, 0.2, 1]
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}
