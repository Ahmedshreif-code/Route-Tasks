import { NavLink } from 'react-router-dom'
import data from '../../assets/posts.json'

export default function FeaturedArticles () {
  const featuredPosts = data.posts.filter(post => post.featured === true)

  return (
    <section className='bg-[#090909] text-white py-20 px-4' dir='rtl'>
      <div className='max-w-6xl mx-auto'>
        <div className='flex flex-col sm:flex-row items-center justify-between gap-6 mb-12'>
          <div className='text-center sm:text-right'>
            <div className='inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 mb-4'>
              <span className='relative flex w-2 h-2'>
                <span className='absolute inline-flex w-full h-full rounded-full bg-orange-500 opacity-75 animate-ping'></span>
                <span className='relative inline-flex w-2 h-2 rounded-full bg-orange-500'></span>
              </span>
              <span className='text-orange-500 text-sm font-semibold'>
                مميز
              </span>
            </div>

            <h2 className='text-4xl sm:text-5xl font-extrabold mb-4'>
              مقالات مختارة
            </h2>

            <p className='text-gray-400 text-lg'>محتوى منتقى لبدء رحلة تعلمك</p>
          </div>

          <NavLink
            to='/blog'
            className='bg-orange-600 hover:bg-orange-500 text-white px-6 py-3 rounded-xl flex items-center gap-3 transition duration-300'
          >
            عرض الكل
            <i className='fa-solid fa-chevron-left text-sm'></i>
          </NavLink>
        </div>

        <div className='flex flex-col gap-8'>
          {featuredPosts.map(post => (
            <NavLink
              to={`/blog/${post.slug}`}
              key={post.id}
              className='group grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-3xl border border-white/10 bg-[#161616] transition duration-300 hover:border-orange-500/30'
            >
              <div className='relative min-h-64 md:min-h-95 overflow-hidden'>
                <img
                  src={post.image}
                  alt={post.title}
                  className='absolute inset-0 w-full h-full object-cover transition duration-500 group-hover:scale-105'
                />

                <span className='absolute top-4 right-4 flex items-center gap-2 bg-orange-500 text-white text-sm font-bold px-4 py-2 rounded-full'>
                  مميز
                  <i className='fa-solid fa-star'></i>
                </span>
              </div>

              <div className='flex flex-col justify-between p-6 sm:p-8 lg:p-10'>
                <div>
                  <div className='flex flex-wrap items-center gap-3 mb-6'>
                    <span className='text-orange-500 bg-orange-500/10 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold'>
                      {post.category}
                    </span>

                    <span className='text-gray-500 text-sm flex items-center gap-2'>
                      <i className='fa-regular fa-clock'></i>
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className='text-xl sm:text-2xl lg:text-3xl font-bold leading-relaxed mb-4 group-hover:text-orange-500 transition duration-300'>
                    {post.title}
                  </h3>

                  <p className='text-gray-400 leading-8 text-sm sm:text-base'>
                    {post.excerpt}
                  </p>
                </div>

                <div className='flex items-center justify-between gap-4 mt-10'>
                  <div className='flex items-center gap-3'>
                    <div className='relative'>
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className='w-12 h-12 rounded-full object-cover border-2 border-white/10'
                      />

                      <span className='absolute bottom-0 right-0 w-3 h-3 rounded-full bg-orange-500 border-2 border-[#161616]'></span>
                    </div>

                    <div>
                      <h4 className='text-white font-bold text-sm'>
                        {post.author.name}
                      </h4>

                      <span className='text-gray-500 text-xs'>{post.date}</span>
                    </div>
                  </div>

                  <NavLink
                    to={`/blog/${post.slug}`}
                    className='flex items-center gap-2 text-orange-500 font-bold text-sm group-hover:gap-4 transition-all duration-300'
                  >
                    اقرأ المقال
                    <i className='fa-solid fa-arrow-left'></i>
                  </NavLink>
                </div>
              </div>
            </NavLink>
          ))}
        </div>
      </div>
    </section>
  )
}
