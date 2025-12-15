import { Metadata } from 'next'
import { Suspense } from 'react'
import Hero from '../components/Hero'
import PortfolioCard from '../components/PortfolioCard'
import AnimatedFadeIn from '../components/AnimatedFadeIn'
import PortfolioFilter from '../components/PortfolioFilter'
import { supabase } from '../lib/supabaseClient'
import { Project } from '../lib/types'

export const metadata: Metadata = {
    title: 'Our Portfolio',
    description: 'Explore our latest projects and creative work.',
}

async function getPortfolio(): Promise<Project[]> {
    const { data } = await supabase
        .from('projects')
        .select('*')
        .eq('site', 'company')
        .order('created_at', { ascending: false })

    return data || []
}

export default async function PortfolioPage({
    searchParams,
}: {
    searchParams: Promise<{ category?: string }>
}) {
    const portfolioItems = await getPortfolio()
    const { category } = await searchParams
    const selectedCategory = category || 'All'

    const categories = ['All', ...Array.from(new Set(portfolioItems.map(item => item.category).filter(Boolean)))]

    const filteredItems = selectedCategory === 'All'
        ? portfolioItems
        : portfolioItems.filter(item => item.category === selectedCategory)

    return (
        <>
            <Hero
                title="Our Portfolio"
                subtitle="Explore our latest projects and creative work"
            />

            <section className="section-padding container-padding">
                <div className="max-w-7xl mx-auto">
                    {/* Category Filter */}
                    {categories.length > 1 && (
                        <Suspense fallback={<div className="flex justify-center gap-4 mb-16 flex-wrap">Loading...</div>}>
                            <PortfolioFilter categories={categories} selectedCategory={selectedCategory} />
                        </Suspense>
                    )}

                    {/* Portfolio Grid */}
                    {filteredItems.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                            {filteredItems.map((item, index) => (
                                <AnimatedFadeIn key={item.id} delay={index * 0.1}>
                                    <PortfolioCard portfolio={item} />
                                </AnimatedFadeIn>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center text-white/40 py-16 text-base">
                            No portfolio items found
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}
