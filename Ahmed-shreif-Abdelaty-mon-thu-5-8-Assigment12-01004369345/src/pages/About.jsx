import ContactSection from "../components/AboutComponents/ContactSection";
import TeamSection from "../components/AboutComponents/TeamSection";
import ValuesSection from "../components/AboutComponents/ValuesSection";
import MainSection from "../components/MainSection";

export default function About() {
      const stats = [
    {
      number: '2+مليون',
      label: 'قارئ شهرياً',
      icon: 'fa-users',
    },
    {
      number: '500+',
      label: 'مقالة منشورة',
      icon: 'fa-newspaper',
    },
    {
      number: '50+',
      label: 'كاتب خبير',
      icon: 'fa-pen-nib',
    },
    {
      number: '15+',
      label: 'تصنيف',
      icon: 'fa-book-open',
    },
  ]
 return < >
   <MainSection
   badge="من نحن"
        title="مهمتنا هي"
        highlight="الإعلام والإلهام"
        description="مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين ونصائح عملية لتطوير مهاراتكم. نحن شغوفون بمشاركة المعرفة ومساعدة المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة."
        stats={stats}
   />
    <ValuesSection />
    <TeamSection/>
    <ContactSection/>
    </>;
}
