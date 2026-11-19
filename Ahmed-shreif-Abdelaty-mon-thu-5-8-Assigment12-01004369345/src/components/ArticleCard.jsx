
import { NavLink } from 'react-router-dom'

export default function ArticleCard({ post }) {

  return (

    <NavLink
      to={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#161616] hover:border-orange-500/40 transition-all duration-300"
    >

      <div className="relative h-48 overflow-hidden">

        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        <span className="absolute top-4 right-4 bg-black/80 text-white text-xs font-bold px-3 py-1.5 rounded-full">
          {post.category}
        </span>

      </div>


      <div className="p-5 flex flex-col flex-1">

        <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">

          <span className="flex items-center gap-1">
            <i className="fa-regular fa-clock"></i>
            {post.readTime}
          </span>

          <span>•</span>

          <span>{post.date}</span>

        </div>


        <h3 className="text-lg font-bold text-white leading-relaxed mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
          {post.title}
        </h3>


        <p className="text-gray-400 text-sm leading-7 line-clamp-2 min-h-14">
          {post.excerpt}
        </p>


        <div className="flex items-center justify-between gap-3 border-t border-white/[0.07] pt-4 mt-5">

          <div className="flex items-center gap-2 min-w-0">

            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-9 h-9 rounded-full object-cover"
            />

            <div className="min-w-0">

              <h4 className="text-white text-xs font-bold truncate">
                {post.author.name}
              </h4>

              <span className="text-gray-500 text-[10px]">
                {post.author.role}
              </span>

            </div>

          </div>


          <span className="w-9 h-9 shrink-0 flex items-center justify-center rounded-full border border-orange-500/30 text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">

            <i className="fa-solid fa-chevron-left text-xs"></i>

          </span>

        </div>

      </div>

    </NavLink>

  )
}
