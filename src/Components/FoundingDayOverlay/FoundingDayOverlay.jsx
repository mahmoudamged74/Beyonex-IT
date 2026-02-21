import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCloseCircleOutline } from 'react-icons/io5';
import { Fade, Zoom } from 'react-awesome-reveal';
import './FoundingDayOverlay.css';

const FoundingDayOverlay = () => {
    const { t, i18n } = useTranslation();
    const [isVisible, setIsVisible] = useState(false);
    const isRtl = i18n.language === 'ar';

    useEffect(() => {
        // Show on every refresh/mount
        setIsVisible(true);
        
        // Auto-hide after 2 minutes (120,000 ms)
        const timer = setTimeout(() => {
            hideOverlay();
        }, 120000);

        return () => clearTimeout(timer);
    }, []);

    const hideOverlay = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={`founding-overlay-container ${isRtl ? 'rtl' : 'ltr'}`}>
            <div className="overlay-backdrop" onClick={hideOverlay}></div>
            
            <button className="close-btn" onClick={hideOverlay} aria-label="Close">
                <IoCloseCircleOutline />
            </button>

            <div className="promo-content container p-0">
                <div className="row g-0 h-100 align-items-stretch">
                    {/* Image Section - Takes 6 columns on medium+ screens */}
                    <div className="col-md-6 promo-image-wrapper">
                        <Zoom triggerOnce className="h-100">
                            <img 
                                src="/assets/nn.jpg.jpeg" 
                                alt="Saudi Founding Day" 
                                className="founding-image"
                            />
                        </Zoom>
                    </div>

                    {/* Text Section - Takes 6 columns on medium+ screens */}
                    <div className="col-md-6 promo-info-card">
                        <Fade direction="up" cascade damping={0.2} triggerOnce>
                            <h2 className="promo-title">
                                {isRtl ? 'يوم بدينا .. 3 قرون من العز' : 'The Day We Began .. 3 Centuries of Glory'}
                            </h2>
                            <div className="founding-date">
                                <span className="day">{isRtl ? 'الأحد' : 'Sunday'}</span>
                                <span className="date">22/2/2026</span>
                            </div>
                            <div className="promo-offer">
                                <p className="offer-text">
                                    {isRtl 
                                        ? 'احتفالاً بيوم التأسيس، استمتع بخصومات حصرية على جميع خدماتنا التقنية' 
                                        : 'Celebrating Founding Day, enjoy exclusive discounts on all our tech services'}
                                </p>
                                <div className="discount-badge">
                                    {isRtl ? 'خصومات تصل إلى 50%' : 'Discounts up to 50%'}
                                </div>
                            </div>
                            <button className="cta-button" onClick={hideOverlay}>
                                {isRtl ? 'اكتشف الخدمات' : 'Discover Services'}
                            </button>
                        </Fade>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FoundingDayOverlay;
