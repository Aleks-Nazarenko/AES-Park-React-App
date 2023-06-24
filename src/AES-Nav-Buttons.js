import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from "react-router-dom";
import page_butt_an from './assets/BTN_Inhalte-angewaehlt.png';
import page_butt from './assets/BTN_Inhalte.png';
import map_butt from './assets/BTN_Karte.png';
import map_butt_an from './assets/BTN_Karte-angewaehlt.png' ;
import qr_butt from  './assets/BTN_QR.png';
import qr_butt_an from './assets/BTN_QR-angewaehlt.png';
import { useTranslation } from 'react-i18next';


export default function AESNavButtons() {
    const {t} = useTranslation();
    useLocation();
    //image preload
    useEffect(() => {
        const imageUrls = [qr_butt_an, qr_butt, map_butt, map_butt_an,page_butt_an, page_butt];
        imageUrls.forEach((imageUrl) => {
            const img = new Image();
            img.src = imageUrl;
        });
    }, []);
    const location = useLocation();
    const {pathname} = location;
    const {objectId} = useParams();
    const [isImageClicked, setIsImageClicked] = useState(false);
    const [isImageClicked_2, setIsImageClicked_2] = useState(false);
    const [isImageClicked_3, setIsImageClicked_3] = useState(false);
    const handleClick = () => {
        setIsImageClicked(!isImageClicked);
    };
    const handleClick_2 = () => {
        setIsImageClicked_2(!isImageClicked_2);
    };
    const handleClick_3 = () => {
        setIsImageClicked_3(!isImageClicked_3);
    };
    let response = '';
    if (pathname.includes('object')) {
        response =
            <div className="buttons-wrapper">
                <Link to={`/cam/${objectId}`} onClick={handleClick} className="position-relative">
                    <img src={isImageClicked ? qr_butt_an : qr_butt} alt="QR" className="butt-unten qr-button"/>
                    <div className="buttons-labels d-flex justify-content-center align-items-center position-absolute w-100">
                        <span className="trans">{t('navbuttinfo.qr')}</span>
                    </div>
                </Link>
                <Link to={`/map/${objectId}`} onClick={handleClick_2}  className="position-relative">
                    <img src={isImageClicked_2 ? map_butt_an : map_butt} alt="map" className="butt-unten map-button"/>
                    <div className="buttons-labels d-flex justify-content-center align-items-center position-absolute w-100">
                        <span className="trans">{t('navbuttinfo.karte')}</span>
                    </div>
                </Link>
                <Link to={`/object/${objectId}`}  className="position-relative">
                    <img src={page_butt_an} alt="page" className="butt-unten page-button page-button-an"/>
                    <div className="buttons-labels d-flex justify-content-center align-items-center position-absolute w-100">
                        <span className="trans">{t('navbuttinfo.info')}</span>
                    </div>
                </Link>
            </div>
    }
    if (pathname.includes('map')) {
        response =
            <div className="buttons-wrapper">
                <Link to={`/cam/${objectId}`} onClick={handleClick} className="position-relative">
                    <img src={isImageClicked ? qr_butt_an : qr_butt} alt="QR" className="butt-unten qr-button"/>
                    <div className="buttons-labels d-flex justify-content-center align-items-center position-absolute w-100">
                        <span className="trans">{t('navbuttinfo.qr')}</span>
                    </div>
                </Link>
                <Link to={`/map/${objectId}`}  className="position-relative">
                    <img src={map_butt_an} alt="map" className="butt-unten map-button"/>
                    <div className="buttons-labels d-flex justify-content-center align-items-center position-absolute w-100">
                        <span className="trans" >{t('navbuttinfo.karte')}</span>
                    </div>
                </Link>
                <Link to={`/object/${objectId}`} onClick={handleClick_3}  className="position-relative">
                    <img src={isImageClicked_3 ? page_butt_an : page_butt} alt="page" className="butt-unten page-button page-button-an"/>
                    <div className="buttons-labels d-flex justify-content-center align-items-center position-absolute w-100">
                        <span className="trans">{t('navbuttinfo.info')}</span>
                    </div>
                </Link>
            </div>
    }
    if (pathname.includes('cam')) {
        response =
            <div className="buttons-wrapper">
                <Link to={`/cam/${objectId}`}  className="position-relative">
                    <img src={qr_butt_an} alt="QR" className="butt-unten qr-button"/>
                    <div className="buttons-labels d-flex justify-content-center align-items-center position-absolute w-100">
                        <span className="trans">{t('navbuttinfo.qr')}</span>
                    </div>
                </Link>
                <Link to={`/map/${objectId}`} onClick={handleClick_2}  className="position-relative">
                    <img src={isImageClicked_2 ? map_butt_an : map_butt} alt="map" className="butt-unten map-button"/>
                    <div className="buttons-labels d-flex justify-content-center align-items-center position-absolute w-100">
                        <span className="trans">{t('navbuttinfo.karte')}</span>
                    </div>
                </Link>
                <Link to={`/object/${objectId}`} onClick={handleClick_3}  className="position-relative">
                    <img src={isImageClicked_3 ? page_butt_an : page_butt} alt="page" className="butt-unten page-button page-button-an"/>
                    <div className="buttons-labels d-flex justify-content-center align-items-center position-absolute w-100">
                        <span className="trans">{t('navbuttinfo.info')}</span>
                    </div>
                </Link>
            </div>
    }
    return (
        <div className="buttons-container">
            {response}
        </div>
    );
}