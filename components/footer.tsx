'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin } from 'lucide-react'
import { supabase } from '../lib/supabase/client'
import type { Website } from '../lib/types'

export function Footer() {
  const [website, setWebsite] = useState<Website | null>(null)

  useEffect(() => {
    loadWebsite()
  }, [])

  async function loadWebsite() {
    const { data } = await supabase
      .from('websites')
      .select('*')
      .eq('type', 'company')
      .single()

    if (data) setWebsite(data)
  }

  const socialLinks = website?.social_links || {}

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white text-xl font-bold mb-4">
              {website?.name || 'Innovexa'}
            </h3>
            <p className="text-gray-400 mb-4">
              Leading the way in innovative solutions and exceptional service delivery.
            </p>
            <div className="flex space-x-4">
              {socialLinks.facebook && (
                <a
                  href={socialLinks.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
              )}
              {socialLinks.twitter && (
                <a
                  href={socialLinks.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              )}
              {socialLinks.linkedin && (
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              )}
              {socialLinks.instagram && (
                <a
                  href={socialLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2">
              {website?.contact_email && (
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <a
                    href={`mailto:${website.contact_email}`}
                    className="hover:text-primary transition-colors"
                  >
                    {website.contact_email}
                  </a>
                </li>
              )}
              {website?.contact_phone && (
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4" />
                  <a
                    href={`tel:${website.contact_phone}`}
                    className="hover:text-primary transition-colors"
                  >
                    {website.contact_phone}
                  </a>
                </li>
              )}
              {website?.address && (
                <li className="flex items-start space-x-2">
                  <MapPin className="h-4 w-4 mt-1" />
                  <span>{website.address}</span>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} {website?.name || 'Innovexa'}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

