import AnimatedFadeIn from './AnimatedFadeIn'

interface SectionTitleProps {
    title: string
    subtitle?: string
    align?: 'center' | 'left'
}

export default function SectionTitle({
    title,
    subtitle,
    align = 'center'
}: SectionTitleProps) {
    const alignClass = align === 'center' ? 'text-center' : 'text-left'
    const maxWidthClass = align === 'center' ? 'max-w-4xl mx-auto' : 'max-w-3xl'

    return (
        <AnimatedFadeIn className={`mb-16 sm:mb-20 md:mb-24 ${alignClass}`}>
            <div className={maxWidthClass}>
                <h2 className="font-black text-white mb-6 leading-tight">
                    {title}
                </h2>
                {subtitle && (
                    <p className="text-base sm:text-lg md:text-xl text-white/70 leading-relaxed font-light">
                        {subtitle}
                    </p>
                )}
            </div>
        </AnimatedFadeIn>
    )
}
