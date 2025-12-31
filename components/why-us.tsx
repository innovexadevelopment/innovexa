'use client'

import { Award, Users, Star, Zap, Shield, TrendingUp } from 'lucide-react'
import { motion } from 'framer-motion'

interface WhyUsProps {
  items?: Array<{
    icon?: string
    title: string
    description: string
  }>
}

const iconMap: Record<string, any> = {
  award: Award,
  users: Users,
  star: Star,
  zap: Zap,
  shield: Shield,
  trending: TrendingUp,
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

export function WhyUs({ items }: WhyUsProps) {
  const defaultItems = [
    { icon: Award, title: 'Award Winning', description: 'Recognized excellence in our industry' },
    { icon: Users, title: 'Expert Team', description: 'Skilled professionals dedicated to your success' },
    { icon: Star, title: 'Quality First', description: 'Uncompromising standards in everything we do' },
  ]

  const displayItems = items || defaultItems

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
            Why Choose Us
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We combine expertise, innovation, and dedication to deliver exceptional results
          </p>
        </motion.div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {displayItems.map((item, i) => {
            const Icon = item.icon 
              ? (typeof item.icon === 'string' ? iconMap[item.icon.toLowerCase()] || Award : item.icon)
              : defaultItems[i % defaultItems.length].icon
            return (
              <motion.div
                key={i}
                variants={itemVariants}
                whileHover={{ y: -10, scale: 1.05 }}
                className="text-center p-6 rounded-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 border border-gray-100"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                </motion.div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

