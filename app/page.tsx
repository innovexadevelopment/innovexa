'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '../components/navigation'
import { Footer } from '../components/footer'
import { HomeHero } from '../components/home-hero'
import { ServicesPreview } from '../components/services-preview'
import { WhyUs } from '../components/why-us'
import { FeaturedProjects } from '../components/featured-projects'
import { ClientsGrid } from '../components/clients-grid'
import { TestimonialsSection } from '../components/testimonials-section'
import { CTASection } from '../components/cta-section'
import { supabase } from '../lib/supabase/client'
import type { Service, Project, Partner, Testimonial, Media } from '../lib/types'

export default function HomePage() {
  const [services, setServices] = useState<Service[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [clients, setClients] = useState<Partner[]>([])
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [mediaMap, setMediaMap] = useState<Record<string, Media>>({})
  const [heroImage, setHeroImage] = useState<string | null>(null)
  const [heroTitle, setHeroTitle] = useState<string | null>(null)
  const [heroSubtitle, setHeroSubtitle] = useState<string | null>(null)
  const [heroPrimaryCTA, setHeroPrimaryCTA] = useState<{ text: string; href: string } | null>(null)
  const [heroSecondaryCTA, setHeroSecondaryCTA] = useState<{ text: string; href: string } | null>(null)

  useEffect(() => {
    loadData()
  }, [])

  async function loadData() {
    try {
      // Load homepage and hero section
      const { data: homepage, error: homepageError } = await supabase
        .from('company_pages')
        .select('*')
        .eq('slug', 'home')
        .eq('is_homepage', true)
        .maybeSingle()

      if (homepageError) {
        console.error('Error loading homepage:', homepageError)
      }

      if (homepage) {
        // Load hero section
        const { data: heroSection, error: heroError } = await supabase
          .from('company_sections')
          .select('*')
          .eq('page_id', homepage.id)
          .eq('type', 'hero')
          .eq('is_visible', true)
          .order('order_index', { ascending: true })
          .limit(1)
          .maybeSingle()

        if (heroError) {
          console.error('Error loading hero section:', heroError)
        }

        if (heroSection) {
          if (heroSection.background_image_url) {
            setHeroImage(heroSection.background_image_url)
          }

          // Load content blocks for hero section
          const { data: contentBlocks } = await supabase
            .from('company_content_blocks')
            .select('*')
            .eq('section_id', heroSection.id)
            .eq('is_visible', true)
            .order('order_index', { ascending: true })

          if (contentBlocks) {
            contentBlocks.forEach((block) => {
              if (block.type === 'heading' && block.content?.text) {
                setHeroTitle(block.content.text)
              } else if (block.type === 'paragraph' && block.content?.text) {
                setHeroSubtitle(block.content.text)
              } else if (block.type === 'cta' && block.content) {
                if (block.content.style === 'primary') {
                  setHeroPrimaryCTA({
                    text: block.content.text || 'Get Started',
                    href: block.content.url || '/contact'
                  })
                } else {
                  setHeroSecondaryCTA({
                    text: block.content.text || 'Learn More',
                    href: block.content.url || '/services'
                  })
                }
              }
            })
          }
        }
      } else {
        console.warn('Homepage not found - check if page with slug "home" and is_homepage=true exists')
      }
    } catch (error) {
      console.error('Error loading hero data:', error)
    }
    // Load featured services
    const { data: servicesData } = await supabase
      .from('company_services')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('order_index', { ascending: true })
      .limit(6)

    if (servicesData) setServices(servicesData)

    // Load featured projects
    const { data: projectsData } = await supabase
      .from('company_projects')
      .select('*')
      .eq('status', 'published')
      .eq('is_featured', true)
      .order('order_index', { ascending: true })
      .limit(3)

    if (projectsData) setProjects(projectsData)

    // Load clients/partners
    const { data: clientsData } = await supabase
      .from('company_partners')
      .select('*')
      .eq('is_visible', true)
      .order('order_index', { ascending: true })
      .limit(12)

    if (clientsData) setClients(clientsData)

    // Load featured testimonials
    const { data: testimonialsData } = await supabase
      .from('company_testimonials')
      .select('*')
      .eq('is_visible', true)
      .eq('is_featured', true)
      .order('order_index', { ascending: true })
      .limit(3)

    if (testimonialsData) setTestimonials(testimonialsData)

    // Load media
    const allMediaIds = [
      ...(servicesData || []).map(s => s.featured_image_id).filter(Boolean),
      ...(projectsData || []).map(p => p.featured_image_id).filter(Boolean),
      ...(clientsData || []).map(c => c.logo_id).filter(Boolean),
      ...(testimonialsData || []).map(t => t.photo_id).filter(Boolean),
    ] as string[]

    if (allMediaIds.length > 0) {
      const { data: mediaData } = await supabase
        .from('company_media')
        .select('*')
        .in('id', allMediaIds)

      if (mediaData) {
        const map: Record<string, Media> = {}
        mediaData.forEach(m => { map[m.id] = m })
        setMediaMap(map)
      }
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <HomeHero
          backgroundImage={heroImage || undefined}
          title={heroTitle || undefined}
          subtitle={heroSubtitle || undefined}
          primaryCTA={heroPrimaryCTA || undefined}
          secondaryCTA={heroSecondaryCTA || undefined}
        />
        <ServicesPreview services={services} mediaMap={mediaMap} />
        <WhyUs />
        <FeaturedProjects projects={projects} mediaMap={mediaMap} />
        <ClientsGrid clients={clients} mediaMap={mediaMap} />
        <TestimonialsSection testimonials={testimonials} mediaMap={mediaMap} />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}
