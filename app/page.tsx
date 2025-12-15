import { Metadata } from 'next'
import Hero from './components/Hero'
import SectionTitle from './components/SectionTitle'
import ServiceCard from './components/ServiceCard'
import PortfolioCard from './components/PortfolioCard'
import AnimatedFadeIn from './components/AnimatedFadeIn'
import { supabase, getPublicUrl } from './lib/supabaseClient'
import { Service, Project, Testimonial, HeroSection, ImpactStat } from './lib/types'
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Home - Innovexa',
  description: 'Innovexa - Creating innovative solutions for modern businesses.',
}

async function getHero(): Promise<HeroSection | null> {
  const { data } = await supabase
    .from('hero_sections')
    .select('*')
    .eq('site', 'company')
    .eq('is_active', true)
    .order('order_index', { ascending: true })
    .limit(1)
    .single()

  return data
}

async function getServices(): Promise<Service[]> {
  const { data } = await supabase
    .from('services')
    .select('*')
    .eq('site', 'company')
    .order('order_index', { ascending: true })

  return data || []
}

async function getPortfolioPreview(): Promise<Project[]> {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .eq('site', 'company')
    .order('created_at', { ascending: false })
    .limit(6)

  return data || []
}

async function getTestimonials(): Promise<Testimonial[]> {
  const { data } = await supabase
    .from('testimonials')
    .select('*')
    .eq('site', 'company')
    .order('order_index', { ascending: true })
    .limit(5)

  return data || []
}

async function getImpactStats(): Promise<ImpactStat[]> {
  const { data } = await supabase
    .from('impact_stats')
    .select('*')
    .eq('site', 'company')
    .order('order_index', { ascending: true })
    .limit(4)

  return data || []
}

export default async function Home() {
  const [hero, services, portfolioItems, testimonials, impactStats] = await Promise.all([
    getHero(),
    getServices(),
    getPortfolioPreview(),
    getTestimonials(),
    getImpactStats(),
  ])

  const heroImage = hero?.background_image_path ? getPublicUrl(hero.background_image_path) : undefined

  return (
    <>
      {/* Hero Section with Banner Image */}
      <Hero
        title={hero?.title || "Innovation Meets Excellence"}
        subtitle={hero?.subtitle || "We transform bold ideas into exceptional digital experiences"}
        bannerImageUrl={heroImage}
        ctaText={hero?.primary_cta_label || "Start Your Project"}
        ctaLink={hero?.primary_cta_url || "/contact"}
      />

      {/* Impact Stats - Premium Design */}
      {impactStats.length > 0 && (
        <section className="section-padding container-padding bg-black relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {impactStats.map((stat, index) => (
                <AnimatedFadeIn key={stat.id} delay={index * 0.1}>
                  <div className="card p-8 text-center group hover:scale-105 transition-transform duration-300">
                    <div className="text-5xl md:text-6xl font-black text-white mb-4 bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent">
                      {stat.value}{stat.suffix || ''}
                    </div>
                    <div className="text-sm font-bold text-white/80 uppercase tracking-wider mb-2">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <div className="text-xs text-white/50">{stat.description}</div>
                    )}
                  </div>
                </AnimatedFadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* About Section - Enhanced */}
      <section className="section-padding container-padding bg-black">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 items-center">
            <AnimatedFadeIn>
              <div className="space-y-8">
                <div className="inline-block px-4 py-2 bg-white/10 text-white font-bold text-xs uppercase tracking-wider rounded-full mb-4">
                  About Us
                </div>
                <h2 className="font-black text-white leading-tight">
                  Who We Are
                </h2>
                <div className="space-y-6">
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                    Innovexa is a forward-thinking company dedicated to delivering exceptional
                    solutions that drive business growth and innovation.
                  </p>
                  <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                    With years of experience and a passion for excellence, we help businesses
                    transform their vision into reality.
                  </p>
                </div>
                <div className="pt-4">
                  <a href="/about" className="btn">
                    Discover Our Story
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </AnimatedFadeIn>

            <AnimatedFadeIn delay={0.2}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '500+', label: 'Projects', icon: Sparkles },
                  { number: '50+', label: 'Clients', icon: TrendingUp },
                  { number: '10+', label: 'Years', icon: Sparkles },
                  { number: '24/7', label: 'Support', icon: TrendingUp },
                ].map((stat, index) => {
                  const Icon = stat.icon
                  return (
                    <div key={index} className="card p-8 hover-lift text-center group">
                      <div className="mb-4 flex justify-center">
                        <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors">
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                      <div className="text-4xl md:text-5xl font-black text-white mb-3 leading-none">
                        {stat.number}
                      </div>
                      <div className="text-xs font-bold text-white/60 uppercase tracking-[0.15em]">
                        {stat.label}
                      </div>
                    </div>
                  )
                })}
              </div>
            </AnimatedFadeIn>
          </div>
        </div>
      </section>

      {/* Services Section - Premium */}
      <section className="section-padding container-padding bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Our Services"
            subtitle="Comprehensive solutions designed to help your business thrive"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-16">
            {services.map((service, index) => (
              <AnimatedFadeIn key={service.id} delay={index * 0.1}>
                <ServiceCard service={service} />
              </AnimatedFadeIn>
            ))}
          </div>
          {services.length === 0 && (
            <div className="text-center text-white/40 py-16 text-base">
              No services available
            </div>
          )}
        </div>
      </section>

      {/* Portfolio Section - Enhanced */}
      <section className="section-padding container-padding bg-black">
        <div className="max-w-7xl mx-auto">
          <SectionTitle
            title="Recent Work"
            subtitle="Explore our latest projects and creative solutions"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16 mt-16">
            {portfolioItems.map((item, index) => (
              <AnimatedFadeIn key={item.id} delay={index * 0.1}>
                <PortfolioCard portfolio={item} />
              </AnimatedFadeIn>
            ))}
          </div>

          {portfolioItems.length > 0 && (
            <div className="text-center">
              <a href="/portfolio" className="btn">
                View All Projects
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section - Premium */}
      {testimonials.length > 0 && (
        <section className="section-padding container-padding bg-black relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
          
          <div className="max-w-7xl mx-auto relative z-10">
            <SectionTitle
              title="What Our Clients Say"
              subtitle="Trusted by industry-leading companies"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mt-16">
              {testimonials.map((testimonial, index) => (
                <AnimatedFadeIn key={testimonial.id} delay={index * 0.1}>
                  <div className="card p-8 group hover:scale-105 transition-transform">
                    {testimonial.avatar_image_path && (
                      <img
                        src={getPublicUrl(testimonial.avatar_image_path)}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover mb-6 ring-2 ring-white/20"
                      />
                    )}
                    <p className="text-white/90 mb-6 italic text-lg leading-relaxed relative pl-4 border-l-2 border-white/20">
                      "{testimonial.quote}"
                    </p>
                    <div>
                      <div className="font-bold text-white text-lg">{testimonial.name}</div>
                      {testimonial.role && (
                        <div className="text-sm text-white/60 mt-1">
                          {testimonial.role}
                          {testimonial.organization && `, ${testimonial.organization}`}
                        </div>
                      )}
                    </div>
                  </div>
                </AnimatedFadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section - Premium */}
      <section className="section-padding container-padding bg-black relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <AnimatedFadeIn>
            <div className="space-y-10">
              <Sparkles className="h-16 w-16 mx-auto text-white/60" />
              <h2 className="font-black text-white leading-tight">
                Ready to Start?
              </h2>
              <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
                Let's create something extraordinary together
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center pt-4">
                <a href="/contact" className="btn text-base px-8 py-4">
                  Get In Touch
                  <ArrowRight className="w-5 h-5" />
                </a>
                <a href="/portfolio" className="btn-outline btn text-base px-8 py-4">
                  View Portfolio
                </a>
              </div>
            </div>
          </AnimatedFadeIn>
        </div>
      </section>
    </>
  )
}
