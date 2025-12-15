'use client'

import { useState } from 'react'

export default function ContactForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: '',
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        alert('This is a demo. Form submission is not implemented (read-only website).')
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <label 
                    htmlFor="name" 
                    className="block text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-4"
                >
                    Your Name *
                </label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/40 focus:bg-white/10 outline-none transition-all duration-300 font-light"
                    placeholder="John Doe"
                />
            </div>

            <div>
                <label 
                    htmlFor="email" 
                    className="block text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-4"
                >
                    Email Address *
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/40 focus:bg-white/10 outline-none transition-all duration-300 font-light"
                    placeholder="john@example.com"
                />
            </div>

            <div>
                <label 
                    htmlFor="phone" 
                    className="block text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-4"
                >
                    Phone Number
                </label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/40 focus:bg-white/10 outline-none transition-all duration-300 font-light"
                    placeholder="+1 (234) 567-890"
                />
            </div>

            <div>
                <label 
                    htmlFor="message" 
                    className="block text-xs font-bold text-white/50 uppercase tracking-[0.15em] mb-4"
                >
                    Message *
                </label>
                <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={8}
                    className="w-full px-6 py-4 bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-white/40 focus:bg-white/10 outline-none transition-all duration-300 resize-none font-light leading-relaxed"
                    placeholder="Tell us about your project..."
                />
            </div>

            <div className="pt-4">
                <button type="submit" className="btn w-full justify-center">
                    Send Message
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                </button>
            </div>

            <p className="text-xs text-white/40 text-center pt-2">
                * This is a demo form. No data will be submitted (read-only website).
            </p>
        </form>
    )
}


