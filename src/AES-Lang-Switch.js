import { useTranslation } from 'react-i18next';
import {useEffect, useState} from "react";
import EN from './assets/BTN-Sprachwahl-klein-EN.png';
import DE from './assets/BTN-Sprachwahl-klein-DE.png';
const AESLangSwitch = () => {
    const { i18n } = useTranslation();
    const [selectedLang, setSelectedLang] = useState('');
    useEffect(() => {
        const storedLang = localStorage.getItem('selectedLang');
        if (storedLang && ['en','de'].includes(storedLang)) {
            setSelectedLang(storedLang);
            i18n.changeLanguage(storedLang);
        } else {
            const defaultLang = 'de';
            setSelectedLang(defaultLang);
            i18n.changeLanguage(defaultLang);
        }
    },[i18n]);

    const switchLang = (lang) => {
        setSelectedLang(lang);
        i18n.changeLanguage(lang);
        localStorage.setItem('selectedLang',lang);
    };
    return(
        <div className="lang-switch-container">
            <div className="lang-switch-wrapper">
                {selectedLang === 'en' && <div id="aes-lang-butt-de" className="aes-lang-butt">
                    <img src={DE} onClick={() => {switchLang('de')}}/>
                </div>}
                {selectedLang === 'de' && <div id="aes-lang-butt-en" className="aes-lang-butt">
                    <img src={EN} onClick={() => {switchLang('en')}}/>
                </div>}
            </div>
        </div>
    );
}
export default AESLangSwitch;