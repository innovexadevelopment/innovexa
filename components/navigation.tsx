'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronDown, Sparkles } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../lib/supabase/client'
import type { Website } from '../lib/types'

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [website, setWebsite] = useState<Website | null>(null)
  const [pages, setPages] = useState<any[]>([])

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    // Close mobile menu when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && !(event.target as Element).closest('nav')) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener('click', handleClickOutside)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isOpen])

  async function loadData() {
    // Load website data
    const { data: websiteData } = await supabase
      .from('websites')
      .select('*')
      .eq('type', 'company')
      .single()

    if (websiteData) setWebsite(websiteData)

    // Load published pages
    const { data: pagesData } = await supabase
      .from('company_pages')
      .select('*')
      .eq('status', 'published')
      .order('order_index', { ascending: true })

    if (pagesData) setPages(pagesData)
  }

  const navLinks = pages
    .filter(p => !p.is_homepage && !['about', 'services', 'work', 'clients', 'testimonials', 'blog', 'contact'].includes(p.slug))
    .map(p => ({ href: `/${p.slug}`, label: p.title }))

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/20 shadow-2xl"
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, -5, 0] }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3 group">
              {website?.logo_url ? (
                <motion.img 
                  src={website.logo_url} 
                  alt={website.name} 
                  className="h-10 transition-transform"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                />
              ) : (
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                  >
                    <Sparkles className="h-6 w-6 text-white" />
                  </motion.div>
                  <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-[shimmer_3s_linear_infinite]">
                    Innovexa
                  </span>
                </div>
              )}
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {[
              { href: '/', label: 'Home' },
              { href: '/services', label: 'Services' },
              { href: '/work', label: 'Work' },
              { href: '/clients', label: 'Clients' },
              { href: '/testimonials', label: 'Testimonials' },
              { href: '/blog', label: 'Blog' },
              ...navLinks,
              { href: '/about', label: 'About' },
            ].map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ y: -3 }}
                whileTap={{ y: 0 }}
              >
                <Link
                  href={link.href}
                  className="text-gray-700 hover:text-blue-600 transition-colors font-semibold relative group px-3 py-2 rounded-lg hover:bg-white/50"
                >
                  {link.label}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full group-hover:w-full transition-all duration-300"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                  />
                </Link>
              </motion.div>
            ))}
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/contact"
                className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all font-bold shadow-xl hover:shadow-2xl overflow-hidden group"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10">Get Quote</span>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden overflow-hidden border-t border-gray-200"
            >
              <div className="py-4 space-y-2">
                <Link
                  href="/"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/services"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/work"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Work
                </Link>
                <Link
                  href="/clients"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Clients
                </Link>
                <Link
                  href="/testimonials"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Testimonials
                </Link>
                <Link
                  href="/blog"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  Blog
                </Link>
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/about"
                  className="block px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors rounded-lg"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/contact"
                  className="block mx-4 mt-4 bg-blue-600 text-white px-4 py-3 rounded-lg text-center hover:bg-blue-700 transition-colors font-semibold shadow-md"
                  onClick={() => setIsOpen(false)}
                >
                  Get Quote
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

