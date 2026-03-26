'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { SearchEntry } from '@/lib/search-index'

function getSearchIndex(): SearchEntry[] {
  const el = document.getElementById('search-index')
  if (!el?.textContent) return []
  try {
    return JSON.parse(el.textContent) as SearchEntry[]
  } catch {
    return []
  }
}

function search(query: string, entries: SearchEntry[]): SearchEntry[] {
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean)
  if (terms.length === 0) return []

  const scored = entries.map((entry) => {
    const haystack = [entry.title, entry.description, ...(entry.tags ?? [])].join(' ').toLowerCase()
    let score = 0
    for (const term of terms) {
      if (entry.title.toLowerCase().includes(term)) score += 3
      if (entry.tags?.some((t) => t.toLowerCase().includes(term))) score += 2
      if (entry.description.toLowerCase().includes(term)) score += 1
      if (!haystack.includes(term)) return { entry, score: 0 }
    }
    return { entry, score }
  })

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10)
    .map((s) => s.entry)
}

const TYPE_LABELS: Record<SearchEntry['type'], string> = {
  blog: 'Blog',
  datasheet: 'Datasheet',
  webinar: 'Webinar',
  feature: 'Feature',
  solution: 'Solution',
  page: 'Page',
}

const TYPE_COLORS: Record<SearchEntry['type'], string> = {
  blog: 'bg-blue-100 text-blue-700',
  datasheet: 'bg-green-100 text-green-700',
  webinar: 'bg-purple-100 text-purple-700',
  feature: 'bg-amber-100 text-amber-700',
  solution: 'bg-teal-100 text-teal-700',
  page: 'bg-gray-100 text-gray-700',
}

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchEntry[]>([])
  const [activeIndex, setActiveIndex] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const indexRef = useRef<SearchEntry[]>([])
  const router = useRouter()

  // Load index on first open
  const openSearch = useCallback(() => {
    setOpen(true)
    setQuery('')
    setResults([])
    setActiveIndex(0)
    if (indexRef.current.length === 0) {
      indexRef.current = getSearchIndex()
    }
  }, [])

  // Keyboard shortcut: Cmd/Ctrl+K
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        openSearch()
      }
      if (e.key === 'Escape') {
        setOpen(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [openSearch])

  // Focus input when opened
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 0)
    }
  }, [open])

  // Search on query change
  useEffect(() => {
    const results = search(query, indexRef.current)
    setResults(results)
    setActiveIndex(0)
  }, [query])

  function navigate(url: string) {
    setOpen(false)
    router.push(url)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setActiveIndex((i) => Math.min(i + 1, results.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setActiveIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && results[activeIndex]) {
      navigate(results[activeIndex].url)
    }
  }

  return (
    <>
      <button
        onClick={openSearch}
        className='flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-1.5 text-sm text-gray-500 hover:border-gray-300 hover:text-gray-700 transition-colors'
        aria-label='Search'
      >
        <svg className='h-4 w-4' fill='none' viewBox='0 0 24 24' stroke='currentColor' strokeWidth={2}>
          <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
        </svg>
        <span className='hidden sm:inline'>Search</span>
        <kbd className='hidden sm:inline-flex items-center gap-0.5 rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-400'>
          <span className='text-xs'>⌘</span>K
        </kbd>
      </button>

      {open && (
        <div className='fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]' onClick={() => setOpen(false)}>
          <div className='fixed inset-0 bg-black/40' />
          <div className='relative w-full max-w-lg rounded-xl bg-white shadow-2xl' onClick={(e) => e.stopPropagation()}>
            <div className='flex items-center gap-3 border-b border-gray-100 px-4 py-3'>
              <svg
                className='h-5 w-5 text-gray-400'
                fill='none'
                viewBox='0 0 24 24'
                stroke='currentColor'
                strokeWidth={2}
              >
                <path strokeLinecap='round' strokeLinejoin='round' d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z' />
              </svg>
              <input
                ref={inputRef}
                type='text'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder='Search blog posts, datasheets, webinars...'
                className='flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 outline-none'
              />
              <kbd className='rounded border border-gray-200 bg-gray-50 px-1.5 py-0.5 text-[10px] font-medium text-gray-400'>
                ESC
              </kbd>
            </div>

            {query && (
              <div className='max-h-80 overflow-y-auto py-2'>
                {results.length === 0 ? (
                  <p className='px-4 py-8 text-center text-sm text-gray-500'>No results found.</p>
                ) : (
                  results.map((entry, i) => (
                    <button
                      key={entry.url}
                      onClick={() => navigate(entry.url)}
                      onMouseEnter={() => setActiveIndex(i)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
                        i === activeIndex ? 'bg-gray-50' : ''
                      }`}
                    >
                      <div className='min-w-0 flex-1'>
                        <div className='flex items-center gap-2'>
                          <span
                            className={`shrink-0 rounded px-1.5 py-0.5 text-[10px] font-medium ${TYPE_COLORS[entry.type]}`}
                          >
                            {TYPE_LABELS[entry.type]}
                          </span>
                          <span className='truncate text-sm font-medium text-gray-900'>{entry.title}</span>
                        </div>
                        <p className='mt-0.5 truncate text-xs text-gray-500'>{entry.description}</p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
