import { NavLink } from "react-router-dom";

export default function MainSection ({
  badge,
  title,
  highlight,
  secondLine,
  description,
  actions = [],
  stats = []
}) {
  return (
    <section className='main-section pt-22 flex items-center justify-center px-4 py-16 text-center text-white'>
      <div className='w-full max-w-4xl mx-auto'>
        <div className='inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-2 mb-7'>
          <span className='relative flex w-2 h-2'>
            <span className='absolute inline-flex w-full h-full rounded-full bg-orange-500 opacity-75 animate-ping'></span>
            <span className='relative inline-flex w-2 h-2 rounded-full bg-orange-500'></span>
          </span>
          <span className='text-sm text-orange-200'>{badge}</span>
        </div>

        <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-[1.4] mb-5'>
          {title} <span className='text-orange-500'>{highlight}</span>
          {secondLine && (
            <>
              <br />
              {secondLine}
            </>
          )}
        </h1>

        <p className='text-gray-400 text-base sm:text-lg leading-8 max-w-xl mx-auto mb-8'>
          {description}
        </p>

        {actions.length > 0 && (
          <div className='flex flex-wrap items-center justify-center gap-3 mb-12'>
            {actions.map(action => (
              <NavLink
                key={action.label}
                to={action.to}
                className={`inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 font-bold transition duration-300   ${
                  action.primary
                    ? 'bg-orange-600 hover:bg-orange-500 hover:-translate-y-1  text-white group'
                    : 'border border-white/15 hover:border-orange-500/50 hover:bg-[#2D1F14] hover:text-orange-500/50 text-white '
                }`}
              >
                {action.label}
                {action.icon && <i className={action.icon}></i>}
              </NavLink>
            ))}
          </div>
        )}

        {stats.length > 0 && (
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-xl mx-auto'>
            {stats.map(stat => (
              <div
                key={stat.label}
                className='flex flex-col items-center justify-center mx-2 gap-1 bg-[#151515] border border-white/[0.07] rounded-[22px] py-4 px-8 hover:border-orange-500/40 hover:scale-110 transition duration-300'
              >
                <i
                  className={`fa-solid ${stat.icon} text-orange-500 text-xl mb-1`}
                ></i>

                <span className='text-orange-500 text-xl sm:text-2xl font-bold'>
                  {stat.number}
                </span>

                <span className='text-gray-500 text-sm'>{stat.label}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
