
import { useState } from 'react'
import data from '../../assets/posts.json'
import ArticleCard from "../ArticleCard"

export default function Articles() {

  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = [
    'all',
    ...new Set(data.posts.map(post => post.category))
  ]

 const searchValue = search.toLowerCase().trim()

const filteredPosts = [...data.posts]
  .filter(post => {

    const matchesCategory =
      selectedCategory === 'all' ||
      post.category === selectedCategory

    const matchesSearch =
      post.title.toLowerCase().includes(searchValue) ||
      post.excerpt.toLowerCase().includes(searchValue) ||
      post.author.name.toLowerCase().includes(searchValue)

    return matchesCategory && matchesSearch
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date))


  return (
    <main
      className="min-h-screen bg-[#090909] text-white"
      dir="rtl"
    >

      <section className="border-b border-white/10 py-5 px-4">

        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-5">

          <div className="flex items-center justify-center flex-wrap gap-2">

            {categories.map(category => (

              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300
                  ${
                    selectedCategory === category
                      ? 'bg-orange-600 text-white'
                      : 'bg-[#171717] text-gray-400 border border-white/5 hover:text-white hover:border-orange-500/30'
                  }`}
              >
                {category === 'all' ? 'جميع المقالات' : category}
              </button>

            ))}

          </div>

          <div className="relative w-full lg:w-80 shrink-0">

            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="ابحث في المقالات..."
              className="w-full bg-[#171717] border border-white/10 rounded-xl py-3 pr-4 pl-11 text-white text-sm outline-none focus:border-orange-500 transition-colors placeholder:text-gray-600"
            />

            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>

          </div>

        </div>

      </section>


      <section className="py-12 px-4">

        <div className="max-w-6xl mx-auto">

          <div className="flex items-center justify-between mb-8">

            <p className="text-gray-400 text-sm">
              عرض{' '}
              <span className="text-white font-bold">
                {filteredPosts.length}
              </span>
              {' '}مقالات
            </p>

          </div>


          {filteredPosts.length > 0 ? (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

              {filteredPosts.map(post => (

                <ArticleCard
                  key={post.id}
                  post={post}
                />

              ))}

            </div>

          ) : (

            <div className="flex flex-col items-center justify-center py-24 text-center">

              <i className="fa-solid fa-magnifying-glass text-5xl text-gray-700 mb-5"></i>

              <h3 className="text-xl font-bold mb-3">
                لم يتم العثور على مقالات
              </h3>

              <p className="text-gray-500 text-sm mb-6">
                جرب البحث بكلمات مختلفة أو اختر تصنيفاً آخر.
              </p>

              <button
                onClick={() => {
                  setSearch('')
                  setSelectedCategory('all')
                }}
                className="bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl transition-colors"
              >
                عرض جميع المقالات
              </button>

            </div>

          )}

        </div>

      </section>

    </main>
  )
}
