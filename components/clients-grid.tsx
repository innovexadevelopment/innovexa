'use client'

import type { Partner, Media } from '../lib/types'
import { motion } from 'framer-motion'

interface ClientsGridProps {
  clients: Partner[]
  mediaMap?: Record<string, Media>
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.8, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

export function ClientsGrid({ clients, mediaMap = {} }: ClientsGridProps) {
  if (clients.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Leading Brands
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're proud to work with innovative companies across industries
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          {clients.map((client) => {
            const logo = client.logo_id ? mediaMap[client.logo_id] : null
            return (
              <motion.div
                key={client.id}
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.05 }}
                className="bg-white rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 p-4"
              >
                {client.website_url ? (
                  <a
                    href={client.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full"
                  >
                    <div className="flex flex-col items-center text-center">
                      {/* Logo */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center justify-center mb-3 h-16"
                      >
                        {logo ? (
                          <img
                            src={logo.file_url}
                            alt={logo.alt_text || client.name}
                            className="max-w-full max-h-14 object-contain"
                          />
                        ) : (
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                            {client.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </motion.div>
                      
                      {/* Client Name */}
                      <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                        {client.name}
                      </h3>
                      
                      {/* Category Badge */}
                      {client.category && (
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mb-2"
                        >
                          {client.category}
                        </motion.span>
                      )}
                    </div>
                  </a>
                ) : (
                  <div className="flex flex-col items-center text-center">
                    {/* Logo */}
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                      className="flex items-center justify-center mb-3 h-16"
                    >
                      {logo ? (
                        <img
                          src={logo.file_url}
                          alt={logo.alt_text || client.name}
                          className="max-w-full max-h-14 object-contain"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold">
                          {client.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </motion.div>
                    
                    {/* Client Name */}
                    <h3 className="text-sm font-semibold text-gray-900 mb-1 line-clamp-1">
                      {client.name}
                    </h3>
                    
                    {/* Category Badge */}
                    {client.category && (
                      <motion.span
                        whileHover={{ scale: 1.1 }}
                        className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                      >
                        {client.category}
                      </motion.span>
                    )}
                  </div>
                )}
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

