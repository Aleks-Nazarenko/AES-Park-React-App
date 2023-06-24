import {useNavigate} from "react-router-dom";
import { useTranslation } from 'react-i18next';
import DE from './assets/BTN-Sprachwahl-DE.png';
import  EN from './assets/BTN-Sprachwahl-EN.png';

function AESStart() {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();
    const switchAndGo = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem('selectedLang',lang);
        navigate(`/object/c-01`);
    }
    return (
        <div className="start-wrap">
            <div className="start-header-wrapper">
                <div className="start-header">
                    <div className="aes-object-subline">
                        <h3>
                            {t('start.welcome')}
                        </h3>
                    </div>
                    <div className="aes-object-headline">
                        <h1>
                            AES Park
                        </h1>
                    </div>
                </div>
            </div>
            <div className="start-lang">
                {t('start.choose')}
            </div>
            <div className="start-lang-butts-wrap">
                <img src={DE} alt="DE" onClick={() => switchAndGo('de')}/>
                <img src={EN} alt="EN" onClick={() => switchAndGo('en')}/>
            </div>
        </div>
    );
}

export default AESStart;