
import data from '../../assets/posts.json'

export default function TeamSection() {


  const teamMembers = 
    data.posts.map((post) => ({
      name: post.author.name,
      role: post.author.role,
      avatar: post.author.avatar,
    }))
  

  return (
    <section className="bg-[#090909] py-16 px-4 text-white" dir="rtl">

      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">

          <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 mb-4">
           <span className='relative flex w-2 h-2'>
            <span className='absolute inline-flex w-full h-full rounded-full bg-orange-500 opacity-75 animate-ping'></span>
            <span className='relative inline-flex w-2 h-2 rounded-full bg-orange-500'></span>
          </span>
            <span className="text-orange-500 text-sm font-semibold">
              فريقنا
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            تعرف على كتابنا
          </h2>

          <p className="text-gray-400 text-base sm:text-lg">
            فريقنا من المصورين والكتاب ذوي الخبرة شغوفون بمشاركة معرفتهم مع المجتمع.
          </p>

        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {teamMembers.map((member) => (

            <div
              key={member.name}
              className="group flex flex-col items-center text-center bg-[#171717] border border-white/8 rounded-2xl p-6 transition-all duration-300 hover:border-orange-500/40 hover:-translate-y-2"
            >

              <div className="relative mb-6">

                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover border-4 border-[#292929] group-hover:border-orange-500/50 transition-all duration-300"
                />

                <span className="absolute bottom-0 right-0 flex items-center justify-center w-6 h-6 rounded-full bg-orange-500 border-2 border-[#171717]">
                  <i className="fa-solid fa-check text-white text-xs"></i>
                </span>

              </div>

              <h3 className="text-white text-xl font-bold mb-1">
                {member.name}
              </h3>

              <p className="text-orange-500 text-sm mb-5">
                {member.role}
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}
