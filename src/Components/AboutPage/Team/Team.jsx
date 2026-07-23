import { useTranslation } from 'react-i18next'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import styles from './Team.module.css'
import SectionHeader from '../../Common/SectionHeader/SectionHeader'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import { useResolvedMediaUrl } from '../../../hooks/useResolvedMediaUrl'
import { getLocalizedOrRaw } from '../../../utils/i18nHelpers'
import Icon from '../../Common/Icon.jsx'

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

  return (
    <article className={styles.teamCard}>
      <div className={styles.imageWrapper}>
        <MemberAvatar member={member} lang={lang} />
      </div>

      <div className={styles.memberBody}>
        <div className={styles.memberHead}>
          {(member.email || member.linkedin) && (
            <div className={styles.socialAside}>
              {member.email ? (
                <a
                  href={`mailto:${member.email}`}
                  className={`${styles.socialBtn} ${styles.emailBtn}`}
                  aria-label={member.email}
                  data-tooltip={member.email}
                >
                  <Icon name="envelope" className={styles.socialIcon} />
                </a>
              ) : (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialBtn}
                  aria-label="LinkedIn"
                >
                  <Icon name="linkedin" className={styles.socialIcon} />
                </a>
              )}
            </div>
          )}

          <div className={styles.memberDetails}>
            <h3 className={styles.memberName}>{name}</h3>
            <span className={styles.memberAccent} aria-hidden="true" />
            <p className={styles.memberRole}>{role}</p>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function Team({
  lang,
  activeTeamMembers,
  teamMembersSignature,
}) {
  const { t } = useTranslation()
  const { isVisible, sectionRef } = useIntersectionReveal({
    deps: [lang, teamMembersSignature],
  })

  if (activeTeamMembers.length === 0) {
    return null
  }

  return (
    <section ref={sectionRef} className={styles.teamSection}>
      <div className="container">
        <SectionHeader
          variant="about"
          className={styles.teamHeader}
          title={t('aboutPage.team.title')}
          subtitle={t('aboutPage.team.subtitle')}
          isVisible={isVisible}
        />

        <div className={`${styles.swiperWrap} ${isVisible ? styles.visible : ''}`}>
          <Swiper
            key={teamMembersSignature}
            modules={[Autoplay]}
            className={styles.swiperContainer}
            grabCursor
            centeredSlides
            centerInsufficientSlides
            slidesPerView={3}
            slidesPerGroup={1}
            spaceBetween={8}
            watchOverflow
            loop={activeTeamMembers.length >= 5}
            loopAdditionalSlides={2}
            observer
            observeParents
            speed={550}
            autoplay={{
              delay: 4200,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              0: {
                slidesPerView: 1.12,
                slidesPerGroup: 1,
                spaceBetween: 8,
                centeredSlides: true,
              },
              640: {
                slidesPerView: 2.15,
                slidesPerGroup: 1,
                spaceBetween: 8,
                centeredSlides: true,
              },
              992: {
                slidesPerView: 3,
                slidesPerGroup: 1,
                spaceBetween: 10,
                centeredSlides: true,
              },
            }}
          >
            {activeTeamMembers.map((member) => (
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
