import { useEffect, useRef,useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/library';
import { useTranslation } from 'react-i18next';
import AESNavButtons from "./AES-Nav-Buttons";
import AESLangSwitch from "./AES-Lang-Switch";
const AESQRScanner = () => {
    const { t } = useTranslation();
    const videoRef = useRef(null);
    const [scannedUrl, setScannedUrl] = useState(null);
    const [camError, setCamError] = useState(null);

    useEffect(() => {
        const codeReader = new BrowserMultiFormatReader();

        const handleVideoStream = (stream) => {
            const videoElement = videoRef.current;
            videoElement.srcObject = stream;

            codeReader.decodeFromVideoElement(videoElement)
                .then( result =>{
                    let url = result.getText();
                    setScannedUrl(url);
                    codeReader.reset();
                    window.location.assign(url);
                } )
                .catch(err => {
                    console.error(err);
                });
        };

        const handleError = (error) => {
            console.error('Error accessing camera: ', error);
            setCamError(t('cam.error'));
        };

        navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
            .then(handleVideoStream)
            .catch(handleError);

        return () => {
            codeReader.reset();
        };
    }, []);

    return (

        <div className="aes-object-container">
            <AESLangSwitch/>
            <div className="aes-object-wrapper">
                <div className="aes-object-content-wrapper">
                    <div className="aes-object-subline">
                        <h3 className="cam-header-3" >
                            {t('cam.find')}
                        </h3>
                    </div>
                    <div id="container">
                        <video id="video" ref={videoRef} autoPlay playsInline />
                    </div>
                    <div id="error-result">
                        {scannedUrl && <div><a href={scannedUrl}>{scannedUrl}</a></div>}
                        {camError && <div>{camError}</div>}
                    </div>
                </div>
            </div>
            <AESNavButtons/>
        </div>
    );
};

export default AESQRScanner;
