'use client'

import { useEffect, useState } from 'react'
import { Navigation } from '../../components/navigation'
import { Footer } from '../../components/footer'
import { supabase } from '../../lib/supabase/client'
import type { Page, Section, ContentBlock, TeamMember, Media } from '../../lib/types'

export default function AboutPage() {
  const [page, setPage] = useState<Page | null>(null)
  const [sections, setSections] = useState<Section[]>([])
  const [blocks, setBlocks] = useState<Record<string, ContentBlock[]>>({})
  const [media, setMedia] = useState<Record<string, Media>>({})
  const [team, setTeam] = useState<TeamMember[]>([])

  useEffect(() => {
    loadPage()
    loadTeam()
  }, [])

  async function loadPage() {
    const { data: pageData } = await supabase
      .from('company_pages')
      .select('*')
      .eq('slug', 'about')
      .eq('status', 'published')
      .single()

    if (!pageData) return

    setPage(pageData)

    const { data: sectionsData } = await supabase
      .from('company_sections')
      .select('*')
      .eq('page_id', pageData.id)
      .eq('is_visible', true)
      .order('order_index', { ascending: true })

    if (sectionsData) {
      setSections(sectionsData)

      const sectionIds = sectionsData.map(s => s.id)
      const { data: blocksData } = await supabase
        .from('company_content_blocks')
        .select('*')
        .in('section_id', sectionIds)
        .eq('is_visible', true)
        .order('order_index', { ascending: true })

      if (blocksData) {
        const blocksMap: Record<string, ContentBlock[]> = {}
        blocksData.forEach(block => {
          if (!blocksMap[block.section_id]) blocksMap[block.section_id] = []
          blocksMap[block.section_id].push(block)
        })
        setBlocks(blocksMap)

        // Load media for content block images
        const imageIds = blocksData
          .filter(block => block.type === 'image' && block.content?.image_id)
          .map(block => block.content.image_id)
          .filter(Boolean) as string[]

        if (imageIds.length > 0) {
          const { data: mediaData } = await supabase
            .from('company_media')
            .select('*')
            .in('id', imageIds)

          if (mediaData) {
            const mediaMap: Record<string, Media> = {}
            mediaData.forEach(m => { mediaMap[m.id] = m })
            setMedia(prev => ({ ...prev, ...mediaMap }))
          }
        }
      }
    }
  }

  async function loadTeam() {
    const { data } = await supabase
      .from('company_team')
      .select('*')
      .eq('is_visible', true)
      .order('order_index', { ascending: true })

    if (data) {
      setTeam(data)

      // Load media for team member photos
      const photoIds = data.map(m => m.photo_id).filter(Boolean) as string[]
      if (photoIds.length > 0) {
        const { data: mediaData } = await supabase
          .from('company_media')
          .select('*')
          .in('id', photoIds)

        if (mediaData) {
          const mediaMap: Record<string, Media> = {}
          mediaData.forEach(m => { mediaMap[m.id] = m })
          // Merge with existing media
          setMedia(prev => ({ ...prev, ...mediaMap }))
        }
      }
    }
  }

  function renderContentBlock(block: ContentBlock) {
    switch (block.type) {
      case 'heading':
        const level = block.content.level || 2
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements
        return (
          <HeadingTag className="text-2xl md:text-3xl font-bold mb-4 text-gray-900">
            {block.content.text}
          </HeadingTag>
        )
      case 'paragraph':
        return (
          <p className="text-gray-600 mb-4 leading-relaxed">
            {block.content.text}
          </p>
        )
      case 'image':
        const image = block.content.image_id ? media[block.content.image_id] : null
        return image ? (
          <img
            src={image.file_url}
            alt={image.alt_text || ''}
            className="w-full rounded-lg mb-4"
          />
        ) : null
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        {page && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              {page.title}
            </h1>

            {sections.map((section) => (
              <section
                key={section.id}
                className="mb-12"
                style={{
                  backgroundColor: section.background_color || undefined,
                  paddingTop: `${section.padding_top}px`,
                  paddingBottom: `${section.padding_bottom}px`,
                }}
              >
                {section.title && (
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">{section.title}</h2>
                )}
                {blocks[section.id]?.map(block => (
                  <div key={block.id}>{renderContentBlock(block)}</div>
                ))}
              </section>
            ))}

            {team.length > 0 && (
              <section className="mt-16">
                <h2 className="text-3xl font-bold mb-8 text-gray-900">Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {team.map((member) => {
                    const photo = member.photo_id ? media[member.photo_id] : null
                    return (
                      <div key={member.id} className="text-center bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                        {photo ? (
                          <img
                            src={photo.file_url}
                            alt={photo.alt_text || member.name}
                            className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-blue-100"
                          />
                        ) : (
                          <div className="w-32 h-32 rounded-full mx-auto mb-4 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-3xl font-bold">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">{member.name}</h3>
                        {member.role && <p className="text-blue-600 mb-2 font-medium">{member.role}</p>}
                        {member.bio && <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>}
                      </div>
                    )
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  )
}

