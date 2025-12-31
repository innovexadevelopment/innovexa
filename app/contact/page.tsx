'use client'

import { useState, useEffect } from 'react'
import { Navigation } from '../../components/navigation'
import { Footer } from '../../components/footer'
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, Loader2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '../../lib/supabase/client'
import type { Website } from '../../lib/types'

export default function ContactPage() {
  const [website, setWebsite] = useState<Website | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focused, setFocused] = useState<string | null>(null)

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

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError(null)

    try {
      const { error: submitError } = await supabase
        .from('company_contact_submissions')
        .insert([{
          ...formData,
          subject: 'Contact Form Submission',
        }])

      if (submitError) {
        throw submitError
      }

      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', message: '' })
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (err: any) {
      setError(err.message || 'Error submitting form. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <main className="pt-20">
        {/* Header */}
        <motion.section
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 text-white py-20 relative overflow-hidden"
        >
          {/* Animated background */}
          <motion.div
            className="absolute inset-0 opacity-10"
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            style={{
              backgroundImage: 'radial-gradient(circle at 20% 50%, white 0%, transparent 50%), radial-gradient(circle at 80% 80%, white 0%, transparent 50%)',
              backgroundSize: '400% 400%',
            }}
          />
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4"
            >
              Get In Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto"
            >
              We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </div>
        </motion.section>

        {/* Contact Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Contact Information</h2>
                <div className="space-y-6">
                  {website?.contact_email && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                        className="p-3 bg-blue-100 rounded-lg"
                      >
                        <Mail className="h-6 w-6 text-blue-600" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold mb-1 text-gray-900">Email</h3>
                        <a
                          href={`mailto:${website.contact_email}`}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {website.contact_email}
                        </a>
                      </div>
                    </motion.div>
                  )}
                  {website?.contact_phone && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                        className="p-3 bg-blue-100 rounded-lg"
                      >
                        <Phone className="h-6 w-6 text-blue-600" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold mb-1 text-gray-900">Phone</h3>
                        <a
                          href={`tel:${website.contact_phone}`}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {website.contact_phone}
                        </a>
                      </div>
                    </motion.div>
                  )}
                  {website?.address && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ x: 5 }}
                      className="flex items-start space-x-4 p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                    >
                      <motion.div
                        whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
                        transition={{ duration: 0.3 }}
                        className="p-3 bg-blue-100 rounded-lg"
                      >
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </motion.div>
                      <div>
                        <h3 className="font-semibold mb-1 text-gray-900">Address</h3>
                        <p className="text-gray-600">{website.address}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Send Us a Message</h2>
                
                <AnimatePresence mode="wait">
                  {submitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                      className="bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-8 text-center shadow-lg"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                        className="mb-4"
                      >
                        <CheckCircle className="h-16 w-16 text-green-600 mx-auto" />
                      </motion.div>
                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl font-bold text-green-800 mb-2"
                      >
                        Thank you for your message!
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-green-700"
                      >
                        We'll get back to you as soon as possible.
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="space-y-6 bg-white p-8 rounded-xl shadow-lg border border-gray-100"
                    >
                      {error && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start space-x-3"
                        >
                          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <p className="text-red-800 text-sm">{error}</p>
                        </motion.div>
                      )}

                      {/* Name Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="relative"
                      >
                        <label
                          htmlFor="name"
                          className={`block text-sm font-semibold mb-2 transition-colors ${
                            focused === 'name' ? 'text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          Name *
                        </label>
                        <motion.input
                          type="text"
                          id="name"
                          required
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          onFocus={() => setFocused('name')}
                          onBlur={() => setFocused(null)}
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 focus:bg-white outline-none"
                          placeholder="Your full name"
                        />
                      </motion.div>

                      {/* Email Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                      >
                        <label
                          htmlFor="email"
                          className={`block text-sm font-semibold mb-2 transition-colors ${
                            focused === 'email' ? 'text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          Email *
                        </label>
                        <motion.input
                          type="email"
                          id="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 focus:bg-white outline-none"
                          placeholder="your.email@example.com"
                        />
                      </motion.div>

                      {/* Phone Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="relative"
                      >
                        <label
                          htmlFor="phone"
                          className={`block text-sm font-semibold mb-2 transition-colors ${
                            focused === 'phone' ? 'text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          Phone <span className="text-gray-400 font-normal">(Optional)</span>
                        </label>
                        <motion.input
                          type="tel"
                          id="phone"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          onFocus={() => setFocused('phone')}
                          onBlur={() => setFocused(null)}
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 focus:bg-white outline-none"
                          placeholder="+1 (555) 123-4567"
                        />
                      </motion.div>

                      {/* Message Field */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="relative"
                      >
                        <label
                          htmlFor="message"
                          className={`block text-sm font-semibold mb-2 transition-colors ${
                            focused === 'message' ? 'text-blue-600' : 'text-gray-700'
                          }`}
                        >
                          Message *
                        </label>
                        <motion.textarea
                          id="message"
                          required
                          rows={6}
                          value={formData.message}
                          onChange={(e) =>
                            setFormData({ ...formData, message: e.target.value })
                          }
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          whileFocus={{ scale: 1.01 }}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-300 bg-gray-50 focus:bg-white outline-none resize-none"
                          placeholder="Tell us about your project or inquiry..."
                        />
                      </motion.div>

                      {/* Submit Button */}
                      <motion.button
                        type="submit"
                        disabled={submitting}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: submitting ? 1 : 1.02, y: -2 }}
                        whileTap={{ scale: submitting ? 1 : 0.98 }}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-lg hover:shadow-xl group"
                      >
                        {submitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            Send Message
                            <motion.div
                              whileHover={{ x: 5 }}
                              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                            >
                              <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                            </motion.div>
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

