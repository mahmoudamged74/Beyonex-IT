import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import { iconMap } from '../../utils/iconMap'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import styles from './Team.module.css'
import { useGetAboutQuery } from '../../redux/api/aboutApi'

export default function Team() {
  const { t, i18n } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)


  const { data: aboutResponse, isLoading } = useGetAboutQuery(i18n.language)
  const teamMembers = aboutResponse?.data?.team_members || []

  useEffect(() => {
    // If the component was already rendered while loading, 
    // we need to make sure the observer is attached.
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
  }, [isLoading]) // Depend on isLoading so it runs after data is fetched

  if (isLoading) return null

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
          {teamMembers.length > 0 ? (
            teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <div className={styles.teamCard}>
                  <div className={styles.imageWrapper}>
                    <img 
                      src={member.image_path} 
                      alt={member.name?.[i18n.language] || member.name} 
                      className={styles.memberImage} 
                    />
                    <div className={styles.overlay}></div>
                  </div>
                  
                  <div className={styles.memberInfo}>
                    <h3 className={styles.memberName}>
                      {member.name?.[i18n.language] || member.name}
                    </h3>
                    <p className={styles.memberRole}>
                      {member.title?.[i18n.language] || member.title}
                    </p>
                    
                    <div className={styles.socialLinks}>
                      {member.email && (
                        <a href={`mailto:${member.email}`} className={styles.socialIcon} aria-label="Email">
                          {iconMap.envelope && React.createElement(iconMap.envelope)}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          ) : (
            // Fallback
            [
              { id: 1, name: 'Meshal Almejlad', role: 'CEO', image: '/assets/mo.jpg', social: { email: 'mailto:admin@beyonexit.com' } },
              { id: 2, name: 'Mostafa Salem', role: 'IT Manager', image: '/assets/mostafa.jpg', social: { email: 'mailto:admin@beyonexit.com' } },
              { id: 3, name: 'Mahmoud Amged', role: 'Frontend Team Leader', image: '/assets/mahmoudamged.jpg', social: { email: 'mailto:developers@beyonexit.com' } }
            ].map((member) => (
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
                      <a href={member.social.email} className={styles.socialIcon} aria-label="Email">
                        {iconMap.envelope && React.createElement(iconMap.envelope)}
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  )
}
