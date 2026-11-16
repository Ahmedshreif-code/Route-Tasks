import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Navbar () {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav
      className='fixed top-0 inset-x-0 z-50 bg-[#161616] border-b border-white/5 text-white'
      dir='rtl'
    >
      <div className='max-w-7xl mx-auto h-19 px-5 flex items-center justify-between'>
        {/* Logo */}
        <Link to='/' className='flex items-center gap-3 shrink-0'>
          <img
            src='favicon.png'
            className='w-11 h-11 object-contain'
            alt='Logo'
          />

          <div className='flex flex-col'>
            <span className='text-xl font-bold text-white'>عدسة</span>
            <span className='text-[11px] text-[#ff8904]'>
              عالم التصوير الفوتوغرافي
            </span>
          </div>
        </Link>

        {/* Navigation - Desktop */}
        <div className='hidden md:flex items-center gap-1 p-1.5 rounded-full border border-white/5 bg-[#191919]'>
          <NavLink
            to='/'
            className={({ isActive }) =>
              `px-5 py-3 rounded-full ${isActive ? 'bg-[#ff6900] text-white' : 'text-gray-400 hover:text-white'} text-sm font-bold`
            }
          >
            الرئيسية
          </NavLink>

          <NavLink
            to='/blog'
            className={({ isActive }) =>
              `px-5 py-3 rounded-full ${isActive ? 'bg-[#ff6900] text-white' : 'text-gray-400 hover:text-white'} text-sm font-medium`
            }
          >
            المدونة
          </NavLink>

          <NavLink
            to='/about'
            className={({ isActive }) =>
              `px-5 py-3 rounded-full ${isActive ? 'bg-[#ff6900] text-white' : 'text-gray-400 hover:text-white'} text-sm font-medium`
            }
          >
            من نحن
          </NavLink>
        </div>

        {/* Actions */}
        <div className='flex items-center gap-5'>
          {/* Search */}
          <button
            aria-label='Search'
            className='text-gray-500 hover:text-white transition-colors'
          >
            <i className='fas fa-search'></i>
          </button>

          {/* CTA */}
          <NavLink
            to='/blog'
            className='hidden sm:block bg-[#ff6900] hover:bg-[#e85d00] hover:-translate-y-1 duration-500 transition-all   text-white text-sm font-bold px-8 py-4 rounded-full '
          >
            ابدأ القراءة
          </NavLink>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className='md:hidden text-white p-2'
            aria-label='Toggle menu'
          >
            {isOpen ? (
              <i className='fa-solid fa-xmark text-xl'></i>
            ) : (
              <i className='fa-solid fa-bars text-xl'></i>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className='md:hidden bg-[#161616] border-t border-white/5 p-5'>
          <div className='flex flex-col gap-3'>
            <NavLink
              to='/'
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-5 py-3 rounded-full ${isActive ? 'bg-[#ff6900] text-white' : 'text-gray-400 hover:text-white'} text-sm font-bold`
              }
            >
              الرئيسية
            </NavLink>

            <NavLink
              to='/blog'
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-5 py-3 rounded-full ${isActive ? 'bg-[#ff6900] text-white' : 'text-gray-400 hover:text-white'} text-sm font-medium`
              }
            >
              المدونة
            </NavLink>

            <NavLink
              to='/about'
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `px-5 py-3 rounded-full ${isActive ? 'bg-[#ff6900] text-white' : 'text-gray-400 hover:text-white'} text-sm font-medium`
              }
            >
              من نحن
            </NavLink>
          </div>
        </div>
      )}
    </nav>
  )
}
