import HeadingAccent from "../HeadingAccent/HeadingAccent.jsx";
import homeSharedStyles from "./homeSectionHeader.module.css";
import aboutStyles from "./aboutSectionHeader.module.css";

/**
 * Shared section header.
 * variant="home"  — uses caller moduleStyles (+ optional home shared tweaks)
 * variant="about" — self-contained About header styles
 */
export default function SectionHeader({
  variant = "home",
  /* about */
  badge,
  align = "center",
  /* home */
  isHome = false,
  eyebrow,
  title,
  titleAs: TitleTag = "h2",
  accentSize = "md",
  subtitle,
  subtitleAs: SubtitleTag = "p",
  description,
  isVisible,
  visibleClass = "visible",
  showEyebrow = true,
  showAccent = true,
  moduleStyles,
  as: Wrapper = "header",
  className = "",
}) {
  if (variant === "about") {
    const aboutVisible = isVisible ?? true;
    return (
      <header
        className={`${aboutStyles.header} ${aboutStyles[align] || ""} ${aboutVisible ? aboutStyles.visible : ""} ${className}`}
      >
        {badge ? <span className={aboutStyles.badge}>{badge}</span> : null}
        <h2 className={aboutStyles.title}>{title}</h2>
        {subtitle ? <p className={aboutStyles.subtitle}>{subtitle}</p> : null}
      </header>
    );
  }

  const homeVisible = isVisible ?? false;
  const visibleClassName =
    homeVisible && moduleStyles?.[visibleClass]
      ? moduleStyles[visibleClass]
      : "";

  return (
    <Wrapper
      className={[
        moduleStyles?.header,
        isHome ? homeSharedStyles.homeHeader : "",
        isHome ? homeSharedStyles.homeHeaderReset : "",
        visibleClassName,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {isHome && showEyebrow && eyebrow ? (
        <span className={homeSharedStyles.homeEyebrow}>{eyebrow}</span>
      ) : null}
      <TitleTag
        className={[moduleStyles?.title, isHome ? homeSharedStyles.homeTitle : ""]
          .filter(Boolean)
          .join(" ")}
      >
        {title}
      </TitleTag>
      {showAccent && !isHome ? (
        <HeadingAccent size={accentSize} className="" />
      ) : null}
      {subtitle ? (
        <SubtitleTag
          className={[
            moduleStyles?.subtitle,
            isHome ? homeSharedStyles.homeSubtitle : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          {subtitle}
        </SubtitleTag>
      ) : null}
      {description ? (
        <p
          className={`${moduleStyles?.description || ""} ${isHome ? homeSharedStyles.homeDescription : ""}`}
        >
          {description}
        </p>
      ) : null}
    </Wrapper>
  );
}
