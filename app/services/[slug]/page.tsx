'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Navigation } from '../../../components/navigation'
import { Footer } from '../../../components/footer'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { supabase } from '../../../lib/supabase/client'
import type { Service, Media } from '../../../lib/types'

export default function ServiceDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [service, setService] = useState<Service | null>(null)
  const [featuredImage, setFeaturedImage] = useState<Media | null>(null)
  const [relatedServices, setRelatedServices] = useState<Service[]>([])

  useEffect(() => {
    if (slug) {
      loadService()
    }
  }, [slug])

  async function loadService() {
    const { data: serviceData } = await supabase
      .from('company_services')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (!serviceData) return

    setService(serviceData)

    if (serviceData.featured_image_id) {
      const { data: imageData } = await supabase
        .from('company_media')
        .select('*')
        .eq('id', serviceData.featured_image_id)
        .single()

      if (imageData) setFeaturedImage(imageData)
    }

    const { data: relatedData } = await supabase
      .from('company_services')
      .select('*')
      .eq('status', 'published')
      .eq('category', serviceData.category)
      .neq('id', serviceData.id)
      .limit(3)

    if (relatedData) setRelatedServices(relatedData)
  }

  if (!service) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p>Service not found.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-blue-500 to-blue-700 text-white py-20">
          {featuredImage && (
            <div className="absolute inset-0 opacity-20">
              <img src={featuredImage.file_url} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Link
              href="/services"
              className="inline-flex items-center text-blue-100 hover:text-white mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Services
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{service.title}</h1>
            {service.description && (
              <p className="text-xl text-blue-100 max-w-3xl">{service.description}</p>
            )}
          </div>
        </section>

        {/* Content */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
              {featuredImage && (
                <img
                  src={featuredImage.file_url}
                  alt={featuredImage.alt_text || service.title}
                  className="w-full rounded-lg mb-8"
                />
              )}

              {service.content && (
                <div
                  className="prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              )}

              {service.metadata && (
                <div className="bg-blue-50 rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-semibold mb-4">Service Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.category && (
                      <div>
                        <span className="text-sm text-gray-600">Category</span>
                        <p className="font-semibold">{service.category}</p>
                      </div>
                    )}
                    {Object.entries(service.metadata).map(([key, value]) => (
                      <div key={key}>
                        <span className="text-sm text-gray-600 capitalize">{key.replace(/_/g, ' ')}</span>
                        <p className="font-semibold">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Interested in This Service?</h3>
                <p className="mb-6">Let's discuss how we can help your business</p>
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">Related Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedServices.map((related) => (
                  <Link
                    key={related.id}
                    href={`/services/${related.slug}`}
                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600"></div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{related.title}</h3>
                      {related.description && (
                        <p className="text-gray-600 line-clamp-2">{related.description}</p>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
      <Footer />
    </div>
  )
}

