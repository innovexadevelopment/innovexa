'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '../../components/navigation'
import { Footer } from '../../components/footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { supabase } from '../../lib/supabase/client'
import type { Service, Media } from '../../lib/types'

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [mediaMap, setMediaMap] = useState<Record<string, Media>>({})
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    loadServices()
  }, [selectedCategory])

  async function loadServices() {
    let query = supabase
      .from('company_services')
      .select('*')
      .eq('status', 'published')
      .order('order_index', { ascending: true })

    if (selectedCategory !== 'all') {
      query = query.eq('category', selectedCategory)
    }

    const { data } = await query

    if (data) {
      setServices(data)

      const cats = Array.from(new Set(data.map(s => s.category).filter(Boolean))) as string[]
      setCategories(cats)

      const mediaIds = data.map(s => s.featured_image_id).filter(Boolean) as string[]
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Comprehensive solutions tailored to your business needs
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

        {/* Services Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {services.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No services found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service) => {
                  const image = service.featured_image_id ? mediaMap[service.featured_image_id] : null
                  return (
                    <div
                      key={service.id}
                      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                    >
                      {image ? (
                        <img
                          src={image.file_url}
                          alt={image.alt_text || service.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                      )}
                      <div className="p-6">
                        {service.category && (
                          <span className="text-sm text-blue-600 font-semibold">
                            {service.category}
                          </span>
                        )}
                        <h3 className="text-xl font-semibold mb-2 text-gray-900 mt-2">
                          {service.title}
                        </h3>
                        {service.description && (
                          <p className="text-gray-600 mb-4 line-clamp-3">{service.description}</p>
                        )}
                        <Link
                          href={`/services/${service.slug}`}
                          className="text-blue-600 hover:text-blue-700 font-semibold inline-flex items-center"
                        >
                          Learn More <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

