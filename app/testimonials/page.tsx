'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '../../components/navigation'
import { Footer } from '../../components/footer'
import { supabase } from '../../lib/supabase/client'
import type { Testimonial, Media } from '../../lib/types'
import { Star } from 'lucide-react'

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [mediaMap, setMediaMap] = useState<Record<string, Media>>({})

  useEffect(() => {
    loadTestimonials()
  }, [])

  async function loadTestimonials() {
    const { data } = await supabase
      .from('company_testimonials')
      .select('*')
      .eq('is_visible', true)
      .order('order_index', { ascending: true })

    if (data) {
      setTestimonials(data)

      const photoIds = data.map(t => t.photo_id).filter(Boolean) as string[]
      if (photoIds.length > 0) {
        const { data: mediaData } = await supabase
          .from('company_media')
          .select('*')
          .in('id', photoIds)

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
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Testimonials</h1>
            <p className="text-xl text-blue-100 max-w-2xl">
              Don't just take our word for it - hear from the businesses we've helped
            </p>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {testimonials.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600">No testimonials found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-8">
                {testimonials.map((testimonial) => {
                  const photo = testimonial.photo_id ? mediaMap[testimonial.photo_id] : null
                  return (
                    <div
                      key={testimonial.id}
                      className="bg-white p-6 rounded-lg shadow-md"
                    >
                      <div className="flex items-center mb-4">
                        {testimonial.rating && (
                          <div className="flex text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < testimonial.rating! ? 'fill-current' : ''}`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-700 mb-6 italic">"{testimonial.content}"</p>
                      <div className="flex items-center">
                        {photo && (
                          <img
                            src={photo.file_url}
                            alt={photo.alt_text || testimonial.name}
                            className="w-12 h-12 rounded-full mr-3 object-cover"
                          />
                        )}
                        <div>
                          <p className="font-semibold">{testimonial.name}</p>
                          {testimonial.role && (
                            <p className="text-sm text-gray-600">{testimonial.role}</p>
                          )}
                          {testimonial.company && (
                            <p className="text-sm text-gray-600">{testimonial.company}</p>
                          )}
                        </div>
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

