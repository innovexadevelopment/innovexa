'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '../../components/navigation'
import { Footer } from '../../components/footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase/client'
import type { Project, Media } from '../../lib/types'

export default function WorkPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [mediaMap, setMediaMap] = useState<Record<string, Media>>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const projectsPerPage = 9

  useEffect(() => {
    loadCategories()
  }, [])

  useEffect(() => {
    loadProjects()
  }, [selectedCategory, currentPage])

  async function loadCategories() {
    // Load all categories from all published projects
    const { data } = await supabase
      .from('company_projects')
      .select('category')
      .eq('status', 'published')
      .not('category', 'is', null)

    if (data) {
      const cats = Array.from(new Set(data.map(p => p.category).filter(Boolean))) as string[]
      setCategories(cats)
    }
  }

  async function loadProjects() {
    let query = supabase
      .from('company_projects')
      .select('*')
      .eq('status', 'published')
      .order('order_index', { ascending: true })
      .range((currentPage - 1) * projectsPerPage, currentPage * projectsPerPage - 1)

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory)
    }

    const { data } = await query

    if (data) {
      setProjects(data)

      const mediaIds = data.map(p => p.featured_image_id).filter(Boolean) as string[]
      if (mediaIds.length > 0) {
        const { data: mediaData } = await supabase
          .from('company_media')
          .select('*')
          .in('id', mediaIds)

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Work</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Real projects, real results. See what we've accomplished for our clients
            </p>
          </div>
        </section>

        {/* Filter */}
        {categories.length > 0 && (
          <section className="bg-white border-b py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => { setSelectedCategory('all'); setCurrentPage(1) }}
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
                    onClick={() => { setSelectedCategory(cat); setCurrentPage(1) }}
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

        {/* Projects Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {projects.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12"
              >
                <p className="text-gray-600">No projects found.</p>
              </motion.div>
            ) : (
              <>
                <motion.div
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  <AnimatePresence mode="wait">
                    {projects.map((project, index) => {
                      const image = project.featured_image_id ? mediaMap[project.featured_image_id] : null
                      return (
                        <motion.div
                          key={project.id}
                          layout
                          initial={{ opacity: 0, y: 30, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{
                            type: 'spring',
                            stiffness: 100,
                            damping: 15,
                            delay: index * 0.1,
                          }}
                          whileHover={{ y: -10, scale: 1.02 }}
                        >
                          <Link
                            href={`/work/${project.slug}`}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 block h-full"
                          >
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              transition={{ duration: 0.4 }}
                              className="overflow-hidden"
                            >
                              {image ? (
                                <img
                                  src={image.file_url}
                                  alt={image.alt_text || project.title}
                                  className="w-full h-48 object-cover"
                                />
                              ) : (
                                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                              )}
                            </motion.div>
                            <div className="p-6">
                              {project.client_name && (
                                <p className="text-sm text-blue-600 font-semibold mb-2">{project.client_name}</p>
                              )}
                              <h3 className="text-xl font-semibold mb-2 text-gray-900">
                                {project.title}
                              </h3>
                              {project.description && (
                                <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
                              )}
                              <motion.span
                                className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center group"
                                whileHover={{ x: 5 }}
                              >
                                View Case Study <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                              </motion.span>
                            </div>
                          </Link>
                        </motion.div>
                      )
                    })}
                  </AnimatePresence>
                </motion.div>

                {/* Pagination */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="flex justify-center mt-12 gap-2"
                >
                  <motion.button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    whileHover={{ scale: currentPage === 1 ? 1 : 1.05 }}
                    whileTap={{ scale: currentPage === 1 ? 1 : 0.95 }}
                    className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </motion.button>
                  <motion.button
                    onClick={() => setCurrentPage(p => p + 1)}
                    disabled={projects.length < projectsPerPage}
                    whileHover={{ scale: projects.length < projectsPerPage ? 1 : 1.05 }}
                    whileTap={{ scale: projects.length < projectsPerPage ? 1 : 0.95 }}
                    className="px-4 py-2 bg-white border rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </motion.button>
                </motion.div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

