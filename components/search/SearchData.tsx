import { buildSearchIndex } from '@/lib/search-index'

/**
 * Server component that embeds the search index as a JSON script tag.
 * This runs at build time and injects the data into every page.
 */
export function SearchData() {
  const index = buildSearchIndex()
  return (
    <script id='search-index' type='application/json' dangerouslySetInnerHTML={{ __html: JSON.stringify(index) }} />
  )
}
