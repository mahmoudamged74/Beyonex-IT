import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import AboutHero from "../../Components/AboutPage/AboutHero/AboutHero";
import AboutStory from "../../Components/AboutPage/AboutStory/AboutStory";
import AboutStats from "../../Components/AboutPage/AboutStats/AboutStats";
import AboutValues from "../../Components/AboutPage/AboutValues/AboutValues";
import AboutCTA from "../../Components/AboutPage/AboutCTA/AboutCTA";
import AboutSectionSeparator from "../../Components/AboutPage/shared/AboutSectionSeparator";
import styles from "./About.module.css";

const Team = lazy(() => import("../../Components/AboutPage/Team/Team"));

export default function About() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = `${t("aboutPage.hero.title")} | Beyonex IT`;
  }, [t]);

  return (
    <div className={styles.aboutPage}>
      <div className={styles.pageContent}>
        <AboutHero />
        <AboutSectionSeparator />
        <AboutStory />
        <AboutSectionSeparator />
        <AboutStats />
        <AboutSectionSeparator />
        <AboutValues />
        <AboutSectionSeparator />
        <Suspense fallback={null}>
          <Team />
        </Suspense>
        <AboutSectionSeparator />
        <AboutCTA />
      </div>
    </div>
  );
}
