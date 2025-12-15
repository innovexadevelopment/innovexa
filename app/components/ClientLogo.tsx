'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { Client } from '../lib/types'
import { getPublicUrl } from '../lib/supabaseClient'

interface ClientLogoProps {
    client: Client
}

export default function ClientLogo({ client }: ClientLogoProps) {
    const logoUrl = client.logo_url.startsWith('http')
        ? client.logo_url
        : getPublicUrl(client.logo_url)

    return (
        <motion.div
            whileHover={{ y: -6 }}
            className="card p-6 md:p-8 flex items-center justify-center hover-lift h-32 md:h-36 group"
        >
            <div className="relative w-full h-16 md:h-20">
                <Image
                    src={logoUrl}
                    alt={client.name}
                    fill
                    className="object-contain filter brightness-0 invert opacity-50 group-hover:opacity-80 transition-opacity duration-300"
                />
            </div>
        </motion.div>
    )
}
