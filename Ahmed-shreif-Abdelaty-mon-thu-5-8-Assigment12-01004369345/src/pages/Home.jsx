import FeaturedArticles from '../components/HomeComponents/FeaturedArticles'
import LatestArticles from '../components/HomeComponents/LatestArticles'
import Newsletter from '../components/HomeComponents/Newsletter'
import MainSection from '../components/MainSection'

export default function Home () {
  const stats = [
    {
      number: '50+',
      label: 'مقالة',
      icon: 'fa-newspaper'
    },
    {
      number: '+10ألف',
      label: 'قارئ',
      icon: 'fa-users'
    },
    {
      number: '4',
      label: 'تصنيفات',
      icon: 'fa-folder-open'
    },
    {
      number: '6',
      label: 'كاتب',
      icon: 'fa-pen-nib'
    }
  ]
  const actions = [
    {
      label: 'استكشف المقالات',
      to: '/blog',
      icon: 'fa-solid fa-arrow-left group-hover:-translate-x-1 transition duration-300',
      primary: true
    },
    {
      label: 'اعرف المزيد',
      to: '/about',
      icon: 'fa-regular fa-circle-question',
      primary: false
    }
  ]
  return (
    <>
      <MainSection
        badge='مرحباً بك في عدسة'
        title='اكتشف'
        highlight='فن'
        secondLine='التصوير الفوتوغرافي'
        description='انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في التصوير.'
        actions={actions}
        stats={stats}
      />
      <FeaturedArticles />
      <LatestArticles />
      <Newsletter/>
      
    </>
  )
}
