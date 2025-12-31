'use client'

import Link from 'next/link'
import { ArrowRight, ExternalLink, Award, TrendingUp } from 'lucide-react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'
import type { Project, Media } from '../lib/types'

interface FeaturedProjectsProps {
  projects: Project[]
  mediaMap?: Record<string, Media>
}

function ProjectCard3D({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 })
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 })
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg'])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg'])

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
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

export function FeaturedProjects({ projects, mediaMap = {} }: FeaturedProjectsProps) {
  if (projects.length === 0) {
    return null
  }

  return (
    <section className="py-24 bg-white overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500 rounded-full blur-3xl"></div>
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
            <Award className="h-8 w-8 text-blue-600" />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            Featured <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Work</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Real projects, real results. See what we've accomplished for our clients
          </p>
        </motion.div>
        
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project, index) => {
            const image = project.featured_image_id ? mediaMap[project.featured_image_id] : null
            return (
              <ProjectCard3D key={project.id} delay={index * 0.15}>
                <motion.div
                  whileHover={{ y: -12 }}
                  className="relative h-full bg-white rounded-3xl shadow-xl overflow-hidden group cursor-pointer border border-gray-100"
                  style={{
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <Link
                    href={`/work/${project.slug}`}
                    className="block h-full"
                  >
                    {/* Gradient overlay on hover */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-indigo-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
                    />
                    
                    {/* Featured badge */}
                    {project.is_featured && (
                      <div className="absolute top-6 left-6 z-20">
                        <motion.div
                          whileHover={{ rotate: 360 }}
                          transition={{ duration: 0.5 }}
                          className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl flex items-center justify-center shadow-lg"
                        >
                          <TrendingUp className="h-5 w-5 text-white" />
                        </motion.div>
                      </div>
                    )}

                    <div className="relative overflow-hidden">
                      {image ? (
                        <motion.img
                          src={image.file_url}
                          alt={image.alt_text || project.title}
                          className="w-full h-64 object-cover"
                          whileHover={{ scale: 1.2 }}
                          transition={{ duration: 0.6 }}
                        />
                      ) : (
                        <div className="h-64 bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600 relative">
                          <div className="absolute inset-0 flex items-center justify-center">
                            <ExternalLink className="h-20 w-20 text-white/30" />
                          </div>
                        </div>
                      )}
                      {/* Shine effect */}
                      <div className="absolute inset-0 shine opacity-0 group-hover:opacity-100"></div>
                      
                      {/* Hover overlay with icon */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center z-10">
                        <motion.div
                          initial={{ scale: 0 }}
                          whileHover={{ scale: 1 }}
                          className="w-16 h-16 bg-white rounded-full flex items-center justify-center"
                        >
                          <ExternalLink className="h-8 w-8 text-blue-600" />
                        </motion.div>
                      </div>
                    </div>
                    
                    <div className="p-8 relative z-10" style={{ transform: 'translateZ(30px)' }}>
                      {project.client_name && (
                        <motion.p
                          className="text-sm text-blue-600 font-bold mb-3 uppercase tracking-wider"
                        >
                          {project.client_name}
                        </motion.p>
                      )}
                      <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed">
                          {project.description}
                        </p>
                      )}
                      {project.category && (
                        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
                          {project.category}
                        </div>
                      )}
                      <div className="flex items-center text-blue-600 font-semibold group/link mt-4">
                        View Project
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Corner accent */}
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </Link>
                </motion.div>
              </ProjectCard3D>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
