import {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';
import pointer from './assets/BTN_Anzeiger-Touren_Auswahl-mitHintergrund.png';
import toggle_left from './assets/BTN_Toggle-L.png';
import toggle_right from './assets/BTN_Toggle-R.png';
import radio_off from './assets/BTN_Auswahl-AUS.png';
import radio_on from './assets/BTN_Auswahl-AN.png';
import { useTranslation } from 'react-i18next';
const Controls = ({ onIndexChange, onToggleLeft, onToggleRight, onToggleElectro, onToggleTerm }) => {

    const { t } = useTranslation();

    const [initialIndex, setInitialIndex] = useState(3)


     const[showToggler, setShowToggle] = useState(true);
     const[toggleTermRadio, setToggleTermRadio] = useState(true);
     const[toggleElectroRadio, setToggleElectroRadio] = useState(true);
     const togglerClickRight = () => {
         setShowToggle(false);
         onToggleRight();
     }
    const togglerClickLeft = () => {
        setShowToggle(true);
        onToggleLeft(toggleTermRadio,toggleElectroRadio);
     //   setToggleElectroRadio(true);
      //  setToggleTermRadio(true);
    }
    const clickTermRadio = () => {
         setToggleTermRadio(!toggleTermRadio);
         onToggleTerm(!toggleTermRadio);
    }
    const clickElectroRadio = () =>  {
         setToggleElectroRadio(!toggleElectroRadio);
         onToggleElectro(!toggleElectroRadio);
    }
    return (
        <div className="controls-container">
            {showToggler && <div className="radios-container" id="radios-container">
                <div className="container-fluid">
                    <div className="row g-0 justify-content-center align-items-center">
                        <div className="col-auto">
                            <div className="row g-0 justify-content-center align-items-center">
                                <div className="col-auto trans">{t('controls.energie')}</div>
                                <div className="col-auto">
                                    { toggleTermRadio && <img src={radio_on} className="energy-radio" id="thermo-radio-aus" onClick={clickTermRadio}/>}
                                    {!toggleTermRadio && <img src={radio_off} className="energy-radio" id="thermo-radio-an" onClick={clickTermRadio}/>}
                                </div>
                                <div className={toggleTermRadio ? 'col-auto trans green' : 'col-auto trans'} id="thermo-label">
                                    {t('controls.therm')}
                                </div>
                            </div>
                        </div>
                        <div className="col-auto">
                            <div className="row g-0 align-items-center">
                                <div className="col-auto">
                                    {toggleElectroRadio && <img src={radio_on} className="energy-radio" id="electro-radio-aus" onClick={clickElectroRadio}/>}
                                    {!toggleElectroRadio && <img src={radio_off} className="energy-radio" id="electro-radio-an" onClick={clickElectroRadio}/>}
                                </div>
                                <div className={toggleElectroRadio ? 'col-auto trans green' : 'col-auto trans'} id="electro-label">
                                    {t('controls.elektro')}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row g-0 align-items-center justify-content-center legend-container ">
                        <div className="col-auto d-flex flex-column justify-content-center align-items-center cold-warm-container">
                            <svg className="legend-line legend-line-cold" xmlns="http://www.w3.org/2000/svg" width="28" height="3">
                                <line x1="0" y1="1.5" x2="28" y2="1.5" stroke="" />
                            </svg>
                            <svg className="legend-line legend-line-warm" xmlns="http://www.w3.org/2000/svg" width="28" height="3">
                                <line x1="0" y1="1.5" x2="28" y2="1.5" stroke="" />
                            </svg>
                        </div>
                        <div className="col-auto legend-text trans">
                            {t('controls.kalt')}
                        </div>
                        <div className="col-auto d-flex flex-column justify-content-center align-items-center">
                            <svg className="legend-line legend-line-recovery" xmlns="http://www.w3.org/2000/svg" width="28" height="3" >
                                <line x1="0" y1="1.5" x2="28" y2="1.5" stroke="" />
                            </svg>
                        </div>
                        <div className="col-auto legend-text trans">
                            {t('controls.ab')}
                        </div>
                        <div className="col-auto d-flex flex-column justify-content-center">
                            <svg className="legend-line legend-line-electro" xmlns="http://www.w3.org/2000/svg" width="30" height="3">
                                <line x1="0" y1="1.5" x2="30" y2="1.5" stroke="" />
                            </svg>
                        </div>
                        <div className="col-auto legend-text trans">
                            {t('controls.strom')}
                        </div>
                    </div>
                </div>
            </div>}

            {!showToggler && <div className="swiper-container">
                <img src={pointer} className="swiper-bg-img"/>
                <Swiper
                    spaceBetween={30}
                    slidesPerView={'auto'}
                    centeredSlides={true}
                    initialSlide={initialIndex}
                    onSlideChange={(swiper) =>{onIndexChange(swiper.realIndex); setInitialIndex(swiper.realIndex)} }
                 //   onSwiper={(swiper) => swiper.slideTo(3)}
                >
                    <SwiperSlide data-swiper-width="300">Highlights</SwiperSlide>
                    <SwiperSlide data-swiper-width="300">Im Alltag</SwiperSlide>
                    <SwiperSlide data-swiper-width="300">Smart City</SwiperSlide>
                    <SwiperSlide data-swiper-width="300">Gesamter Park</SwiperSlide>
                    <SwiperSlide data-swiper-width="300">Energienutzung</SwiperSlide>
                    <SwiperSlide data-swiper-width="300">Grüne Energie</SwiperSlide>
                </Swiper>
            </div>}
            <div className="toggler-container container-fluid">
                <div className="row g-0 align-items-center justify-content-center">
                    <div className={showToggler ? 'col-auto trans green' : 'col-auto trans' } id="daten-label">
                        {t('controls.data')}
                    </div>
                    <div className="col-auto">
                        {showToggler && <img src={toggle_left} className="daten-toggler" id="toggler-touren" onClick={togglerClickRight}/>}
                        {!showToggler && <img src={toggle_right} className="touren-toggler" id="toggler-daten" onClick={togglerClickLeft}/>}
                    </div>
                    <div className={!showToggler ? 'col-auto trans green' : 'col-auto trans' } id="touren-label">
                        {t('controls.tou')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Controls;

