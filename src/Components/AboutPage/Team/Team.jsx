import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'
import styles from './Team.module.css'
import AboutSectionHeader from '../shared/AboutSectionHeader'
import { useAboutData } from '../../../hooks/useAboutData'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import { useResolvedMediaUrl } from '../../../hooks/useResolvedMediaUrl'
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers'
import Icon from '../../Common/Icon.jsx'

const fallbackTeam = [
  {
    id: 't1',
    name: { ar: 'المؤسس', en: 'Founder' },
    title: { ar: 'الرئيس التنفيذي', en: 'CEO' },
    email: 'info@beyonex-it.com',
    linkedin: '',
    image_path: null,
  },
  {
    id: 't2',
    name: { ar: 'أحمد محمد', en: 'Ahmed Mohamed' },
    title: { ar: 'مدير التقنية', en: 'CTO' },
    email: '',
    linkedin: '',
    image_path: null,
  },
  {
    id: 't3',
    name: { ar: 'سارة علي', en: 'Sara Ali' },
    title: { ar: 'مديرة التصميم', en: 'Design Lead' },
    email: '',
    linkedin: '',
    image_path: null,
  },
  {
    id: 't4',
    name: { ar: 'خالد حسن', en: 'Khaled Hassan' },
    title: { ar: 'مطور أول', en: 'Senior Developer' },
    email: '',
    linkedin: '',
    image_path: null,
  },
]

function MemberAvatar({ member, lang }) {
  const memberImage = useResolvedMediaUrl(member.image_path)
  const name = getLocalizedOrRaw(member.name, lang) || '?'
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  if (memberImage) {
    return (
      <img
        src={memberImage}
        alt={name}
        className={styles.memberImage}
        loading="lazy"
        decoding="async"
      />
    )
  }

  return (
    <div className={styles.avatarPlaceholder} aria-hidden="true">
      <span className={styles.avatarInitials}>{initials}</span>
    </div>
  )
}

function TeamCard({ member, lang }) {
  const name = getLocalizedOrRaw(member.name, lang)
  const role = getLocalizedOrRaw(member.title, lang)
  const hasSocial = Boolean(member.linkedin || member.email)

  return (
    <article className={styles.teamCard}>
      <div className={styles.imageWrapper}>
        <MemberAvatar member={member} lang={lang} />
        <div className={styles.imageOverlay} aria-hidden="true" />

        <div className={styles.memberInfo}>
          <div className={styles.memberDetails}>
            <h3 className={styles.memberName}>{name}</h3>
            <span className={styles.nameAccent} aria-hidden="true" />
            <p className={styles.memberRole}>{role}</p>
          </div>

          {hasSocial && (
            <div className={styles.socialAside}>
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="LinkedIn"
                >
                  <span className={styles.socialBtnRing} aria-hidden="true" />
                  <Icon name="linkedin" className={styles.socialIcon} />
                </a>
              )}
              {member.email && (
                <a
                  href={`mailto:${member.email}`}
                  className={styles.socialBtn}
                  aria-label="Email"
                >
                  <span className={styles.socialBtnRing} aria-hidden="true" />
                  <Icon name="envelope" className={styles.socialIcon} />
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default function Team() {
  const { t } = useTranslation()
  const { lang, isLoading, aboutData } = useAboutData()
  const teamMembers = aboutData?.team_members?.length > 0
    ? aboutData.team_members
    : fallbackTeam
  const { isVisible, sectionRef } = useIntersectionReveal({ deps: [isLoading, lang] })

  return (
    <section ref={sectionRef} className={styles.teamSection}>
      <div className="container">
        <AboutSectionHeader
          className={styles.teamHeader}
          title={t('aboutPage.team.title')}
          subtitle={t('aboutPage.team.subtitle')}
          isVisible={isVisible}
        />

        <div className={`${styles.swiperWrap} ${isVisible ? styles.visible : ''}`}>
          <Swiper
            modules={[Pagination, Autoplay, EffectCoverflow]}
            effect="coverflow"
            grabCursor
            centeredSlides
            loop={teamMembers.length > 2}
            coverflowEffect={{
              rotate: 0,
              stretch: 12,
              depth: 100,
              modifier: 2,
              slideShadows: false,
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: { slidesPerView: 1.12, spaceBetween: 18 },
              640: { slidesPerView: 2.1, spaceBetween: 24 },
              1024: { slidesPerView: 3.15, spaceBetween: 32 },
              1280: { slidesPerView: 3.5, spaceBetween: 36 },
            }}
            className={styles.swiperContainer}
          >
            {teamMembers.map((member) => (
              <SwiperSlide key={member.id}>
                <TeamCard member={member} lang={lang} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}
