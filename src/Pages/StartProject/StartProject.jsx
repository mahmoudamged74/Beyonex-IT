import { useState, useEffect, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PhoneInputPkg from "react-phone-input-2";
const PhoneInput = PhoneInputPkg.default || PhoneInputPkg;
import "react-phone-input-2/lib/style.css";
import styles from "./StartProject.module.css";
import Icon from '../../Components/Common/Icon.jsx';
import HeadingAccent from '../../Components/Common/HeadingAccent/HeadingAccent.jsx';
import {
  useGetBranchesQuery,
  useRegisterProjectMutation,
} from "../../redux/api/projectApi";
import { STATIC_QUERY_OPTIONS } from "../../redux/liveQueryOptions";
import { useLocale } from "../../hooks/useLocale";

const INITIAL_NOTES = "New project request from website";

const StartProject = () => {
  const { t } = useTranslation();
  const { lang, normalizedLang: currentLang } = useLocale();
  const [selectOpen, setSelectOpen] = useState(false);
  const selectRef = useRef(null);

  const { data: branchesResponse, isLoading: branchesLoading } =
    useGetBranchesQuery(lang, STATIC_QUERY_OPTIONS);
  const [registerProject, { isLoading: isSubmitting }] =
    useRegisterProjectMutation();

  const branches = useMemo(
    () => branchesResponse?.data?.branches || [],
    [branchesResponse],
  );

  const [formData, setFormData] = useState({
    branch_id: "",
    name: "",
    phone: "",
    email: "",
    whatsapp_id: "",
    national_id: "",
    type: "individual",
    address: "",
    notes: INITIAL_NOTES,
  });

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const defaultBranchId = useMemo(
    () => (branches[0]?.id != null ? branches[0].id.toString() : ""),
    [branches],
  );

  const activeBranchId = formData.branch_id || defaultBranchId;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setSelectOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const branchOptions = useMemo(
    () =>
      branches.map((branch) => ({
        value: branch.id.toString(),
        label: branch.name[currentLang] || branch.name.ar,
      })),
    [branches, currentLang]
  );

  const selectedBranch =
    branchOptions.find((branch) => branch.value === activeBranchId) || null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prev) => ({ ...prev, phone: value }));
  };

  const handleWhatsappChange = (value) => {
    setFormData((prev) => ({ ...prev, whatsapp_id: value }));
  };

  const handleBranchSelect = (value) => {
    setFormData((prev) => ({ ...prev, branch_id: value }));
    setSelectOpen(false);
  };

  const handleClientType = (type) => {
    setFormData((prev) => ({ ...prev, type }));
  };

  const resetForm = () => {
    setSubmitted(false);
    setError(null);
    setFormData({
      branch_id: branches[0]?.id?.toString() || "",
      name: "",
      phone: "",
      email: "",
      whatsapp_id: "",
      national_id: "",
      type: "individual",
      address: "",
      notes: INITIAL_NOTES,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!activeBranchId) {
      setError(t("startProjectPage.form.selectBranch"));
      return;
    }

    try {
      await registerProject({ ...formData, branch_id: activeBranchId }).unwrap();
      setSubmitted(true);
    } catch (err) {
      console.error("Registration error:", err);
      setError(err?.data?.message || t("contactPage.form.error"));
    }
  };

  const steps = [
    {
      icon: "edit",
      title: t("startProjectPage.steps.step1Title"),
      desc: t("startProjectPage.steps.step1Desc"),
    },
    {
      icon: "search",
      title: t("startProjectPage.steps.step2Title"),
      desc: t("startProjectPage.steps.step2Desc"),
    },
    {
      icon: "phone",
      title: t("startProjectPage.steps.step3Title"),
      desc: t("startProjectPage.steps.step3Desc"),
    },
  ];

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <div className={styles.heroOverlay} />
        </div>

        <div className={`container ${styles.heroContent}`}>
          <div
            className={`${styles.heroInner} ${styles.visible}`}
          >
            <span className={styles.heroBadge}>
              {t("startProjectPage.hero.badge")}
            </span>
            <h1 className={styles.heroTitle}>{t("startProjectPage.title")}</h1>
            <HeadingAccent size="lg" />
            <p className={styles.heroSubtitle}>
              {t("startProjectPage.subtitle")}
            </p>
          </div>
        </div>
      </section>

      <section className={styles.main}>
        <div className="container">
          <div className={styles.content}>
            <div className={styles.stepsRow}>
              {steps.map((step, index) => (
                <div key={step.title} className={styles.stepCard}>
                  <span className={styles.stepIndex}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className={styles.stepIconWrap}>
                    <Icon name={step.icon} />
                  </span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepDesc}>{step.desc}</p>
                </div>
              ))}
            </div>

            <div className={styles.formCard}>
              {submitted ? (
                <div className={styles.successMessage}>
                  <div className={styles.successIcon}>
                    <Icon name="checkCircle" />
                  </div>
                  <h3>{t("startProjectPage.form.successTitle")}</h3>
                  <p>{t("startProjectPage.form.successMessage")}</p>
                  <button
                    type="button"
                    className={styles.resetBtn}
                    onClick={resetForm}
                  >
                    {t("contactPage.form.sendAnother")}
                  </button>
                </div>
              ) : (
                <>
                  <div className={styles.formHeader}>
                    <span className={styles.formBadge}>
                      {t("startProjectPage.form.badge")}
                    </span>
                    <h2 className={styles.formTitle}>
                      {t("startProjectPage.form.title")}
                    </h2>
                    <HeadingAccent size="md" />
                    <p className={styles.formSubtitle}>
                      {t("startProjectPage.form.subtitle")}
                    </p>
                  </div>

                  <form className={styles.form} onSubmit={handleSubmit}>
                    {error && (
                      <div className={`alert alert-danger ${styles.errorAlert}`}>
                        {error}
                      </div>
                    )}

                    <div className={styles.formSection}>
                      <h3 className={styles.sectionLabel}>
                        {t("startProjectPage.form.sectionClient")}
                      </h3>
                      <HeadingAccent size="sm" align="start" className={styles.formSectionAccent} />
                      <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                          <label htmlFor="branch_id">
                            {t("startProjectPage.form.branch")}
                          </label>
                          <div
                            className={`${styles.inputWrapper} ${styles.selectWrapper}`}
                            ref={selectRef}
                          >
                            <span className={styles.inputIcon}>
                              <Icon name="store" />
                            </span>
                            <button
                              type="button"
                              className={`${styles.formInput} ${styles.customSelect} ${
                                selectOpen ? styles.selectOpen : ""
                              }`}
                              onClick={() => setSelectOpen((open) => !open)}
                              aria-haspopup="listbox"
                              aria-expanded={selectOpen}
                              disabled={branchesLoading}
                            >
                              <span
                                className={`${styles.selectValue} ${
                                  !selectedBranch ? styles.selectPlaceholder : ""
                                }`}
                              >
                                {selectedBranch?.label ||
                                  t("startProjectPage.form.selectBranch")}
                              </span>
                              <Icon
                                name="chevronDown"
                                className={styles.selectChevron}
                              />
                            </button>
                            {selectOpen && (
                              <ul className={styles.selectMenu} role="listbox">
                                {branchOptions.map((branch) => (
                                  <li
                                    key={branch.value}
                                    role="option"
                                    aria-selected={
                                      activeBranchId === branch.value
                                    }
                                  >
                                    <button
                                      type="button"
                                      className={`${styles.selectOption} ${
                                        activeBranchId === branch.value
                                          ? styles.selectOptionActive
                                          : ""
                                      }`}
                                      onClick={() =>
                                        handleBranchSelect(branch.value)
                                      }
                                    >
                                      {branch.label}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="name">
                            {t("startProjectPage.form.name")}
                          </label>
                          <div className={styles.inputWrapper}>
                            <span className={styles.inputIcon}>
                              <Icon name="user" />
                            </span>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={formData.name}
                              onChange={handleChange}
                              placeholder={t(
                                "startProjectPage.form.namePlaceholder"
                              )}
                              className={styles.formInput}
                              required
                            />
                          </div>
                        </div>

                        <div
                          className={`${styles.formGroup} ${styles.fullWidth}`}
                        >
                          <label>{t("startProjectPage.form.clientType")}</label>
                          <div className={styles.typeToggle}>
                            <button
                              type="button"
                              className={`${styles.typeBtn} ${
                                formData.type === "individual"
                                  ? styles.typeBtnActive
                                  : ""
                              }`}
                              onClick={() => handleClientType("individual")}
                            >
                              <Icon name="user" />
                              {t("startProjectPage.form.individual")}
                            </button>
                            <button
                              type="button"
                              className={`${styles.typeBtn} ${
                                formData.type === "company"
                                  ? styles.typeBtnActive
                                  : ""
                              }`}
                              onClick={() => handleClientType("company")}
                            >
                              <Icon name="building" />
                              {t("startProjectPage.form.corporate")}
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.formSection}>
                      <h3 className={styles.sectionLabel}>
                        {t("startProjectPage.form.sectionContact")}
                      </h3>
                      <HeadingAccent size="sm" align="start" className={styles.formSectionAccent} />
                      <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                          <label htmlFor="email">
                            {t("startProjectPage.form.email")}
                          </label>
                          <div className={styles.inputWrapper}>
                            <span className={styles.inputIcon}>
                              <Icon name="envelope" />
                            </span>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={formData.email}
                              onChange={handleChange}
                              placeholder={t(
                                "startProjectPage.form.emailPlaceholder"
                              )}
                              className={styles.formInput}
                              required
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="phone">
                            {t("startProjectPage.form.phone")}
                          </label>
                          <div
                            className={styles.phoneInputWrapper}
                            dir="ltr"
                          >
                            <PhoneInput
                              country="sa"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              inputClass={styles.phoneInput}
                              buttonClass={styles.phoneButton}
                              dropdownClass={styles.phoneDropdown}
                              placeholder={t(
                                "startProjectPage.form.phonePlaceholder"
                              )}
                            />
                          </div>
                        </div>

                        <div className={styles.formGroup}>
                          <label htmlFor="whatsapp_id">
                            {t("startProjectPage.form.whatsapp")}
                          </label>
                          <div
                            className={styles.phoneInputWrapper}
                            dir="ltr"
                          >
                            <PhoneInput
                              country="sa"
                              value={formData.whatsapp_id}
                              onChange={handleWhatsappChange}
                              inputClass={styles.phoneInput}
                              buttonClass={styles.phoneButton}
                              dropdownClass={styles.phoneDropdown}
                              placeholder={t(
                                "startProjectPage.form.whatsappPlaceholder"
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.formSection}>
                      <h3 className={styles.sectionLabel}>
                        {t("startProjectPage.form.sectionDetails")}
                      </h3>
                      <HeadingAccent size="sm" align="start" className={styles.formSectionAccent} />
                      <div className={styles.formGrid}>
                        <div className={styles.formGroup}>
                          <label htmlFor="national_id">
                            {t("startProjectPage.form.idNumber")}
                          </label>
                          <div className={styles.inputWrapper}>
                            <span className={styles.inputIcon}>
                              <Icon name="userShield" />
                            </span>
                            <input
                              type="text"
                              id="national_id"
                              name="national_id"
                              value={formData.national_id}
                              onChange={handleChange}
                              placeholder={t(
                                "startProjectPage.form.idPlaceholder"
                              )}
                              className={styles.formInput}
                              required
                            />
                          </div>
                        </div>

                        <div
                          className={`${styles.formGroup} ${styles.fullWidth}`}
                        >
                          <label htmlFor="address">
                            {t("startProjectPage.form.address")}
                          </label>
                          <div className={styles.inputWrapper}>
                            <span className={styles.inputIcon}>
                              <Icon name="mapMarker" />
                            </span>
                            <textarea
                              id="address"
                              name="address"
                              value={formData.address}
                              onChange={handleChange}
                              placeholder={t(
                                "startProjectPage.form.addressPlaceholder"
                              )}
                              rows="3"
                              className={`${styles.formInput} ${styles.textArea}`}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className={styles.trustNote}>
                      <Icon name="shieldAlt" />
                      <span>{t("startProjectPage.trustNote")}</span>
                    </div>

                    <button
                      type="submit"
                      className={styles.submitBtn}
                      disabled={isSubmitting || branchesLoading}
                    >
                      {isSubmitting ? (
                        <>
                          <span className={styles.spinner} />
                          {t("contactPage.form.sending")}
                        </>
                      ) : (
                        <>
                          <Icon name="paperPlane" className={styles.btnIcon} />
                          {t("startProjectPage.form.submit")}
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default StartProject;
