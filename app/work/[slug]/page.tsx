'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Navigation } from '../../../components/navigation'
import { Footer } from '../../../components/footer'
import Link from 'next/link'
import { ArrowLeft, TrendingUp } from 'lucide-react'
import { supabase } from '../../../lib/supabase/client'
import type { Project, Media } from '../../../lib/types'

export default function ProjectDetailPage() {
  const params = useParams()
  const slug = params.slug as string
  const [project, setProject] = useState<Project | null>(null)
  const [featuredImage, setFeaturedImage] = useState<Media | null>(null)
  const [relatedProjects, setRelatedProjects] = useState<Project[]>([])

  useEffect(() => {
    if (slug) {
      loadProject()
    }
  }, [slug])

  async function loadProject() {
    const { data: projectData } = await supabase
      .from('company_projects')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single()

    if (!projectData) return

    setProject(projectData)

    if (projectData.featured_image_id) {
      const { data: imageData } = await supabase
        .from('company_media')
        .select('*')
        .eq('id', projectData.featured_image_id)
        .single()

      if (imageData) setFeaturedImage(imageData)
    }

    const { data: relatedData } = await supabase
      .from('company_projects')
      .select('*')
      .eq('status', 'published')
      .eq('category', projectData.category)
      .neq('id', projectData.id)
      .limit(3)

    if (relatedData) setRelatedProjects(relatedData)
  }

  if (!project) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <main className="pt-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p>Project not found.</p>
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
              href="/work"
              className="inline-flex items-center text-blue-100 hover:text-white mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Portfolio
            </Link>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{project.title}</h1>
            {project.client_name && (
              <p className="text-xl text-blue-100">Client: {project.client_name}</p>
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
                  alt={featuredImage.alt_text || project.title}
                  className="w-full rounded-lg mb-8"
                />
              )}

              {project.content && (
                <div
                  className="prose prose-lg max-w-none mb-8"
                  dangerouslySetInnerHTML={{ __html: project.content }}
                />
              )}

              {/* Results Metrics */}
              {project.results_metrics && Object.keys(project.results_metrics).length > 0 && (
                <div className="bg-blue-50 rounded-lg p-8 mb-8">
                  <div className="flex items-center mb-6">
                    <TrendingUp className="h-6 w-6 text-blue-600 mr-2" />
                    <h3 className="text-2xl font-semibold">Results</h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(project.results_metrics).map(([key, value]) => (
                      <div key={key} className="bg-white p-4 rounded-lg">
                        <p className="text-sm text-gray-600 mb-1 capitalize">{key.replace(/_/g, ' ')}</p>
                        <p className="text-2xl font-bold text-blue-600">{String(value)}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="bg-blue-600 text-white rounded-lg p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Want Similar Results?</h3>
                <p className="mb-6">Let's discuss how we can help your business achieve its goals</p>
                <Link
                  href="/contact"
                  className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors inline-block"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-3xl font-bold mb-8">Related Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedProjects.map((related) => (
                  <Link
                    key={related.id}
                    href={`/work/${related.slug}`}
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

