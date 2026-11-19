import { Link } from "react-router-dom";
import {siteInfo} from"../assets/posts.json"
const social=siteInfo.social


export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-[#090909] text-white border-t border-white/10 "
    >

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/3 w-96 h-72 bg-orange-500/5 blur-[120px]"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-5 py-16">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          <div>

            <div className="flex items-center gap-3 mb-6">

              <div className="w-11 h-11 rounded-xl bg-[#ff6900] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-orange-500/20">
                ع
              </div>

              <h2 className="text-2xl font-bold">
                عدسة
              </h2>

            </div>

            <p className="text-gray-500 text-sm leading-7 mb-6">
              مدونة متخصصة في فن التصوير الفوتوغرافي.
              نشارك معكم أسرار المحترفين ونصائح عملية
              لتطوير مهاراتكم.
            </p>

            <div className="flex items-center gap-2">

              <a
                href={social.youtube}
                aria-label="YouTube"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#181818] border border-white/5 text-gray-500 hover:bg-[#ff6900] hover:text-white transition-all"
              >
                <i className="fa-brands fa-youtube text-lg"></i>
              </a>

              <a
                href={social.linkedin}
                aria-label="LinkedIn"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#181818] border border-white/5 text-gray-500 hover:bg-[#ff6900] hover:text-white transition-all"
              >
                <i className="fa-brands fa-linkedin text-lg"></i>
              </a>

              <a
                href={social.github}
                aria-label="GitHub"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#181818] border border-white/5 text-gray-500 hover:bg-[#ff6900] hover:text-white transition-all"
              >
                <i className="fa-brands fa-github text-lg"></i>
              </a>

              <a
                href={social.twitter}
                aria-label="X"
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#181818] border border-white/5 text-gray-500 hover:bg-[#ff6900] hover:text-white transition-all"
              >
                <i className="fa-brands fa-x-twitter text-lg"></i>
              </a>

            </div>
          </div>


          <div>

            <h3 className="flex items-center gap-3 text-base font-bold mb-7">
              استكشف
              <span className="w-8 h-0.5 bg-[#ff6900]"></span>
            </h3>

            <ul className="space-y-5 text-sm text-gray-500">

              <li>
                <Link
                  to="/"
                  className="hover:text-[#ff6900] transition-colors"
                >
                  الرئيسية
                </Link>
              </li>

              <li>
                <Link
                  to="/blog"
                  className="hover:text-[#ff6900] transition-colors"
                >
                  المدونة
                </Link>
              </li>

              <li>
                <Link
                  to="/about"
                  className="hover:text-[#ff6900] transition-colors"
                >
                  من نحن
                </Link>
              </li>

            </ul>
          </div>


          <div>

            <h3 className="flex items-center gap-3 text-base font-bold mb-7">
              التصنيفات
              <span className="w-8 h-0.5 bg-[#ff6900]"></span>
            </h3>

            <ul className="space-y-5 text-sm text-gray-500">

              <li>
                <a
                  href="#"
                  className="hover:text-[#ff6900] transition-colors"
                >
                  إضاءة
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#ff6900] transition-colors"
                >
                  بورتريه
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#ff6900] transition-colors"
                >
                  مناظر طبيعية
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="hover:text-[#ff6900] transition-colors"
                >
                  تقنيات
                </a>
              </li>

            </ul>
          </div>


          <div>

            <h3 className="flex items-center gap-3 text-base font-bold mb-7">
              ابق على اطلاع
              <span className="w-8 h-0.5 bg-[#ff6900]"></span>
            </h3>

            <p className="text-gray-500 text-sm leading-6 mb-5">
              اشترك للحصول على أحدث المقالات
              والتحديثات.
            </p>

            <form className="space-y-3">

              <input
                type="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full bg-[#181818] border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white placeholder:text-gray-600 outline-none focus:border-[#ff6900] transition-colors"
              />

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-[#ff6900] hover:bg-[#e85d00] text-white font-bold text-sm py-4 rounded-full transition-colors"
              >
                اشترك
                <i className="fa-solid fa-arrow-left"></i>
              </button>

            </form>
          </div>

        </div>
      </div>


      <div className="relative border-t border-white/10">

        <div className="max-w-7xl mx-auto px-5 py-6 flex flex-col-reverse md:flex-row items-center justify-between gap-5">

          <div className="flex items-center gap-5 text-xs text-gray-600">

            <a
              href="#"
              className="hover:text-[#ff6900] transition-colors"
            >
              شروط الخدمة
            </a>

            <a
              href="#"
              className="hover:text-[#ff6900] transition-colors"
            >
              سياسة الخصوصية
            </a>

          </div>


          <p className="text-xs text-gray-600 flex items-center gap-1.5">

            © 2026 عدسة. صنع بكل

            <i className="fa-solid fa-heart text-[#ff6900]"></i>

            جميع الحقوق محفوظة.

          </p>

        </div>
      </div>

    </footer>
  );
}
