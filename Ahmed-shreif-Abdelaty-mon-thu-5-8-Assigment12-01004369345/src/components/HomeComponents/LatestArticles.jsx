
import { NavLink } from 'react-router-dom'
import data from '../../assets/posts.json'
import ArticleCard from '../ArticleCard'

export default function LatestArticles() {

const latestPosts = data.posts
  .filter(post => !post.featured)
  .sort((a, b) => new Date(b.date) - new Date(a.date))
  .slice(0, 3)

  return (
    <section
      className="bg-black bg-[radial-gradient(ellipse_at_0%_50%,rgba(249,115,22,0.10),transparent_100%)]  py-20 px-4 text-white"
      dir="rtl"
    >

      <div className="max-w-6xl mx-auto">

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-12">

          <div className="text-center sm:text-right">

            <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 mb-4">

               <span className='relative flex w-2 h-2'>
            <span className='absolute inline-flex w-full h-full rounded-full bg-orange-500 opacity-75 animate-ping'></span>
            <span className='relative inline-flex w-2 h-2 rounded-full bg-orange-500'></span>
          </span>

              <span className="text-orange-500 text-sm font-semibold">
                الأحدث
              </span>

            </div>

            <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
              أحدث المقالات
            </h2>

            <p className="text-gray-400 text-base sm:text-lg">
              محتوى جديد طازج من المطبعة
            </p>

          </div>

          <NavLink
            to="/blog"
            className="text-orange-500 font-bold flex items-center gap-2 hover:gap-4 transition-all"
          >
            عرض جميع المقالات
            <i className="fa-solid fa-arrow-left"></i>
          </NavLink>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">

          {latestPosts.map((post) => (
            <ArticleCard
              key={post.id}
              post={post}
            />
          ))}

        </div>

      </div>

    </section>
  )
}
