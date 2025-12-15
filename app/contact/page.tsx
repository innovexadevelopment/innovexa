import { Metadata } from 'next'
import Image from 'next/image'
import Hero from '../components/Hero'
import AnimatedFadeIn from '../components/AnimatedFadeIn'
import ContactForm from '../components/ContactForm'
import { supabase, getPublicUrl } from '../lib/supabaseClient'
import { Settings, Media } from '../lib/types'

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with us. Let\'s discuss how we can help your business grow.',
}

async function getSettings(): Promise<Settings | null> {
    try {
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .single()

        if (error) return null
        return data
    } catch {
        return null
    }
}

async function getContactImage(): Promise<string | undefined> {
    const { data } = await supabase
        .from('media')
        .select('url')
        .eq('folder', 'contact')
        .order('created_at', { ascending: false })
        .limit(1)
        .single()

    if (data?.url) {
        return data.url.startsWith('http') ? data.url : getPublicUrl(data.url)
    }
    return undefined
}

export default async function Contact() {
    const settings = await getSettings()
    const contactImage = await getContactImage()

    const address = settings?.address || '123 Business Street, Suite 100, New York, NY 10001'
    const email = settings?.email || 'info@innovexa.com'
    const phone = settings?.phone || '+1 (234) 567-890'

    return (
        <>
            <Hero
                title="Get In Touch"
                subtitle="Let's discuss how we can help your business grow"
            />

            <section className="section-padding container-padding">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 xl:gap-24 mb-20">
                        {/* Contact Info */}
                        <AnimatedFadeIn>
                            <div className="space-y-12">
                                <div>
                                    <h2 className="font-black text-white mb-8 leading-tight">
                                        Contact Information
                                    </h2>
                                </div>

                                <div className="space-y-10">
                                    <div>
                                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-4">
                                            Address
                                        </h3>
                                        <p className="text-base text-white/80 leading-relaxed whitespace-pre-line font-light">
                                            {address}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-4">
                                            Email
                                        </h3>
                                        <a 
                                            href={`mailto:${email}`} 
                                            className="text-base text-white hover:text-white/70 transition-colors duration-300 inline-block font-light"
                                        >
                                            {email}
                                        </a>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-4">
                                            Phone
                                        </h3>
                                        <a 
                                            href={`tel:${phone}`} 
                                            className="text-base text-white hover:text-white/70 transition-colors duration-300 inline-block font-light"
                                        >
                                            {phone}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </AnimatedFadeIn>

                        {/* Contact Form */}
                        <AnimatedFadeIn delay={0.2}>
                            <div className="card p-8 md:p-10">
                                <ContactForm />
                            </div>
                        </AnimatedFadeIn>
                    </div>

                    {/* Contact Image and Map */}
                    <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
                        {/* Contact Image */}
                        {contactImage && (
                            <AnimatedFadeIn delay={0.3}>
                                <div className="relative h-[400px] md:h-[500px] bg-black overflow-hidden">
                                    <Image
                                        src={contactImage}
                                        alt="Contact"
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                </div>
                            </AnimatedFadeIn>
                        )}

                        {/* Map */}
                        <AnimatedFadeIn delay={0.4}>
                            <div className="relative h-[400px] md:h-[500px] bg-white/5 border border-white/10 overflow-hidden">
                                <iframe
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.184132337815!2d-73.98784468459412!3d40.75889597932736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    allowFullScreen
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                    className="absolute inset-0"
                                />
                            </div>
                        </AnimatedFadeIn>
                    </div>
                </div>
            </section>
        </>
    )
}
