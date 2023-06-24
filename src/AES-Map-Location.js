import {useEffect,useState} from "react";

const AESMapLocation = () => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(showNextImage, 50);
        function showNextImage() {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % 120);
        }
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    const img_url = '/standort/Standort_ANM';
    const images = [];

    for (let i = 0; i < 120; i++) {
        images.push(
            <img
                key={i}
                src={img_url + i + '.png'}
                id={`standort-${i}`}
                className="standort-ani"
                style={{ display: i === currentImageIndex ? 'block' : 'none' }}
                alt="pulsar"
            />
        );
    }
    return <div className="location">{images}</div>;
}
export default AESMapLocation;