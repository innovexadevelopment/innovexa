import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from '../../components/SectionTitle'
import AnimatedFadeIn from '../../components/AnimatedFadeIn'
import { supabase, getPublicUrl } from '../../lib/supabaseClient'
import { Portfolio, PortfolioMedia } from '../../lib/types'

interface Props {
    params: Promise<{ id: string }>
}

async function getPortfolio(id: string): Promise<Portfolio | null> {
    const { data, error } = await supabase
        .from('company_portfolio')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return null
    return data
}

async function getPortfolioMedia(portfolioId: string): Promise<PortfolioMedia[]> {
    const { data } = await supabase
        .from('company_portfolio_media')
        .select('*')
        .eq('portfolio_id', portfolioId)
        .order('created_at', { ascending: true })

    return data || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const portfolio = await getPortfolio(id)

    if (!portfolio) {
        return {
            title: 'Portfolio Not Found',
        }
    }

    return {
        title: portfolio.title,
        description: portfolio.description.substring(0, 160),
    }
}

export default async function PortfolioDetail({ params }: Props) {
    const { id } = await params
    const portfolio = await getPortfolio(id)

    if (!portfolio) {
        notFound()
    }

    const mediaItems = await getPortfolioMedia(id)
    const coverImageUrl = portfolio.cover_image.startsWith('http')
        ? portfolio.cover_image
        : getPublicUrl(portfolio.cover_image)

    return (
        <>
            {/* Portfolio Header */}
            <section className="pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedFadeIn>
                        <div className="text-center text-white">
                            <div className="inline-block bg-white/10 backdrop-blur-sm px-4 py-2 mb-6">
                                <span className="text-sm font-bold uppercase tracking-wider">{portfolio.category}</span>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black mb-6">
                                {portfolio.title}
                            </h1>
                        </div>
                    </AnimatedFadeIn>
                </div>
            </section>

            {/* Cover Image */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedFadeIn>
                        <div className="relative h-96 md:h-[600px] bg-black overflow-hidden">
                            <Image
                                src={coverImageUrl}
                                alt={portfolio.title}
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>
                    </AnimatedFadeIn>
                </div>
            </section>

            {/* Project Description */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <AnimatedFadeIn delay={0.1}>
                        <h2 className="text-4xl md:text-5xl font-black text-white mb-8">
                            Project Overview
                        </h2>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-white/60 leading-relaxed whitespace-pre-line">
                                {portfolio.description}
                            </p>
                        </div>
                    </AnimatedFadeIn>

                    {/* Project Details */}
                    <div className="mt-12 grid md:grid-cols-3 gap-6">
                        <AnimatedFadeIn delay={0.2}>
                            <div className="card p-6">
                                <h3 className="font-bold text-white mb-2 uppercase tracking-wider text-sm">Category</h3>
                                <p className="text-white/60">{portfolio.category}</p>
                            </div>
                        </AnimatedFadeIn>
                        <AnimatedFadeIn delay={0.25}>
                            <div className="card p-6">
                                <h3 className="font-bold text-white mb-2 uppercase tracking-wider text-sm">Completed</h3>
                                <p className="text-white/60">
                                    {new Date(portfolio.created_at).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                    })}
                                </p>
                            </div>
                        </AnimatedFadeIn>
                        <AnimatedFadeIn delay={0.3}>
                            <div className="card p-6">
                                <h3 className="font-bold text-white mb-2 uppercase tracking-wider text-sm">Status</h3>
                                <p className="text-white font-semibold">Completed</p>
                            </div>
                        </AnimatedFadeIn>
                    </div>
                </div>
            </section>

            {/* Media Gallery */}
            {mediaItems.length > 0 && (
                <section className="py-24 px-6 bg-black">
                    <div className="max-w-7xl mx-auto">
                        <SectionTitle
                            title="Project Gallery"
                            subtitle="Additional images from this project"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {mediaItems.map((media, index) => {
                                const mediaUrl = media.media_url.startsWith('http')
                                    ? media.media_url
                                    : getPublicUrl(media.media_url)

                                return (
                                    <AnimatedFadeIn key={media.id} delay={index * 0.1}>
                                        <div className="relative h-64 bg-black overflow-hidden group">
                                            <Image
                                                src={mediaUrl}
                                                alt={`${portfolio.title} - Image ${index + 1}`}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                    </AnimatedFadeIn>
                                )
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <AnimatedFadeIn>
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-8">
                            Like What You See?
                        </h2>
                        <p className="text-xl text-white/60 mb-12">
                            Let's create something amazing together. Contact us to discuss your project.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact" className="btn">
                                Start Your Project
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                            <Link href="/portfolio" className="btn-outline btn">
                                View More Projects
                            </Link>
                        </div>
                    </AnimatedFadeIn>
                </div>
            </section>
        </>
    )
}
