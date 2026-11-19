
const values = [
  {
    icon: 'fa-bullseye',
    title: 'الجودة أولاً',
    description: 'محتوى مدروس ومكتوب بخبرة',
  },
  {
    icon: 'fa-bolt',
    title: 'تركيز عملي',
    description: 'أمثلة واقعية يمكنك تطبيقها اليوم',
  },
  {
    icon: 'fa-handshake',
    title: 'المجتمع',
    description: 'تعلم مع آلاف المصورين',
  },
  {
    icon: 'fa-arrows-rotate',
    title: 'دائماً محدث',
    description: 'أحدث الاتجاهات وأفضل الممارسات',
  },
]

export default function ValuesSection() {
  return (
    <section className="bg-[#111111] py-20 px-4 text-white" dir="rtl">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">

          <h2 className="flex items-center justify-center gap-3 text-3xl sm:text-4xl font-bold mb-4">
            <span className="w-1 h-8 rounded-full bg-orange-500"></span>
            قيمنا
            <span className="w-1 h-8 rounded-full bg-orange-500"></span>
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            المبادئ التي توجه كل ما نقوم بإنشائه
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

          {values.map((value) => (
            <div
              key={value.title}
              className="group flex flex-col items-center text-center rounded-2xl border border-white/[0.07] bg-[#171717] px-5 py-6 transition-all duration-300 hover:border-orange-500/40 hover:bg-[#2D1F14]"
            >

              <i
                className={`fa-solid ${value.icon} text-orange-500 text-4xl mb-5 transition-transform duration-300 `}
              ></i>

              <h3 className="text-white text-xl font-bold mb-3 group-hover:text-orange-500 transition-colors duration-300">
                {value.title}
              </h3>

              <p className="text-gray-400 text-sm leading-7">
                {value.description}
              </p>

            </div>
          ))}

        </div>

      </div>

    </section>
  )
}
