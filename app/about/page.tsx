import { Metadata } from 'next'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import AnimatedFadeIn from '../components/AnimatedFadeIn'

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn more about Innovexa - our mission, vision, and values.',
}

export default function About() {
    return (
        <>
            <Hero
                title="About Innovexa"
                subtitle="Building the future, one innovative solution at a time"
            />

            {/* Mission, Vision, Values */}
            <section className="section-padding container-padding">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
                        {[
                            {
                                title: 'Our Mission',
                                description: 'To empower businesses with innovative solutions that drive growth, efficiency, and success in an ever-evolving digital landscape.',
                            },
                            {
                                title: 'Our Vision',
                                description: 'To be the global leader in delivering transformative technology solutions that shape the future of business and society.',
                            },
                            {
                                title: 'Our Values',
                                description: 'Innovation, integrity, excellence, and client success are at the core of everything we do.',
                            },
                        ].map((item, index) => (
                            <AnimatedFadeIn key={index} delay={index * 0.15}>
                                <div className="card p-8 md:p-10 h-full hover-lift">
                                    <h3 className="text-2xl md:text-3xl font-black text-white mb-6 leading-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-base text-white/70 leading-relaxed font-light">
                                        {item.description}
                                    </p>
                                </div>
                            </AnimatedFadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Story */}
            <section className="section-padding container-padding bg-black">
                <div className="max-w-5xl mx-auto">
                    <SectionTitle
                        title="Our Story"
                    />
                    <div className="space-y-6 md:space-y-8 text-lg md:text-xl text-white/80 leading-relaxed font-light">
                        <AnimatedFadeIn>
                            <p>
                                Founded in 2014, Innovexa began with a simple yet powerful vision: to help
                                businesses harness the power of technology to achieve their goals. What started
                                as a small team of passionate innovators has grown into a leading company serving
                                clients across the globe.
                            </p>
                        </AnimatedFadeIn>
                        <AnimatedFadeIn delay={0.2}>
                            <p>
                                Over the years, we've evolved from a local service provider to an international
                                leader in digital solutions. Our commitment to excellence and innovation has
                                earned us the trust of over 500 clients worldwide.
                            </p>
                        </AnimatedFadeIn>
                        <AnimatedFadeIn delay={0.4}>
                            <p>
                                Today, we continue to push the boundaries of what's possible, combining
                                cutting-edge technology with creative thinking to deliver solutions that make
                                a real difference.
                            </p>
                        </AnimatedFadeIn>
                    </div>
                </div>
            </section>

            {/* Timeline */}
            <section className="section-padding container-padding">
                <div className="max-w-6xl mx-auto">
                    <SectionTitle
                        title="Our Journey"
                        subtitle="Milestones that shaped who we are today"
                    />
                    <div className="relative">
                        {/* Timeline Line */}
                        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2" />

                        {/* Timeline Items */}
                        <div className="space-y-12 md:space-y-16">
                            {[
                                {
                                    year: '2014',
                                    title: 'Foundation',
                                    description: 'Innovexa was founded with a vision to revolutionize business solutions through innovative technology.',
                                },
                                {
                                    year: '2016',
                                    title: 'First 100 Clients',
                                    description: 'Reached our first milestone of serving 100 satisfied clients across various industries.',
                                },
                                {
                                    year: '2018',
                                    title: 'Global Expansion',
                                    description: 'Expanded our operations internationally, opening offices in multiple countries.',
                                },
                                {
                                    year: '2020',
                                    title: 'Digital Transformation',
                                    description: 'Launched our comprehensive digital transformation services, helping businesses adapt to new challenges.',
                                },
                                {
                                    year: '2022',
                                    title: '500+ Projects',
                                    description: 'Celebrated delivering over 500 successful projects and maintaining a 98% client satisfaction rate.',
                                },
                                {
                                    year: '2024',
                                    title: 'Innovation Leader',
                                    description: 'Recognized as a leading innovation company, continuing to push boundaries and deliver excellence.',
                                },
                            ].map((item, index) => (
                                <AnimatedFadeIn key={index} delay={index * 0.1}>
                                    <div className="relative flex flex-col md:flex-row md:items-center gap-6">
                                        {/* Timeline Dot */}
                                        <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-white rounded-full transform md:-translate-x-1/2 z-10 border-2 border-black" />

                                        {/* Content */}
                                        <div className={`md:w-1/2 pl-16 md:pl-0 ${index % 2 === 0 ? 'md:pr-16 md:text-right' : 'md:ml-auto md:pl-16'}`}>
                                            <div className="text-xs font-bold text-white/50 uppercase tracking-[0.2em] mb-3">
                                                {item.year}
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-black text-white mb-4 leading-tight">
                                                {item.title}
                                            </h3>
                                            <p className="text-base text-white/70 leading-relaxed font-light">
                                                {item.description}
                                            </p>
                                        </div>
                                    </div>
                                </AnimatedFadeIn>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="section-padding container-padding bg-black">
                <div className="max-w-7xl mx-auto">
                    <SectionTitle
                        title="Why Choose Us"
                    />
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {[
                            { title: 'Expert Team', description: 'Highly skilled professionals with years of industry experience' },
                            { title: 'Quality Focused', description: 'Delivering excellence in every project we undertake' },
                            { title: 'Innovation Driven', description: 'Using cutting-edge technology and creative solutions' },
                            { title: '24/7 Support', description: 'Always available to help you succeed' },
                        ].map((item, index) => (
                            <AnimatedFadeIn key={index} delay={index * 0.1}>
                                <div className="card p-8 md:p-10 h-full hover-lift">
                                    <h3 className="text-xl md:text-2xl font-black text-white mb-4 leading-tight">{item.title}</h3>
                                    <p className="text-base text-white/70 leading-relaxed font-light">{item.description}</p>
                                </div>
                            </AnimatedFadeIn>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}
