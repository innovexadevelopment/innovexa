import { Metadata } from 'next'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ServiceCard from '../components/ServiceCard'
import AnimatedFadeIn from '../components/AnimatedFadeIn'
import { supabase } from '../lib/supabaseClient'
import { Service } from '../lib/types'

export const metadata: Metadata = {
    title: 'Our Services',
    description: 'Comprehensive solutions designed to help your business thrive.',
}

async function getServices(): Promise<Service[]> {
    const { data } = await supabase
        .from('services')
        .select('*')
        .eq('site', 'company')
        .order('order_index', { ascending: true })

    return data || []
}

export default async function Services() {
    const services = await getServices()

    return (
        <>
            <Hero
                title="Our Services"
                subtitle="Comprehensive solutions designed to help your business thrive"
            />

            <section className="section-padding container-padding">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {services.map((service, index) => (
                            <AnimatedFadeIn key={service.id} delay={index * 0.1}>
                                <ServiceCard service={service} />
                            </AnimatedFadeIn>
                        ))}
                    </div>
                    {services.length === 0 && (
                        <div className="text-center text-white/40 py-16 text-base">
                            No services available at the moment.
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section-padding container-padding bg-black">
                <div className="max-w-5xl mx-auto text-center">
                    <AnimatedFadeIn>
                        <div className="space-y-8">
                            <h2 className="font-black text-white leading-tight">
                                Need a Custom Solution?
                            </h2>
                            <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto leading-relaxed font-light">
                                We tailor our services to meet your specific needs
                            </p>
                            <div className="pt-4">
                                <a href="/contact" className="btn">
                                    Contact Us
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </AnimatedFadeIn>
                </div>
            </section>
        </>
    )
}
