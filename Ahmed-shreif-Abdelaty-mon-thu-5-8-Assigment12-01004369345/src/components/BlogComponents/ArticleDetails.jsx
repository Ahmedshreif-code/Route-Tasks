import { Link, useParams } from 'react-router-dom'
import data from '../../assets/posts.json'
import ArticleCard from '../ArticleCard'
import NotFound from '../../pages/NotFound'

function formatDate (date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString('ar-EG', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default function ArticleDetails () {
  const { slug } = useParams()
  const post = data.posts.find(article => article.slug === slug)

  if (!post) {
    return <NotFound />
  }

  const contentBlocks = post.content
    .trim()
    .split(/\n\s*\n/)
    .map((text, index) => {
      const heading = text.match(/^##\s+(.+)$/)

      return heading
        ? { id: `section-${index}`, heading: heading[1] }
        : { id: index === 0 ? 'introduction' : undefined, text }
    })

  const tableOfContents = [
    { id: 'introduction', title: 'مقدمة' },
    ...contentBlocks
      .filter(block => block.heading)
      .map(block => ({ id: block.id, title: block.heading }))
  ]

  const relatedPosts = data.posts
    .filter(article => article.slug !== post.slug)
    .sort(
      (first, second) =>
        Number(second.category === post.category) -
        Number(first.category === post.category)
    )
    .slice(0, 3)

  const articleUrl =
    typeof window === 'undefined'
      ? ''
      : `${window.location.origin}${window.location.pathname}`
  const shareText = post.title
  const shareUrl = articleUrl

  return (
    <main className='min-h-screen bg-[#090909] text-white' dir='rtl'>
      <header className='relative isolate flex min-h-130 items-end overflow-hidden pt-24'>
        <img
          src={post.image}
          alt=''
          className='absolute inset-0 -z-20 h-full w-full object-cover'
        />
        <div className='absolute inset-0 -z-10 bg-linear-to-t from-[#090909] via-black/65 to-black/35' />

        <div className='mx-auto w-full max-w-6xl px-5 pb-12 pt-10 sm:pb-16'>
          <nav
            aria-label='مسار التنقل'
            className='mb-8 flex flex-wrap items-center gap-2 text-sm text-gray-300'
          >
            <Link to='/' className='transition hover:text-orange-400'>
              الرئيسية
            </Link>
            <i className='fa-solid fa-chevron-left text-[10px] text-orange-500' />
            <Link to='/blog' className='transition hover:text-orange-400'>
              المدونة
            </Link>
            <i className='fa-solid fa-chevron-left text-[10px] text-orange-500' />
            <span className='text-orange-400'>{post.category}</span>
          </nav>

          <div className='mb-5 flex flex-wrap items-center gap-4 text-sm text-gray-300'>
            <span className='rounded-full bg-orange-600 px-4 py-2 font-bold text-white'>
              {post.category}
            </span>
            <span className='flex items-center gap-2'>
              <i className='fa-regular fa-calendar text-orange-400' />
              {formatDate(post.date)}
            </span>
            <span className='flex items-center gap-2'>
              <i className='fa-regular fa-clock text-orange-400' />
              {post.readTime}
            </span>
          </div>

          <h1 className='mb-7 max-w-4xl text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl'>
            {post.title}
          </h1>

          <div className='inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-black/40 p-3 backdrop-blur-sm'>
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className='h-12 w-12 rounded-full object-cover'
            />
            <div>
              <p className='font-bold'>{post.author.name}</p>
              <p className='mt-1 text-xs text-gray-400'>{post.author.role}</p>
            </div>
          </div>
        </div>
      </header>

      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_290px] lg:gap-10 lg:px-6'>
        <article className='order-2 min-w-0 lg:order-1'>
          <blockquote className='mb-8 rounded-2xl border border-orange-500/15 bg-[#17120e] p-6 text-base italic leading-8 text-orange-100 sm:p-8'>
            <i className='fa-solid fa-quote-right mb-3 block text-orange-500' />
            {post.excerpt}
          </blockquote>

          <div className='space-y-8 text-[15px] leading-9 text-gray-300 sm:text-base'>
            {contentBlocks.map(block =>
              block.heading ? (
                <h2
                  key={block.id}
                  id={block.id}
                  className='scroll-mt-28 border-b border-white/10 pb-4 pt-2 text-2xl font-bold text-white'
                >
                  <i className='fa-solid fa-camera ml-3 text-lg text-orange-500' />
                  {block.heading}
                </h2>
              ) : (
                <p key={block.id ?? block.text} id={block.id}>
                  {block.text}
                </p>
              )
            )}
          </div>

          <section className='mt-12 rounded-2xl border border-white/10 bg-[#111] p-6 sm:p-8'>
            <h2 className='mb-5 flex items-center gap-3 text-lg font-bold'>
              <i className='fa-solid fa-tags text-orange-500' />
              الوسوم
            </h2>
            <div className='flex flex-wrap gap-2'>
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className='rounded-full border border-white/10 bg-white/4 px-4 py-2 text-sm text-gray-300'
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>

          <section className='mt-5 rounded-2xl border border-white/10 bg-[#111] p-6 sm:p-8'>
            <h2 className='mb-5 flex items-center gap-3 text-lg font-bold'>
              <i className='fa-solid fa-share-nodes text-orange-500' />
              شارك المقال
            </h2>
            <div className='flex flex-wrap gap-3'>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target='_blank'
                rel='noreferrer'
                aria-label='مشاركة على فيسبوك'
                className='flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-gray-300 transition hover:border-orange-500 hover:bg-orange-600 hover:text-white'
              >
                <i className='fa-brands fa-facebook-f' />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}`}
                target='_blank'
                rel='noreferrer'
                aria-label='مشاركة على إكس'
                className='flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-gray-300 transition hover:border-orange-500 hover:bg-orange-600 hover:text-white'
              >
                <i className='fa-brands fa-x-twitter' />
              </a>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                target='_blank'
                rel='noreferrer'
                aria-label='مشاركة على لينكدإن'
                className='flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-gray-300 transition hover:border-orange-500 hover:bg-orange-600 hover:text-white'
              >
                <i className='fa-brands fa-linkedin-in' />
              </a>
              <a
                href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                target='_blank'
                rel='noreferrer'
                aria-label='مشاركة على واتساب'
                className='flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/4 text-gray-300 transition hover:border-orange-500 hover:bg-orange-600 hover:text-white'
              >
                <i className='fa-brands fa-whatsapp' />
              </a>
            </div>
          </section>
        </article>

        <aside className='order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start'>
          <nav className='rounded-2xl border border-white/10 bg-[#111] p-5'>
            <h2 className='mb-4 flex items-center gap-3 font-bold'>
              <span className='flex h-9 w-9 items-center justify-center rounded-xl bg-orange-500/10 text-orange-500'>
                <i className='fa-solid fa-list' />
              </span>
              محتويات المقال
            </h2>
            <ol className='space-y-1'>
              {tableOfContents.map((item, index) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className='flex items-start gap-3 rounded-lg px-3 py-2 text-sm leading-6 text-gray-400 transition hover:bg-white/4 hover:text-orange-400'
                  >
                    <span className='text-xs text-orange-500'>{index + 1}</span>
                    {item.title}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </aside>
      </div>

      {relatedPosts.length > 0 && (
        <section className='border-t border-white/10 px-4 py-14'>
          <div className='mx-auto max-w-7xl'>
            <div className='mb-8'>
              <p className='mb-2 text-sm font-bold text-orange-500'>
                واصل القراءة
              </p>
              <h2 className='text-2xl font-extrabold sm:text-3xl'>
                مقالات قد تعجبك
              </h2>
            </div>
            <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {relatedPosts.map(article => (
                <ArticleCard key={article.id} post={article} />
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
