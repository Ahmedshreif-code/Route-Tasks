
import { NavLink } from 'react-router-dom'

export default function NotFound() {
  return (
    <section
      dir="rtl"
      className="main-section relative overflow-hidden text-white flex items-center justify-center px-5 py-20"
    >
      <div className="max-w-2xl w-full text-center">

        <h1 className="text-8xl sm:text-9xl font-black tracking-tight bg-linear-to-r from-[#ff6900] via-[#ffb000] to-[#ff6900] bg-clip-text text-transparent mb-8">
          404
        </h1>

        <div className="relative w-28 h-28 mx-auto mb-8">

          <div className="absolute inset-0 rounded-full bg-orange-500/15 border border-orange-500/30 flex items-center justify-center animate-spin ">
            <i className="fa-regular fa-face-frown text-5xl text-[#ff6900]"></i>
          </div>

          <span className="absolute -top-2 right-0 w-5 h-5 rounded-lg bg-[#ff6900] rotate-12 animate-bounce"></span>

          <span className="absolute -bottom-1 -left-3 w-4 h-4 rounded-full bg-yellow-500 animate-bounce"></span>

        </div>

        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          عفواً! الصفحة غير موجودة
        </h2>

        <p className="text-gray-400 text-base sm:text-lg leading-8 max-w-lg mx-auto mb-8">
          الصفحة التي تبحث عنها غير موجودة أو تم نقلها.
          دعنا نعيدك إلى المسار الصحيح.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">

          <NavLink
            to="/"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#ff6900] hover:bg-[#e85d00] hover:-translate-y-1 text-white font-bold transition-all duration-300"
          >
            <i className="fa-solid fa-house"></i>
            الذهاب للرئيسية
          </NavLink>

          <NavLink
            to="/blog"
            className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/10 bg-white/2 hover:bg-white/5 hover:border-orange-500/40 hover:text-[#ff6900] text-white font-bold transition-all duration-300"
          >
            <i className="fa-regular fa-newspaper"></i>
            تصفح المقالات
          </NavLink>

        </div>

        <div className="w-full max-w-lg mx-auto mt-12 border-t border-white/10"></div>
        <div>
            <p className="text-gray-500 text-sm mt-4">قد تجد هذه مفيدة:</p>
            <ul className="flex flex-wrap justify-center gap-4 mt-2">
              <li>
                <NavLink
                  to="/about"
                  className="text-[#ff6900] hover:underline hover:text-amber-700 transition-all duration-300"
                >
                  من نحن
                </NavLink>
              </li>
              <span className="text-gray-500">|</span>
              <li>
                <NavLink
                  to="/blog"
                  className="text-[#ff6900] hover:underline hover:text-amber-700 transition-all duration-300"
                >
                  المدونة
                </NavLink>
              </li>

            </ul>
          

        </div>

      </div>
    </section>
  )
}
