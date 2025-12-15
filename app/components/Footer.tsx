import Link from 'next/link'
import { supabase } from '../lib/supabaseClient'
import { Settings } from '../lib/types'

async function getSettings(): Promise<Settings | null> {
    try {
        const { data, error } = await supabase
            .from('settings')
            .select('*')
            .single()

        if (error) {
            return null
        }

        return data
    } catch {
        return null
    }
}

export default async function Footer() {
    const settings = await getSettings()

    const siteName = settings?.site_name || 'Innovexa'
    const address = settings?.address || '123 Business Street, Suite 100, New York, NY 10001'
    const email = settings?.email || 'info@innovexa.com'
    const phone = settings?.phone || '+1 (234) 567-890'

    const quickLinks = [
        { name: 'About', href: '/about' },
        { name: 'Services', href: '/services' },
        { name: 'Portfolio', href: '/portfolio' },
        { name: 'Clients', href: '/clients' },
        { name: 'Contact', href: '/contact' },
    ]

    return (
        <footer className="border-t border-white/10 bg-black">
            <div className="max-w-7xl mx-auto container-padding section-padding">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16 mb-16">
                    {/* Company Info */}
                    <div className="lg:col-span-2">
                        <h3 className="text-3xl md:text-4xl font-black text-white mb-6 tracking-tight">
                            {siteName}
                        </h3>
                        <p className="text-base text-white/70 leading-relaxed max-w-md font-light mb-8">
                            Creating innovative solutions for modern businesses. Your success is our mission.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-white/70 hover:text-white transition-colors duration-300 inline-block"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-6">
                            Contact
                        </h4>
                        <ul className="space-y-4 text-white/70">
                            <li className="text-sm leading-relaxed font-light">
                                {address}
                            </li>
                            <li>
                                <a 
                                    href={`mailto:${email}`} 
                                    className="text-sm hover:text-white transition-colors duration-300 inline-block"
                                >
                                    {email}
                                </a>
                            </li>
                            <li>
                                <a 
                                    href={`tel:${phone}`} 
                                    className="text-sm hover:text-white transition-colors duration-300 inline-block"
                                >
                                    {phone}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Copyright */}
                <div className="border-t border-white/10 pt-8">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-xs text-white/40">
                            © {new Date().getFullYear()} {siteName}. All rights reserved.
                        </p>
                        <div className="flex gap-6 text-xs text-white/40">
                            <Link href="/" className="hover:text-white/60 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/" className="hover:text-white/60 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
