import { Fragment, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './HomeProcess.module.css'
import { useIntersectionReveal } from '../../../hooks/useIntersectionReveal'
import SectionHeader from '../../Common/SectionHeader/SectionHeader.jsx'
import Icon from '../../Common/Icon.jsx'

const stepIcons = ['chatDots', 'lightbulb', 'code', 'rocketTakeoff']

export default function HomeProcess() {
  const { t } = useTranslation()
  const { isVisible, sectionRef } = useIntersectionReveal({ threshold: 0.12, once: true })

  const steps = useMemo(
    () =>
      stepIcons.map((icon, index) => ({
        id: index + 1,
        icon,
        title: t(`homePage.process.steps.${index + 1}.title`),
        description: t(`homePage.process.steps.${index + 1}.description`),
      })),
    [t],
  )

  return (
    <section
      ref={sectionRef}
      className={styles.processSection}
      id="process"
      aria-label={t('homePage.process.title')}
    >
      <div className="container">
        <SectionHeader
          isHome
          showEyebrow={false}
          eyebrow={t('homePage.process.label')}
          title={t('homePage.process.title')}
          accentSize="md"
          subtitle={t('homePage.process.subtitle')}
          isVisible={isVisible}
          moduleStyles={styles}
        />

        <div className={`${styles.stepsTrack} ${isVisible ? styles.visible : ''}`}>
          {steps.map((step, index) => (
            <Fragment key={step.id}>
              {index > 0 ? (
                <div className={styles.stepBridge} aria-hidden="true">
                  <span className={styles.stepBridgeLine} />
                  <span className={styles.stepBridgeDot} />
                </div>
              ) : null}

              <article
                className={styles.stepCard}
                style={{ '--delay': `${index * 0.1}s`, '--step-index': index + 1 }}
              >
                <div className={styles.stepMarker}>
                  <div className={styles.stepIconWrap}>
                    <Icon name={step.icon} className={styles.stepIcon} />
                  </div>
                </div>

                <div className={styles.stepContent}>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDescription}>{step.description}</p>
                </div>
              </article>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
