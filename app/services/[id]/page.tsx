import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import SectionTitle from '../../components/SectionTitle'
import ServiceCard from '../../components/ServiceCard'
import AnimatedFadeIn from '../../components/AnimatedFadeIn'
import { supabase, getPublicUrl } from '../../lib/supabaseClient'
import { Service } from '../../lib/types'

interface Props {
    params: Promise<{ id: string }>
}

async function getService(id: string): Promise<Service | null> {
    const { data, error } = await supabase
        .from('company_services')
        .select('*')
        .eq('id', id)
        .single()

    if (error || !data) return null
    return data
}

async function getRelatedServices(currentId: string): Promise<Service[]> {
    const { data } = await supabase
        .from('company_services')
        .select('*')
        .neq('id', currentId)
        .limit(3)

    return data || []
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } = await params
    const service = await getService(id)

    if (!service) {
        return {
            title: 'Service Not Found',
        }
    }

    return {
        title: service.title,
        description: service.description.substring(0, 160),
    }
}

export default async function ServiceDetail({ params }: Props) {
    const { id } = await params
    const service = await getService(id)

    if (!service) {
        notFound()
    }

    const relatedServices = await getRelatedServices(id)
    const iconUrl = service.icon_url.startsWith('http')
        ? service.icon_url
        : getPublicUrl(service.icon_url)

    return (
        <>
            {/* Service Header */}
            <section className="pt-32 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <AnimatedFadeIn>
                        <div className="text-center text-white">
                            <div className="w-24 h-24 bg-white/10 backdrop-blur-sm flex items-center justify-center mx-auto mb-6">
                                <div className="relative w-16 h-16">
                                    <Image
                                        src={iconUrl}
                                        alt={service.title}
                                        fill
                                        className="object-contain brightness-0 invert"
                                    />
                                </div>
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black mb-6">
                                {service.title}
                            </h1>
                        </div>
                    </AnimatedFadeIn>
                </div>
            </section>

            {/* Service Details */}
            <section className="py-24 px-6">
                <div className="max-w-4xl mx-auto">
                    <AnimatedFadeIn>
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-white/60 leading-relaxed whitespace-pre-line">
                                {service.description}
                            </p>
                        </div>
                    </AnimatedFadeIn>

                    {/* Service Features */}
                    <div className="mt-16 grid md:grid-cols-2 gap-8">
                        <AnimatedFadeIn delay={0.1}>
                            <div className="card p-8">
                                <h3 className="text-2xl font-black text-white mb-6">Key Benefits</h3>
                                <ul className="space-y-3 text-white/60">
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-white mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Professional and experienced team
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-white mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Customized solutions for your needs
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-white mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Timely delivery and ongoing support
                                    </li>
                                    <li className="flex items-start">
                                        <svg className="w-6 h-6 text-white mr-2 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                        Competitive pricing and value
                                    </li>
                                </ul>
                            </div>
                        </AnimatedFadeIn>

                        <AnimatedFadeIn delay={0.2}>
                            <div className="card p-8">
                                <h3 className="text-2xl font-black text-white mb-6">How It Works</h3>
                                <ol className="space-y-4">
                                    <li className="flex">
                                        <span className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold mr-3">1</span>
                                        <div>
                                            <strong className="text-white">Consultation</strong>
                                            <p className="text-white/60 text-sm mt-1">We discuss your needs and goals</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold mr-3">2</span>
                                        <div>
                                            <strong className="text-white">Planning</strong>
                                            <p className="text-white/60 text-sm mt-1">We create a customized strategy</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold mr-3">3</span>
                                        <div>
                                            <strong className="text-white">Execution</strong>
                                            <p className="text-white/60 text-sm mt-1">We implement the solution</p>
                                        </div>
                                    </li>
                                    <li className="flex">
                                        <span className="flex-shrink-0 w-8 h-8 bg-white text-black rounded-full flex items-center justify-center font-bold mr-3">4</span>
                                        <div>
                                            <strong className="text-white">Support</strong>
                                            <p className="text-white/60 text-sm mt-1">Ongoing assistance and maintenance</p>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </AnimatedFadeIn>
                    </div>

                    {/* CTA */}
                    <div className="mt-16 text-center">
                        <AnimatedFadeIn delay={0.3}>
                            <div className="card p-12">
                                <h3 className="text-3xl md:text-4xl font-black text-white mb-6">
                                    Ready to Get Started?
                                </h3>
                                <p className="text-xl mb-8 text-white/60">
                                    Contact us today to learn more about how this service can benefit your business.
                                </p>
                                <Link href="/contact" className="btn">
                                    Get In Touch
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </Link>
                            </div>
                        </AnimatedFadeIn>
                    </div>
                </div>
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
                <section className="py-24 px-6 bg-black">
                    <div className="max-w-7xl mx-auto">
                        <SectionTitle
                            title="Related Services"
                            subtitle="Explore more of what we offer"
                        />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedServices.map((relatedService, index) => (
                                <AnimatedFadeIn key={relatedService.id} delay={index * 0.1}>
                                    <ServiceCard service={relatedService} />
                                </AnimatedFadeIn>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}
