import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import ClientLogo from '../components/ClientLogo'
import AnimatedFadeIn from '../components/AnimatedFadeIn'
import { supabase } from '../lib/supabaseClient'
import { Client } from '../lib/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Our Clients',
    description: 'Industry-leading companies we proudly work with.',
}

async function getClients(): Promise<Client[]> {
    const { data } = await supabase
        .from('company_clients')
        .select('*')
        .order('created_at', { ascending: false })

    return data || []
}

export default async function Clients() {
    const clients = await getClients()

    return (
        <>
            <Hero
                title="Our Clients"
                subtitle="Industry-leading companies we proudly work with"
            />

            <section className="section-padding container-padding">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 mb-20">
                        {clients.map((client, index) => (
                            <AnimatedFadeIn key={client.id} delay={index * 0.05}>
                                <ClientLogo client={client} />
                            </AnimatedFadeIn>
                        ))}
                    </div>

                    {clients.length === 0 && (
                        <div className="text-center text-white/40 py-16 text-base">
                            Client logos will appear here
                        </div>
                    )}

                    {/* Stats Section */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-16 border-t border-white/10">
                        {[
                            { number: '500+', label: 'Projects Delivered' },
                            { number: '50+', label: 'Happy Clients' },
                            { number: '10+', label: 'Years Experience' },
                            { number: '24/7', label: 'Support' },
                        ].map((stat, index) => (
                            <AnimatedFadeIn key={index} delay={index * 0.1}>
                                <div className="text-center">
                                    <div className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-4 leading-none">
                                        {stat.number}
                                    </div>
                                    <div className="text-xs font-bold text-white/60 uppercase tracking-[0.15em]">
                                        {stat.label}
                                    </div>
                                </div>
                            </AnimatedFadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
