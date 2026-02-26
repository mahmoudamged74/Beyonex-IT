import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { iconMap } from '../../../utils/iconMap'
import styles from './AboutStory.module.css'
import { useGetAboutQuery } from '../../../redux/api/aboutApi'

export default function AboutStory() {
  const { t, i18n } = useTranslation()
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  const { data: aboutResponse, isLoading } = useGetAboutQuery(i18n.language)
  const aboutData = aboutResponse?.data
  const aboutPage = aboutData?.about_page
  const milestones = aboutData?.milestones || []

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
  }, [isLoading, i18n.language])

  // Milestones icons mapping
  const milestoneIcons = ['launch', 'users', 'globe', 'trophy', 'rocket']

  // Fallback milestones shown while loading or if API returns none
  const fallbackMilestones = [
    { id: 'f1', year: 2020, icon: 'rocket', title: { ar: 'البداية', en: 'The Beginning' }, description: { ar: 'تأسست بيونكس IT برؤية لإحداث ثورة في الحلول الرقمية.', en: 'Beyonex IT was founded with a vision to revolutionize digital solutions.' }, display_order: 0 },
    { id: 'f2', year: 2021, icon: 'users', title: { ar: 'توسع الفريق', en: 'Team Expansion' }, description: { ar: 'وسعنا فريقنا بمطورين ومصممين وخبراء تقنية موهوبين.', en: 'We expanded our team with talented developers, designers, and technical experts.' }, display_order: 1 },
    { id: 'f3', year: 2023, icon: 'globe', title: { ar: 'الانتشار العالمي', en: 'Global Expansion' }, description: { ar: 'وسعنا خدماتنا دولياً، لخدمة العملاء في عدة دول.', en: 'We expanded our services internationally to serve clients in several countries.' }, display_order: 2 },
    { id: 'f4', year: 2025, icon: 'trophy', title: { ar: 'ريادة الصناعة', en: 'Industry Leadership' }, description: { ar: 'معترف بنا كمزود رائد لحلول التكنولوجيا.', en: 'Recognized as a leading provider of technology solutions.' }, display_order: 3 },
  ]
  const displayedMilestones = milestones.length > 0 ? milestones : fallbackMilestones

  return (
    <section ref={sectionRef} className={styles.storySection}>
      <div className={styles.backgroundPattern}></div>
      
      <div className="container">
        <div className={`${styles.header} ${isVisible ? styles.visible : ''}`}>
          <h2 className={styles.title}>
            {aboutPage?.journey_title?.[i18n.language] || t('aboutPage.story.title')}
          </h2>
          <p className={styles.subtitle}>
            {aboutPage?.journey_description?.[i18n.language] || t('aboutPage.story.subtitle')}
          </p>
        </div>

        <div className={styles.storyContent}>
          {/* Mission & Vision Cards */}
          <div className={`${styles.cardsRow} ${isVisible ? styles.visible : ''}`}>
            {/* Mission */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <span>{aboutPage?.mission_icon || "🎯"}</span>
              </div>
              <h3 className={styles.cardTitle}>
                {aboutPage?.mission_title?.[i18n.language] || t('about.mission')}
              </h3>
              <p className={styles.cardText}>
                {aboutPage?.mission_content?.[i18n.language] || t('about.missionText')}
              </p>
            </div>
            
            {/* Vision */}
            <div className={styles.card}>
              <div className={styles.cardIcon}>
                <span>{aboutPage?.vision_icon || "👁️"}</span>
              </div>
              <h3 className={styles.cardTitle}>
                {aboutPage?.vision_title?.[i18n.language] || t('about.vision')}
              </h3>
              <p className={styles.cardText}>
                {aboutPage?.vision_content?.[i18n.language] || t('about.visionText')}
              </p>
            </div>
          </div>

          {/* Timeline */}
          {displayedMilestones.length > 0 && (
            <div className={styles.timeline}>
              <div className={styles.timelineLine}></div>
              
              {[...displayedMilestones].sort((a, b) => a.display_order - b.display_order).map((milestone, index) => {
                const iconKey = milestone.icon || milestoneIcons[index % milestoneIcons.length]
                return (
                  <div 
                    key={milestone.id}
                    className={`${styles.timelineItem} ${isVisible ? styles.visible : ''}`}
                    style={{ animationDelay: `${0.3 + index * 0.2}s` }}
                  >
                    <div className={styles.timelineYear}>{milestone.year}</div>
                    <div className={styles.timelineNode}>
                      {iconMap[iconKey] && React.createElement(iconMap[iconKey], { className: styles.nodeIcon })}
                    </div>
                    <div className={styles.timelineContent}>
                      <h4 className={styles.timelineTitle}>
                        {milestone.title?.[i18n.language] || milestone.title}
                      </h4>
                      <p className={styles.timelineDesc}>
                        {milestone.description?.[i18n.language] || milestone.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
