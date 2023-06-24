import {useEffect} from "react";
const AESMapZoomButtons = ({view}) => {

    useEffect(()=>{
        // Preload the images
        const imageUrls = ['/public_assets/BTN_Zoomstuffe_flipped.png', '/public_assets/BTN_Zoomstuffe-plus_flipped.png', '/public_assets/BTN_Zoomstuffe-minus_flipped.png'];
        imageUrls.forEach((url) => {
            const img = new Image();
            img.src = url;
        });

        // Check if the device supports touch events
        const isTouchDevice = 'ontouchstart' in document.documentElement;
        // Add event listener for either 'mousedown' or 'touchstart' event
        const eventName = isTouchDevice ? 'touchstart' : 'mousedown';
        const eventNameUp = isTouchDevice ? 'touchend' : 'mouseup';
        const butt_zoom_in = document.querySelector('.ol-zoom-in');
        butt_zoom_in.innerHTML = '';
        const butt_zoom_out = document.querySelector('.ol-zoom-out');
        butt_zoom_out.innerHTML = '';
        const div_zoom = document.querySelector('.ol-zoom');

        butt_zoom_in.addEventListener(eventName, function (e) {
            if (view.getZoom() < 5) {
                div_zoom.classList.add('ol-zoom-plus');
            }
        });
        butt_zoom_in.addEventListener(eventNameUp, function (e) {
            if (view.getZoom() < 5) {
                setTimeout(()=>{div_zoom.classList.remove('ol-zoom-plus');}, 100);
            }
        });
        butt_zoom_out.addEventListener(eventName, function (e) {
            if (view.getZoom() > 3) {
                div_zoom.classList.add('ol-zoom-minus');
            }
        });
        butt_zoom_out.addEventListener(eventNameUp, function (e) {
            if (view.getZoom() > 3) {
                setTimeout(() => {div_zoom.classList.remove('ol-zoom-minus')}, 100);
            }
        });
    },[]);
    return null;
}
export default AESMapZoomButtons;