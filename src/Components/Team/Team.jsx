import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { FaLinkedinIn, FaTwitter, FaEnvelope } from 'react-icons/fa'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import styles from './Team.module.css'

// Placeholder data - Replace with actual team data or move to a config file
const teamMembers = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop',
    social: { linkedin: '#', twitter: '#', email: '#' }
  },
  {
    id: 2,
    name: 'Mahmoud Amged',
    role: 'Frontend Team Leader',
    image: '../../public/assets/mahmoudamged.jpg',
    social: { linkedin: '#', twitter: '#', email: '#' }
  },
  {
    id: 3,
    name: 'Omar ElBorhamy',
    role: 'Creative & Development Lead',
    image: '../../public/assets/Omar ID.jpg.jpeg',
    social: { linkedin: '#', twitter: '#', email: '#' }
  },
  {
    id: 4,
    name: 'Oamr Shokry',
    role: 'Frontend Team Leader',
    image: '../../public/assets/omarshokry.jpg',
    social: { linkedin: '#', twitter: '#', email: '#' }
  },
  {
    id: 5,
    name: 'Mohammed AlQadri',
    role: 'Backend Team Leader',
    image: '../../public/assets/mohamed.jpg',
    social: { linkedin: '#', twitter: '#', email: '#' }
  },
  {
    id: 6,
    name: 'Ahmed Jameel',
    role: 'Operation Manager',
    image: '../../public/assets/ahmed.jpg',
    social: { linkedin: '#', twitter: '#', email: '#' }
  },
  {
    id: 7,
    name: 'Mohamed Ibrahim',
    role: 'Technical Engineer',
    image: '../../public/assets/ibra.jpg',
    social: { linkedin: '#', twitter: '#', email: '#' }
  }
]

export default function Team() {
  const { t } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className={styles.teamSection}>
      <div className={styles.backgroundPattern}></div>
      
      <div className={styles.container}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>{t('aboutPage.team.title') || 'Our Expert Team'}</h2>
          <p className={styles.subtitle}>
            {t('aboutPage.team.subtitle') || 'Meet the passionate individuals driving our innovation and success.'}
          </p>
        </div>

        <Swiper
          modules={[Pagination, Autoplay, EffectCoverflow]}
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          loop={true}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2.5,
            slideShadows: false,
          }}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1.2,
              spaceBetween: 20
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 30
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 40
            }
          }}
          className={styles.swiperContainer}
        >
          {teamMembers.map((member) => (
            <SwiperSlide key={member.id}>
              <div className={styles.teamCard}>
                <div className={styles.imageWrapper}>
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className={styles.memberImage} 
                  />
                  <div className={styles.overlay}></div>
                </div>
                
                <div className={styles.memberInfo}>
                  <h3 className={styles.memberName}>{member.name}</h3>
                  <p className={styles.memberRole}>{member.role}</p>
                  
                  <div className={styles.socialLinks}>
                    <a href={member.social.linkedin} className={styles.socialIcon} aria-label="LinkedIn">
                      <FaLinkedinIn />
                    </a>
                    <a href={member.social.twitter} className={styles.socialIcon} aria-label="Twitter">
                      <FaTwitter />
                    </a>
                    <a href={member.social.email} className={styles.socialIcon} aria-label="Email">
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}
