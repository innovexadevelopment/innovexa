'use client'

import { useRouter, useSearchParams } from 'next/navigation'

interface PortfolioFilterProps {
    categories: string[]
    selectedCategory: string
}

export default function PortfolioFilter({ categories, selectedCategory }: PortfolioFilterProps) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const handleFilter = (category: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (category === 'All') {
            params.delete('category')
        } else {
            params.set('category', category)
        }
        router.push(`/portfolio?${params.toString()}`)
    }

    return (
        <div className="flex justify-center gap-3 mb-20 flex-wrap">
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => handleFilter(category)}
                    className={`px-6 py-3 font-bold uppercase tracking-[0.1em] text-xs transition-all duration-300 ${
                        selectedCategory === category
                            ? 'bg-white text-black hover:bg-white/90'
                            : 'bg-white/5 text-white/70 border border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20'
                    }`}
                >
                    {category}
                </button>
            ))}
        </div>
    )
}


