'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '../../components/navigation'
import { Footer } from '../../components/footer'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase/client'
import type { Partner, Media } from '../../lib/types'

export default function ClientsPage() {
  const [clients, setClients] = useState<Partner[]>([])
  const [mediaMap, setMediaMap] = useState<Record<string, Media>>({})
  const [categories, setCategories] = useState<string[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    loadClients()
  }, [selectedCategory])

  useEffect(() => {
    loadCategories()
  }, [])

  async function loadCategories() {
    // Load all categories from all visible clients
    const { data } = await supabase
      .from('company_partners')
      .select('category')
      .eq('is_visible', true)
      .not('category', 'is', null)

    if (data) {
      const cats = Array.from(new Set(data.map(c => c.category).filter(Boolean))) as string[]
      setCategories(cats)
    }
  }

  async function loadClients() {
    let query = supabase
      .from('company_partners')
      .select('*')
      .eq('is_visible', true)
      .order('order_index', { ascending: true })

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory)
    }

    const { data } = await query

    if (data) {
      setClients(data)

      const logoIds = data.map(c => c.logo_id).filter(Boolean) as string[]
      if (logoIds.length > 0) {
        const { data: mediaData } = await supabase
          .from('company_media')
          .select('*')
          .in('id', logoIds)

        if (mediaData) {
          const map: Record<string, Media> = {}
          mediaData.forEach(m => { map[m.id] = m })
          setMediaMap(map)
        }
      }
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero */}
        <section className="bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Clients</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              We're proud to work with innovative companies across industries
            </p>
          </div>
        </section>

        {/* Filter */}
        {categories.length > 0 && (
          <section className="bg-white border-b py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setSelectedCategory('all')}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedCategory === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-full transition-colors ${
                      selectedCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Clients Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {clients.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-600">No clients found.</p>
              </motion.div>
            ) : (
              <motion.div
                layout
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <AnimatePresence mode="wait">
                  {clients.map((client, index) => {
                    const logo = client.logo_id ? mediaMap[client.logo_id] : null
                    return (
                      <motion.div
                        key={client.id}
                        layout
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{
                          type: 'spring',
                          stiffness: 100,
                          damping: 15,
                          delay: index * 0.08,
                        }}
                        whileHover={{ y: -8, scale: 1.02 }}
                        className="bg-white rounded-lg shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100"
                      >
                      {client.website_url ? (
                        <a
                          href={client.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block h-full"
                        >
                          <div className="p-6">
                            {/* Logo */}
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                              transition={{ duration: 0.3 }}
                              className="flex items-center justify-center mb-4 h-20"
                            >
                              {logo ? (
                                <img
                                  src={logo.file_url}
                                  alt={logo.alt_text || client.name}
                                  className="max-w-full max-h-16 object-contain"
                                />
                              ) : (
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                                  {client.name.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </motion.div>
                            
                            {/* Client Name */}
                            <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                              {client.name}
                            </h3>
                            
                            {/* Description */}
                            {client.description && (
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2 text-center">
                                {client.description}
                              </p>
                            )}
                            
                            {/* Category Badge */}
                            {client.category && (
                              <div className="flex justify-center">
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {client.category}
                                </span>
                              </div>
                            )}
                          </div>
                        </a>
                      ) : (
                        <div className="p-6 h-full">
                          {/* Logo */}
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center justify-center mb-4 h-20"
                          >
                            {logo ? (
                              <img
                                src={logo.file_url}
                                alt={logo.alt_text || client.name}
                                className="max-w-full max-h-16 object-contain"
                              />
                            ) : (
                              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl font-bold">
                                {client.name.charAt(0).toUpperCase()}
                              </div>
                            )}
                          </motion.div>
                          
                          {/* Client Name */}
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                            {client.name}
                          </h3>
                          
                          {/* Description */}
                          {client.description && (
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2 text-center">
                              {client.description}
                            </p>
                          )}
                          
                          {/* Category Badge */}
                          {client.category && (
                            <div className="flex justify-center">
                              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                {client.category}
                              </span>
                            </div>
                          )}
                        </div>
                      )}
                      </motion.div>
                    )
                  })}
                </AnimatePresence>
              </motion.div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

