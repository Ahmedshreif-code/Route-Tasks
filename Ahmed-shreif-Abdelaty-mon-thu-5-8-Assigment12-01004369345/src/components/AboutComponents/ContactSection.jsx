import { NavLink } from "react-router-dom"
import {siteInfo} from"../../assets/posts.json"


export default function ContactSection() {
  return (
    <section
      className="relative overflow-hidden bg-linear-to-br from-orange-600 via-orange-500 to-amber-400 px-4 py-20 text-white"
      dir="rtl"
    >
      <div className="max-w-3xl mx-auto text-center">

        <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
          لديك أسئلة؟ دعنا نتحدث!
        </h2>

        <p className="text-white/90 text-base sm:text-lg leading-8 mb-8 max-w-2xl mx-auto">
          نحب أن نسمع منك. سواء كان لديك سؤال حول محتوانا، أو تريد المساهمة، أو تريد فقط إلقاء التحية، لا تتردد في التواصل.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <a
            href={`mailto:${siteInfo.email}`}
            className="inline-flex items-center justify-center gap-3 bg-[#090909] hover:bg-[#222] text-white font-bold rounded-xl px-8 py-4 min-w-44 transition-all duration-300 hover:-translate-y-1"
          >
            تواصل معنا
            <i className="fa-regular fa-envelope"></i>
          </a>

          <NavLink
            to="/blog"
            className="inline-flex items-center justify-center border-2 border-white/40 hover:bg-white/10 text-white font-bold rounded-xl px-8 py-4 min-w-44 transition-all duration-300 hover:-translate-y-1"
          >
            تصفح المقالات
          </NavLink>

        </div>

      </div>
    </section>
  )
}
