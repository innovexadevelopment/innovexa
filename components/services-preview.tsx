'use client'

import Link from 'next/link'
import { ArrowRight, Code, Palette, Smartphone, Globe, Zap, TrendingUp } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Service, Media } from '../lib/types'

interface ServicesPreviewProps {
  services: Service[]
  mediaMap?: Record<string, Media>
}

const icons = [Code, Palette, Smartphone, Globe, Zap, TrendingUp]

function Card3D({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['10deg', '-10deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-10deg', '10deg'])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="transform-gpu"
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export function ServicesPreview({ services, mediaMap = {} }: ServicesPreviewProps) {
  if (services.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-2xl mb-6"
          >
            <Zap className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Our <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Comprehensive solutions tailored to your business needs
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service, index) => {
            const image = service.featured_image_id ? mediaMap[service.featured_image_id] : null
            const Icon = icons[index % icons.length]
            
            return (
              <Card3D key={service.id} delay={index * 0.1}>
                <motion.div
                  whileHover={{ y: -12 }}
                  className="relative h-full bg-white rounded-3xl shadow-xl overflow-hidden group cursor-pointer border border-gray-100"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  {/* Gradient overlay on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                  />
                  
                  {/* Icon badge */}
                  <div className="absolute top-6 right-6 z-20">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                      className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg"
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                  </div>

                  <div className="relative overflow-hidden">
                    {image ? (
                      <motion.img
                        src={image.file_url}
                        alt={image.alt_text || service.title}
                        className="w-full h-56 object-cover"
                        whileHover={{ scale: 1.15 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <div className="h-56 bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon className="h-20 w-20 text-white/30" />
                        </div>
                      </div>
                    )}
                    {/* Shine effect */}
                    <div className="absolute inset-0 shine opacity-0 group-hover:opacity-100"></div>
                  </div>
                  
                  <div className="p-8 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                    <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                      {service.title}
                    </h3>
                    {service.description && (
                      <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                        {service.description}
                      </p>
                    )}
                    <motion.div whileHover={{ x: 8 }}>
                      <Link
                        href={`/services/${service.slug}`}
                        className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold group/link"
                      >
                        Learn More 
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Corner accent */}
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </motion.div>
              </Card3D>
            )
          })}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-16"
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all group"
            >
              View All Services 
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
