import data from "../../assets/posts.json"; 

const avatars = data.posts
    .filter((p) => p.featured)
    .slice(0, 3)
    .map((p) => p.author);

export default function Newsletter() {
  return (
    <section
      dir="rtl"
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0a0a0a] px-4 py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 h-105 w-225 -translate-x-1/2 rounded-full bg-orange-600/20 blur-[120px]"
      />

      <div className="relative w-full max-w-208 rounded-4xl border border-white/6 bg-[#171717] px-6 py-16 text-center shadow-2xl sm:px-12">
        <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-linear-to-br from-orange-500 to-orange-600  ">
          <i className="fa-solid fa-envelope text-[26px] text-white"></i>
        </div>

        <h2 className="mb-4 text-3xl font-bold text-white sm:text-[40px] sm:leading-tight">
          اشترك في{" "}
          <span className="bg-linear-to-l from-amber-400 to-orange-500 bg-clip-text text-transparent">
            نشرتنا الإخبارية
          </span>
        </h2>

        <p className="mx-auto mb-10 max-w-xl text-base text-gray-400 sm:text-lg">
          احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك الإلكتروني
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto flex max-w-129 flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            placeholder="أدخل بريدك الإلكتروني"
            className="h-14 flex-1 rounded-2xl border border-white/10 bg-[#0a0a0a] px-5 text-right text-base text-white placeholder-gray-500 outline-none transition focus:border-orange-500/60 focus:ring-2 focus:ring-orange-500/20"
          />
          <button
            type="submit"
            className="h-14 whitespace-nowrap rounded-2xl bg-[#F85000] px-8 text-base font-bold text-white shadow-lg  transition  hover:bg-[#D63B00] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 active:scale-[0.98] cursor-pointer"
          >
            اشترك الآن
          </button>
        </form>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-3 text-sm text-gray-500">
          <div className="flex -space-x-2 space-x-reverse">
            {avatars.map((author, i) => (
              <img
                key={author.name}
                src={author.avatar}
                alt={author.name}
                className="h-8 w-8 rounded-full border-2 border-[#171717] object-cover"
                style={{ zIndex: avatars.length - i }}
              />
            ))}
          </div>

          <span>
            انضم لـ <b className="font-bold text-white">+10,000</b> مصور
          </span>

          <span className="text-gray-700">•</span>
          <span>بدون إزعاج</span>
          <span className="text-gray-700">•</span>
          <span>إلغاء الاشتراك في أي وقت</span>
        </div>
      </div>
    </section>
  );
}
