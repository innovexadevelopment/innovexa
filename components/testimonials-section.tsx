'use client'

import { Star } from 'lucide-react'
import { motion } from 'framer-motion'
import type { Testimonial, Media } from '../lib/types'

interface TestimonialsSectionProps {
  testimonials: Testimonial[]
  mediaMap?: Record<string, Media>
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      stiffness: 100,
      damping: 15,
    },
  },
}

export function TestimonialsSection({ testimonials, mediaMap = {} }: TestimonialsSectionProps) {
  if (testimonials.length === 0) {
    return null
  }

  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from the businesses we've helped
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => {
            const photo = testimonial.photo_id ? mediaMap[testimonial.photo_id] : null
            return (
              <motion.div
                key={testimonial.id}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-gray-50 p-6 rounded-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center mb-4">
                  {testimonial.rating && (
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.1 }}
                        >
                          <Star
                            className={`h-4 w-4 ${i < testimonial.rating! ? 'fill-current' : ''}`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-gray-700 mb-4 italic"
                >
                  "{testimonial.content}"
                </motion.p>
                <div className="flex items-center">
                  {photo && (
                    <motion.img
                      whileHover={{ scale: 1.1 }}
                      src={photo.file_url}
                      alt={photo.alt_text || testimonial.name}
                      className="w-12 h-12 rounded-full mr-3 object-cover border-2 border-blue-100"
                    />
                  )}
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    {testimonial.role && (
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    )}
                    {testimonial.company && (
                      <p className="text-sm text-gray-600">{testimonial.company}</p>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

