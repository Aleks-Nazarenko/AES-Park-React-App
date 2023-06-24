import {useRef, useEffect, useState} from 'react';
import 'ol/ol.css';
import {Map, View} from 'ol';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';
import TileGrid from 'ol/tilegrid/TileGrid';
import {get as getProjection} from 'ol/proj';
import Overlay from 'ol/Overlay';
import { defaults as defaultInteractions, PinchRotate } from 'ol/interaction';
import AESInfoSlideIn from "./AES-Info-Slide-In";
import AESNavButtons from "./AES-Nav-Buttons";
import Controls from "./AES-Map-Controls";
import AESTourModal from "./AES-Tour-Modal";
import AESMapZoomButtons from "./AES-Map-Zoom-Buttons";
import AESLangSwitch from "./AES-Lang-Switch";
import { useTranslation } from 'react-i18next';
import {useParams} from "react-router-dom";
import mapPositions from "./coordinates/map-positions.json";
import locationPositions from "./coordinates/location-positions.json";
import AESMapLocation from "./AES-Map-Location";
import labels from "./labels/labels.json";

const AesMapComponent = () => {
    const { t } = useTranslation();
    const mapContainerRef = useRef(null);
    const infoRef_1 = useRef(null);
    const infoRef_2 = useRef(null);
    const infoRef_3 = useRef(null);
    const infoRef_4 = useRef(null);
    const heizungRef = useRef(null);
    const electroRef = useRef(null);
    const tourRef = useRef(null);
    const recoveryRef = useRef(null);
    const locRef = useRef(null);
    const mapRef = useRef(null);
    const electroCenterRef = useRef(null);
    const [view, setView] = useState(null);
    const [mapPos, setMapPos] = useState(mapPositions);
    const [locPos, setLocPos] = useState(locationPositions);
    const { objectId } = useParams();
    //Swiper
    const [swiperIndex, setSwiperIndex] = useState(null);
    const handleIndexChange = (index) => {
        setSwiperIndex(index);
    };
    //Offcanvas
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [infoId, setInfoId] = useState(null);
    const handleTriggerOffcanvas = (id) => {
        setInfoId(id);
        setShowOffcanvas(true);
    };
    const handleCloseOffcanvas = () => {
        setShowOffcanvas(false);
    };
//Modal
    const [showModal, setShowModal] = useState(false);
    const [tourId, setTourId] = useState(null);
    const triggerModal = (id) => {
        setTourId(id);
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    }
    const [showWarmth, setShowWarmth] = useState(true);
    const [showRecovery,setShowRecovery] = useState(true);
    const [showElectro, setShowElectro] = useState(true);
    const [showTour, setShowTour] = useState(false);
    const [showOnRender, setShowOnRender] = useState(false);
    const toggleRight = () => {
        setShowWarmth(false);
        setShowRecovery(false);
        setShowElectro(false);
        setShowTour(true);
    }
    const toggleLeft = (warmth, electro) => {
        setShowWarmth(warmth);
        setShowRecovery(warmth);
        setShowElectro(electro);
        setShowTour(false);
        setShowModal(false);
    }
    const toggleTerm = (params) => {
        setShowWarmth(params);
        setShowRecovery(params);
    }
    const toggleElectro = (params) => {
        setShowElectro(params);
    }

    useEffect(() => {
        const calculateResolutions = () => {
            const mapMaxZoom = 5;
            const mapMaxResolution = 1.00000000;
            const mapResolutions = [];
            for (let z = 0; z <= mapMaxZoom; z++) {
                mapResolutions.push(Math.pow(2, mapMaxZoom - z) * mapMaxResolution);
            }
            return mapResolutions;
        };

        const mapTileGrid = new TileGrid({
            extent: [0.00000000, -4320.00000000, 8192.00000000, 0.00000000],
            tileSize: 256,
            minZoom: 3,
            //    maxZoom: 5,
            resolutions: calculateResolutions(),
        });

        const map = new Map({
            target: mapContainerRef.current,
            layers: [
                new TileLayer({
                    source: new XYZ({
                        projection: 'PIXELS',
                        tileGrid: mapTileGrid,
                        tilePixelRatio: 1.00000000,
                        url: '/tiles/{z}/{x}/{y}.png',
                    }),
                }),
            ],
            view: new View({
                projection: getProjection('PIXELS'), //returns null ???
                extent: [0.00000000, -4320.00000000, 8192.00000000, 0.00000000],
                maxResolution: mapTileGrid.getResolution(0),//32
                minZoom: 3,
                maxZoom: 5,
                useAnchor: false,
                resolutions: calculateResolutions(),
                constrainResolution: true,
                // zoom: 3,
               // center: [3738, -2187],
            }),
            interactions: defaultInteractions({ pinchRotate: false })
        });

        setView(map.getView()); //pass the view object as a prop to the AES-Map-Zoom component

        const heizung_container = document.createElement('div');
        heizung_container.appendChild(heizungRef.current);
        const heizung_overlay = new Overlay({
            position: [4651.00000000, -2090.00000000],
            positioning: 'center-center',
            element: heizung_container,
            stopEvent: false,
            className: 'ameisen-3-overlay first-hide'
        });
        map.addOverlay(heizung_overlay);

        const recovery_container = document.createElement('div');
        recovery_container.appendChild(recoveryRef.current);
        const recovery_overlay = new Overlay({
            position: [3789.00000000, -2082.00000000],
            positioning: 'center-center',
            element: recovery_container,
            stopEvent: false,
            className: 'ameisen-2-overlay first-hide'
        });
        map.addOverlay(recovery_overlay);

        const electro_container = document.createElement('div');
        electro_container.appendChild(electroRef.current);
        const electro_overlay = new Overlay({
            position: [3800.00000000, -1690.00000000],
            positioning: 'center-center',
            element: electro_container,
            stopEvent: false,
            className: 'ameisen-4-overlay first-hide'
        });
        map.addOverlay(electro_overlay);

        const center_overlay = new Overlay({
            position: [3650.00000000, -1570.00000000],
            positioning: 'center-center',
            element: electroCenterRef.current,
            stopEvent: false,
            className: 'electro_center_overlay'
        });
        map.addOverlay(center_overlay);

        const tour_container = document.createElement('div');
        tour_container.appendChild(tourRef.current);
        const tour_overlay = new Overlay({
            position: [3176.00000000, -2172.00000000],
            positioning: 'center-center',
            element: tour_container,
            stopEvent: false,
            className: 'touren-overlay'
        });
        map.addOverlay(tour_overlay)

        const loc_overlay = new Overlay({
            position: objectId ? locPos[objectId]: [3732.00000000, -2022.00000000] ,
            positioning: 'center-center',
            element: locRef.current,
            stopEvent: false,
            className: 'standort-overlay first-hide'
        });
        map.addOverlay(loc_overlay);

        const info_1_container = document.createElement('div');
        info_1_container.appendChild(infoRef_1.current);
        const info_1_overlay = new Overlay({
            position: [3880.00000000, -2430.00000000],
            positioning: 'bottom-center',
            element: info_1_container,
            stopEvent: false,
            className: 'info-overlay info-overlay-1 zoom-4 zoom-5',
        });
        map.addOverlay(info_1_overlay);
        const info_2_container = document.createElement('div');
        info_2_container.appendChild(infoRef_2.current);
        const info_2_overlay = new Overlay({
            position: [4600.00000000, -1240.00000000],
            positioning: 'bottom-center',
            element: info_2_container,
            stopEvent: false,
            className: 'info-overlay info-overlay-2 zoom-4 zoom-5',
        });
        map.addOverlay(info_2_overlay);
        const info_3_container = document.createElement('div');
        info_3_container.appendChild(infoRef_3.current);
        const info_3_overlay = new Overlay({
            position: [3550.00000000, -3130.00000000],
            positioning: 'bottom-center',
            element: info_3_container,
            stopEvent: false,
            className: 'info-overlay info-overlay-3 zoom-4 zoom-5',
        });
        map.addOverlay(info_3_overlay);
        const info_4_container = document.createElement('div');
        info_4_container.appendChild(infoRef_4.current);
        const info_4_overlay = new Overlay({
            position: [4200.00000000, -1670.00000000],
            positioning: 'bottom-center',
            element: info_4_container,
            stopEvent: false,
            className: 'info-overlay info-overlay-4 zoom-4 zoom-5',
        });
        map.addOverlay(info_4_overlay);

        const heizung_style_width = 2753;
        const recovery_style_width = 518;
        const electro_style_wigth = 3369;
        const tour_style_width = 2273;
        const center_width = 200;

        mapRef.current = map;

        // map.getView().fit([0.00000000, -4320.00000000, 8192.00000000, 0.00000000], map.getSize());
        map.getView().setZoom(3);
        map.getView().setCenter(objectId ? mapPos[objectId]: [3738, -2187]);
        //SHOW GRAPHICS ONLY AFTER MAP HAS BIN LOADED
        map.once('rendercomplete', function (event) {
            setShowOnRender(true);
        });
        // Hide Info-Buttons initially
        [infoRef_1.current, infoRef_2.current, infoRef_3.current, infoRef_4.current].forEach(
            (infoRef) => {infoRef.style.display = 'none';}
        );
        //HIDE GRAPHICS when ZOOMING
        map.on('movestart', function (event) {
            if (!Number.isInteger(map.getView().getZoom())) {
                heizungRef.current.style.display = 'none';
                recoveryRef.current.style.display = 'none';
                electroRef.current.style.display = 'none';
                tourRef.current.style.display = 'none';
                electroCenterRef.current.style.display = 'none';
            }
        });
        map.on('moveend', (event) => { console.log('ZOOM '+map.getView().getZoom() );
            if (map.getView().getZoom() === 3) {
                heizungRef.current.style.width = heizung_style_width / 4 + 'px';
                recoveryRef.current.style.width = recovery_style_width / 4 + 'px';
                electroRef.current.style.width = electro_style_wigth / 4 + 'px';
                tourRef.current.style.width = tour_style_width / 4 + 'px';
                electroCenterRef.current.style.width = center_width / 4 + 'px';
            }
            if (map.getView().getZoom() === 4) {
                heizungRef.current.style.width = heizung_style_width / 2 + 'px';
                recoveryRef.current.style.width = recovery_style_width / 2 + 'px';
                electroRef.current.style.width = electro_style_wigth / 2 + 'px';
                tourRef.current.style.width = tour_style_width / 2 + 'px';
                electroCenterRef.current.style.width = center_width / 2 + 'px';
            }
            if (map.getView().getZoom() === 5) {
                heizungRef.current.style.width = heizung_style_width + 'px';
                recoveryRef.current.style.width = recovery_style_width + 'px';
                electroRef.current.style.width = electro_style_wigth + 'px';
                tourRef.current.style.width = tour_style_width + 'px';
                electroCenterRef.current.style.width = center_width + 'px';
            }
            heizungRef.current.style.display = 'block';
            recoveryRef.current.style.display = 'block';
            electroRef.current.style.display = 'block';
            tourRef.current.style.display = 'block';
            electroCenterRef.current.style.display = 'block';
        });
        return () => {
            map.setTarget(null);
        };
    }, []);

    useEffect(() => {
        console.log('useEffect: ' + swiperIndex);
       if(swiperIndex !==null) {
           triggerModal(swiperIndex);
           tourRef.current.querySelectorAll('.tour-svg').forEach((item) => item.style.display = 'none');
           if(swiperIndex === 0){tourRef.current.querySelectorAll('.tour-0').forEach((item) => item.style.display = 'block');}
           if(swiperIndex === 1){tourRef.current.querySelectorAll('.tour-1').forEach((item) => item.style.display = 'block');}
           if(swiperIndex === 2){tourRef.current.querySelectorAll('.tour-2').forEach((item) => item.style.display = 'block');}
           if(swiperIndex === 3){tourRef.current.querySelectorAll('.tour-3').forEach((item) => item.style.display = 'block');}
           if(swiperIndex === 4){tourRef.current.querySelectorAll('.tour-4').forEach((item) => item.style.display = 'block');}
           if(swiperIndex === 5){tourRef.current.querySelectorAll('.tour-5').forEach((item) => item.style.display = 'block');}
       }
    }, [swiperIndex]);

    const labelsRef = useRef([]);
    useEffect( () => {
        // Remove existing labels
        labelsRef.current.forEach((label) => mapRef.current.removeOverlay(label));
        labelsRef.current = [];
        const zoom = mapRef.current.getView().getZoom();
        for (let i = 0; i < labels.length; i++) {
            const label = labels[i];
            const labelId = label.id;
            const labelCoordinates = label.coordinates;
            const labelContent = label.content;
            const labelClass = label.class;
            const labelElement = document.createElement('div');
            labelElement.textContent = t(labelContent);
            labelElement.classList.add('zoom-'+zoom);
            const labelOverlay = new Overlay({
                element: labelElement,
                position: labelCoordinates,
                positioning: 'bottom-left',
                id: labelId,
                stopEvent: false,
                className: labelClass,
            });
            mapRef.current.addOverlay(labelOverlay);
            labelsRef.current.push(labelOverlay);
        }
        const handleZoomChange = () => {
            const zoom = mapRef.current.getView().getZoom();
            labelsRef.current.forEach((overlay) => {
                const overlayElement = overlay.getElement();
                if (zoom <= 3) {
                    overlayElement.style.display = "none";
                } else {
                    overlayElement.style.display = "block";
                }
            });
            if(zoom <= 3){
                [infoRef_1.current, infoRef_2.current, infoRef_3.current, infoRef_4.current].forEach(
                    (infoRef) => {infoRef.style.display = 'none';}
                );
            }else {
                [infoRef_1.current, infoRef_2.current, infoRef_3.current, infoRef_4.current].forEach(
                    (infoRef) => {infoRef.style.display = 'block';}
                );
            }
        };
        mapRef.current.on('moveend', handleZoomChange);
        return () => {
            mapRef.current.un('moveend', handleZoomChange);
        };

    },[t]);

    return (
        <div>
            <div ref={mapContainerRef} className="map-container"></div>
            <svg ref={electroCenterRef} id="electro-center" className={`e-stroeme-center stroeme e-stroeme ${showElectro && showOnRender ? '' : 'd-none'}`} width="200px" height="200px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
                <circle r="34.5" transform="translate(104.5 104.5)" fill="#0098a1"/>
            </svg>
            <svg ref={heizungRef} id="heizung" className={`ameisen-3 stroeme t-stroeme ${showWarmth && showOnRender ? '' : 'd-none'}`} width="2753px" height="2097px"
                 data-name="Ebene 2"
                 xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2753.5 2097.01">
                <g id="Heizung-Kuehlung">
                    <path id="Pfad_92" data-name="Pfad 92" className="cls-3" d="m452.64,803.49l-2.96-545.03"/>
                    <path id="Pfad_93" data-name="Pfad 93" className="cls-3"
                          d="m300.57,3l.53,184.22c.1,7.89-5.45,14.38-12.41,14.5l-30.88.58"/>
                    <path id="Pfad_94" data-name="Pfad 94" className="cls-1" d="m3,709.74l448.45.04"/>
                    <path id="Pfad_95" data-name="Pfad 95" className="cls-3"
                          d="m452.73,784.02l232.07-.27c6.95-.05,12.62,5.53,12.7,12.47l12.73,1285.32c.07,6.91,5.7,12.47,12.61,12.47h47.36"/>
                    <path id="Pfad_96" data-name="Pfad 96" className="cls-3"
                          d="m107.03,226.68l-69.71.59c-7.16.07-12.91,5.78-12.83,12.75l1.57,222.52"/>
                    <path id="Pfad_97" data-name="Pfad 97" className="cls-1" d="m672.92,1841.63h31.57"/>
                    <path id="Pfad_98" data-name="Pfad 98" className="cls-2" d="m704.2,1393.35l2049.28,21.35"/>
                    <path id="Pfad_99" data-name="Pfad 99" className="cls-1" d="m197.5,411.59l252.59-.68"/>
                    <path id="Pfad_100" data-name="Pfad 100" className="cls-3"
                          d="m258.11,258.34l288.11-.62,2.57-.03c6.89-.07,12.56,5.41,12.73,12.3v7.1s.4,87.27.4,87.27"/>
                </g>
            </svg>
            <svg ref={recoveryRef} id="recovery" className={`ameisen-2 stroeme t-stroeme ${showRecovery && showOnRender ? '' : 'd-none'}`} width="518px" height="2082px"
                 xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 518.75 2082.64">
                <g id="Recovery-g">
                    <path id="Pfad_101" data-name="Pfad 101" className="cls-1"
                          d="m62.71,3l.56,196.55c.08,8.84-6.13,16.1-13.92,16.27l-46.35,1.05"/>
                    <path id="Pfad_104" data-name="Pfad 104" className="cls-1"
                          d="m211.45,272.29l2.62,482.22c.15,7.81,6.57,14.03,14.38,13.93l217.34-1.46c7.85-.1,14.29,6.18,14.38,14.03l13.72,1284.6c.09,7.78,6.42,14.03,14.2,14.03h27.66"/>
                    <path id="Pfad_102" data-name="Pfad 102" className="cls-1"
                          d="m441.49,212.46l-48.92.58c-7.82.14-14.08,7.67-13.98,16.84l.5,40.45"/>
                    <path id="Pfad_103" data-name="Pfad 103" className="cls-1"
                          d="m3.27,272.6l443.74-2.32c7.77-.08,14.16,6.09,14.35,13.85l.37,96.87"/>
                    <path id="Pfad_105" data-name="Pfad 105" className="cls-1" d="m325.03,249.05l.06,21.33"/>
                </g>
            </svg>
            <div ref={electroRef} className={`ameisen-4 svg-twin-container stroeme e-stroeme ${showElectro && showOnRender ? '' : 'd-none'}`}>
                <svg id="elektro-stroeme-gegen" className="svg-ameise svg-ameise-below"
                     xmlns="http://www.w3.org/2000/svg" width="3369"
                     height="2915" viewBox="0 0 3369.99 2915.07">
                    <g id="Fluss">
                        <polyline className="ameise" points="1627.13 2912.07 1950.36 2882.14 1349.79 2652.69"/>
                        <polyline className="ameise" points="1736.87 2664.66 1950.36 2882.14 1621.81 2478.44"/>
                        <polyline className="ameise"
                                  points="1978.29 2638.72 1950.36 2882.14 1531.36 1339.13 3366.99 2824.28"/>
                        <polyline className="ameise" points="1867.89 1339.81 1531.36 1339.13 1721.14 1240.46"/>
                        <polyline className="ameise" points="3 1493.45 1531.36 1339.13 1038.53 1311.88"/>
                        <polyline className="ameise" points="1327.84 1032.55 1531.36 1339.13 1258.01 1206.13"/>
                        <polyline className="ameise" points="1691.87 1028.96 1531.36 1339.13 920.81 3"/>
                        <polyline className="ameise"
                                  points="1273.97 1537.34 1455.54 1643.09 1531.36 1339.13 1064.47 1515.4"/>
                        <line className="ameise" x1="1607.18" y1="1786.75" x2="1455.54" y2="1643.09"/>
                        <polyline className="ameise"
                                  points="2450.5 584.28 2061.06 856.17 1531.36 1339.13 1207.5 1741.83"/>
                        <polyline className="ameise" points="1557.96 495.16 2061.06 856.17 1968.98 475.21"/>
                        <polyline className="ameise" points="2459.81 1603.19 2061.06 856.17 2465.13 1254.68"/>
                    </g>
                </svg>
                <svg id="elektro-stroeme" className="svg-ameise svg-ameise-above" xmlns="http://www.w3.org/2000/svg"
                     width="3369"
                     height="2915" viewBox="0 0 3369.99 2915.07">
                    <g id="Fluss">
                        <polyline className="ameise" points="1627.13 2912.07 1950.36 2882.14 1349.79 2652.69"/>
                        <polyline className="ameise" points="1736.87 2664.66 1950.36 2882.14 1621.81 2478.44"/>
                        <polyline className="ameise"
                                  points="1978.29 2638.72 1950.36 2882.14 1531.36 1339.13 3366.99 2824.28"/>
                        <polyline className="ameise" points="1867.89 1339.81 1531.36 1339.13 1721.14 1240.46"/>
                        <polyline className="ameise" points="3 1493.45 1531.36 1339.13 1038.53 1311.88"/>
                        <polyline className="ameise" points="1327.84 1032.55 1531.36 1339.13 1258.01 1206.13"/>
                        <polyline className="ameise" points="1691.87 1028.96 1531.36 1339.13 920.81 3"/>
                        <polyline className="ameise"
                                  points="1273.97 1537.34 1455.54 1643.09 1531.36 1339.13 1064.47 1515.4"/>
                        <line className="ameise" x1="1607.18" y1="1786.75" x2="1455.54" y2="1643.09"/>
                        <polyline className="ameise"
                                  points="2450.5 584.28 2061.06 856.17 1531.36 1339.13 1207.5 1741.83"/>
                        <polyline className="ameise" points="1557.96 495.16 2061.06 856.17 1968.98 475.21"/>
                        <polyline className="ameise" points="2459.81 1603.19 2061.06 856.17 2465.13 1254.68"/>
                    </g>
                </svg>
            </div>
            <svg ref={tourRef} id="touren-svg" className={`${showTour ? '' : 'd-none'}`} xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="2273px" height="2083px"
                 viewBox="0 0 2273 2083" >
                <g id="c01" className="tour-svg tour-0 tour-1 tour-2 tour-3 tour-4 tour-5">
                    <rect x="1511.176" y="709.965" fill="#0094A0" width="374" height="374"/>
                </g>
                <g id="c10" className="tour-svg tour-0 tour-4 tour-5 tour-3">
                    <rect x="1339.742" y="95.703" fill="#0094A0" width="140" height="72"/>
                </g>
                <g id="c17" className="tour-svg tour-4 tour-5 tour-3">
                    <rect x="1705.554" y="95.703" fill="#0094A0" width="140" height="72"/>
                </g>
                <g id="c06" className="tour-svg tour-1 tour-2 tour-4 tour-3">
                    <rect x="1278.725" y="272.793" fill="#0094A0" width="140" height="72"/>
                </g>
                <g id="c20" className="tour-svg tour-4 tour-5 tour-3">
                    <rect x="1559.047" y="355.755" fill="#0094A0" width="104" height="171"/>
                </g>
                <g id="c11" className="tour-svg tour-3">
                    <path fill="#0094A0" d="M164.325,621.891c-4.005-66.396-39.683-137.161-82.409-159.477c-46.067-24.061-82.418,16.701-77.828,92.8
                c4.589,76.099,47.855,149.992,93.317,164.018C139.57,732.24,168.329,688.289,164.325,621.891z"/>
                </g>
                <g id="c12" className="tour-svg tour-3">
                    <path fill="#0094A0" d="M1774.603,1605.898c-2.157,40.852-31.92,65.232-68.826,53.73c-39.794-12.406-72.406-61.152-69.935-107.971
                c2.469-46.809,38.807-68.598,78.271-50.023C1750.715,1518.869,1776.753,1565.062,1774.603,1605.898z"/>
                </g>
                <g id="c00" className="tour-svg">
                    <rect x="1368.523" y="1575.123" fill="#0094A0" width="136" height="361"/>
                </g>
                <g id="c0" className="tour-svg">
                    <rect x="1529.91" y="1946.745" fill="#0094A0" width="365" height="136"/>
                </g>
                <g id="c19" className="tour-svg tour-3">
                    <rect x="2007.038" y="1949.749" fill="#0094A0" width="266" height="133"/>
                </g>
                <g id="c05" className="tour-svg tour-0 tour-1 tour-2 tour-4 tour-3">
                    <rect x="1763.47" y="1725.888" fill="#0094A0" width="137" height="72"/>
                </g>
                <g id="c21" className="tour-svg tour-3 tour-1">
                    <g>
                     <rect x="2012.569" y="1726.1" fill="#0094A0" width="69.471" height="39"/>
                        <rect x="2091.099" y="1726.1" fill="#0094A0" width="69.47" height="39"/>
                    </g>
                </g>
                <g id="c02" className="tour-svg tour-3 tour-0 tour-1 tour-2 tour-5">
                    <rect x="1079.97" y="582.911" fill="#0094A0" width="141" height="70"/>
                </g>
                <g id="c04" className="tour-svg tour-3 tour-0 tour-1 tour-4 tour-5">
                    <rect x="1761.011" y="272.653" fill="#0094A0" width="70" height="139"/>
                </g>
                <g id="c22" className="tour-svg tour-3">
                    <rect x="1931.206" y="105.863" fill="#0094A0" width="90" height="27"/>
                </g>
                <g id="c18" className="tour-svg tour-3 tour-4 tour-5">
                    <rect x="1927.865" y="288.102" fill="#0094A0" width="54.801" height="272.654"/>
                </g>
                <g id="c15" className="tour-svg tour-3">
                    <rect x="1069.169" y="864.059" transform="matrix(0.5097 -0.8603 0.8603 0.5097 -258.7424 1397.3068)"
                      fill="#0094A0" width="54.854" height="123.219"/>
                </g>
                <g id="c23" className="tour-svg tour-3">
                    <g>
                        <circle fill="#0094A0" cx="1736.91" cy="614.106" r="5.014"/>
                        <circle fill="#0094A0" cx="1749.129" cy="614.106" r="5.014"/>
                        <path fill="#0094A0" d="M1771.465,600.784c0.714,1.899,2.531,3.255,4.68,3.255c2.769,0,5.012-2.244,5.012-5.014
                    c0-2.768-2.243-5.013-5.012-5.013c-0.114,0-0.223,0.026-0.334,0.034c-0.712-1.899-2.531-3.257-4.681-3.257
                    c-2.768,0-5.012,2.246-5.012,5.014s2.245,5.014,5.012,5.014C1771.246,600.817,1771.353,600.79,1771.465,600.784z"/>
                        <path fill="#0094A0" d="M1776.145,605.471c-2.767,0-5.016,2.245-5.016,5.014c0,2.768,2.249,5.014,5.016,5.014
                    c2.769,0,5.012-2.246,5.012-5.014C1781.157,607.716,1778.914,605.471,1776.145,605.471z"/>
                    </g>
                </g>
                <g id="c13" className="tour-svg tour-3">
                    <path fill="#0094A0" d="M1331.172,866.352c-1.304-1.909-3.039-3.441-5.057-4.678c-0.637-1.351-1.465-2.604-2.489-3.734
                    c-8.176-9.015-25.769-6.818-39.3,4.907l-0.855,0.742l-2.915-2.573c1.436-0.709,2.429-2.173,2.429-3.882
                    c0-2.398-1.944-4.344-4.344-4.344h-1.521l4.718-9.493c2.77,1.23,5.52,2.293,8.238,3.181l0.238,0.125
                    c17.109,8.953,35.522,7.528,41.127-3.183c1.657-3.165,1.978-6.791,1.209-10.553c-0.28-12.38-13.022-28.249-32.521-38.925
                    c-23.928-13.1-48.959-13.428-55.911-0.73c-0.17,0.309-0.315,0.627-0.46,0.945c-0.646,0.77-1.241,1.583-1.712,2.485
                    c-5.604,10.711,3.72,26.653,20.828,35.604l0.951,0.498c2.638,1.992,5.475,3.896,8.496,5.678l-6.345,12.771
                    c-0.254,0.513-0.38,1.054-0.431,1.598h-15.079l-0.104-11.142c-0.173-18.806-10.716-33.956-23.543-33.837
                    c-0.981,0.009-1.942,0.136-2.892,0.318c-1.859-0.534-3.772-0.799-5.718-0.749c-16.604,0.434-29.484,22.919-28.773,50.221
                    c0.714,27.302,14.75,49.083,31.354,48.65c1.282-0.033,2.538-0.214,3.771-0.501c1.038,0.198,2.091,0.333,3.168,0.323
                    c12.827-0.12,23.091-15.46,22.913-34.265l-0.095-10.331h15.133c0.077,0.073,0.134,0.156,0.214,0.225l9.784,8.642l-2.332,2.022
                    c-3.541,2.59-6.717,5.374-9.528,8.258l-1.184,1.026c-13.528,11.727-17.87,28.538-9.694,37.554c2.576,2.84,6.09,4.562,10.114,5.229
                    c11.379,3.388,28.394-0.221,44.045-10.445C1328.72,899.863,1339.5,878.534,1331.172,866.352z"/>
                </g>
                <g id="c03" className="tour-svg tour-3 tour-2 tour-5">
                    <ellipse fill="#0094A0" cx="1119.986" cy="399.445" rx="39" ry="79.499"/>
                </g>
                <g id="c16" className="tour-svg tour-3 tour-1 tour-2">
                    <polygon fill="#0094A0" points="2221.381,113.731 2221.381,0.251 2171.93,0.251 2078.381,0.251 2078.381,113.731 2078.381,683.771
                        2078.381,797.251 2171.93,797.251 2221.381,797.251 2221.381,683.771 2171.93,683.771 2171.93,113.731 	"/>
                </g>
            </svg>

            <svg ref={infoRef_1} onClick={() => handleTriggerOffcanvas(1)} xmlns="http://www.w3.org/2000/svg"
                 id="info_1" className="info-button" data-info-id="1" width="104"
                 height="104"
                 viewBox="0 0 104 104">
                <g id="BTN_Info" transform="translate(-0.135 -0.299)">
                    <circle id="Containter" cx="52" cy="52" r="52" transform="translate(0.135 0.299)" fill="none"/>
                    <g id="Icon_Info" transform="translate(21.135 21.299)">
                        <path id="HG" d="M1.534,2.813H55.655V45.656L30.916,47.469,19.131,58.329V47.469H1.534Z"
                              transform="translate(1.769 -0.184)" fill="#fff"/>
                        <path id="IN"
                              d="M33.444,24.02a2.979,2.979,0,1,0-2.979-2.979A2.979,2.979,0,0,0,33.444,24.02ZM39.4,44.873H35.43v-13.9a1.992,1.992,0,0,0-1.986-1.986H29.472a1.986,1.986,0,0,0,0,3.972h1.986V44.873H27.486a1.986,1.986,0,1,0,0,3.972H39.4a1.986,1.986,0,1,0,0-3.972Z"
                              transform="translate(-3.307 -9.651)" fill="#0098a1"/>
                        <path id="OUT"
                              d="M52.5,0H7.5A7.512,7.512,0,0,0,0,7.433v33.82a7.444,7.444,0,0,0,7.5,7.433H18.75v9.893a1.4,1.4,0,0,0,2.241,1.143L35.625,48.9H52.5A7.512,7.512,0,0,0,60,41.465V7.433A7.508,7.508,0,0,0,52.5,0Zm3.75,41.466a3.771,3.771,0,0,1-3.75,3.77H35.613a3.738,3.738,0,0,0-2.251.755L22.5,54.188V47.12a1.88,1.88,0,0,0-1.875-1.885H7.5a3.771,3.771,0,0,1-3.75-3.77V7.539A3.771,3.771,0,0,1,7.5,3.769h45a3.771,3.771,0,0,1,3.75,3.77Z"
                              transform="translate(0 0)" fill="#0098a1"/>
                    </g>
                </g>
            </svg>
            <svg ref={infoRef_2} onClick={() => handleTriggerOffcanvas(2)} xmlns="http://www.w3.org/2000/svg"
                 id="info_2" className="info-button" data-info-id="2" width="104"
                 height="104"
                 viewBox="0 0 104 104">
                <g id="BTN_Info" transform="translate(-0.135 -0.299)">
                    <circle id="Containter" cx="52" cy="52" r="52" transform="translate(0.135 0.299)" fill="none"/>
                    <g id="Icon_Info" transform="translate(21.135 21.299)">
                        <path id="HG" d="M1.534,2.813H55.655V45.656L30.916,47.469,19.131,58.329V47.469H1.534Z"
                              transform="translate(1.769 -0.184)" fill="#fff"/>
                        <path id="IN"
                              d="M33.444,24.02a2.979,2.979,0,1,0-2.979-2.979A2.979,2.979,0,0,0,33.444,24.02ZM39.4,44.873H35.43v-13.9a1.992,1.992,0,0,0-1.986-1.986H29.472a1.986,1.986,0,0,0,0,3.972h1.986V44.873H27.486a1.986,1.986,0,1,0,0,3.972H39.4a1.986,1.986,0,1,0,0-3.972Z"
                              transform="translate(-3.307 -9.651)" fill="#0098a1"/>
                        <path id="OUT"
                              d="M52.5,0H7.5A7.512,7.512,0,0,0,0,7.433v33.82a7.444,7.444,0,0,0,7.5,7.433H18.75v9.893a1.4,1.4,0,0,0,2.241,1.143L35.625,48.9H52.5A7.512,7.512,0,0,0,60,41.465V7.433A7.508,7.508,0,0,0,52.5,0Zm3.75,41.466a3.771,3.771,0,0,1-3.75,3.77H35.613a3.738,3.738,0,0,0-2.251.755L22.5,54.188V47.12a1.88,1.88,0,0,0-1.875-1.885H7.5a3.771,3.771,0,0,1-3.75-3.77V7.539A3.771,3.771,0,0,1,7.5,3.769h45a3.771,3.771,0,0,1,3.75,3.77Z"
                              transform="translate(0 0)" fill="#0098a1"/>
                    </g>
                </g>
            </svg>
            <svg ref={infoRef_3} onClick={() => handleTriggerOffcanvas(3)} xmlns="http://www.w3.org/2000/svg"
                 id="info_3" className="info-button" data-info-id="3" width="104"
                 height="104"
                 viewBox="0 0 104 104">
                <g id="BTN_Info" transform="translate(-0.135 -0.299)">
                    <circle id="Containter" cx="52" cy="52" r="52" transform="translate(0.135 0.299)" fill="none"/>
                    <g id="Icon_Info" transform="translate(21.135 21.299)">
                        <path id="HG" d="M1.534,2.813H55.655V45.656L30.916,47.469,19.131,58.329V47.469H1.534Z"
                              transform="translate(1.769 -0.184)" fill="#fff"/>
                        <path id="IN"
                              d="M33.444,24.02a2.979,2.979,0,1,0-2.979-2.979A2.979,2.979,0,0,0,33.444,24.02ZM39.4,44.873H35.43v-13.9a1.992,1.992,0,0,0-1.986-1.986H29.472a1.986,1.986,0,0,0,0,3.972h1.986V44.873H27.486a1.986,1.986,0,1,0,0,3.972H39.4a1.986,1.986,0,1,0,0-3.972Z"
                              transform="translate(-3.307 -9.651)" fill="#0098a1"/>
                        <path id="OUT"
                              d="M52.5,0H7.5A7.512,7.512,0,0,0,0,7.433v33.82a7.444,7.444,0,0,0,7.5,7.433H18.75v9.893a1.4,1.4,0,0,0,2.241,1.143L35.625,48.9H52.5A7.512,7.512,0,0,0,60,41.465V7.433A7.508,7.508,0,0,0,52.5,0Zm3.75,41.466a3.771,3.771,0,0,1-3.75,3.77H35.613a3.738,3.738,0,0,0-2.251.755L22.5,54.188V47.12a1.88,1.88,0,0,0-1.875-1.885H7.5a3.771,3.771,0,0,1-3.75-3.77V7.539A3.771,3.771,0,0,1,7.5,3.769h45a3.771,3.771,0,0,1,3.75,3.77Z"
                              transform="translate(0 0)" fill="#0098a1"/>
                    </g>
                </g>
            </svg>
            <svg ref={infoRef_4} onClick={() => handleTriggerOffcanvas(26)} xmlns="http://www.w3.org/2000/svg"
                 id="info_4" className="info-button" data-info-id="26" width="104"
                 height="104"
                 viewBox="0 0 104 104">
                <g id="BTN_Info" transform="translate(-0.135 -0.299)">
                    <circle id="Containter" cx="52" cy="52" r="52" transform="translate(0.135 0.299)" fill="none"/>
                    <g id="Icon_Info" transform="translate(21.135 21.299)">
                        <path id="HG" d="M1.534,2.813H55.655V45.656L30.916,47.469,19.131,58.329V47.469H1.534Z"
                              transform="translate(1.769 -0.184)" fill="#fff"/>
                        <path id="IN"
                              d="M33.444,24.02a2.979,2.979,0,1,0-2.979-2.979A2.979,2.979,0,0,0,33.444,24.02ZM39.4,44.873H35.43v-13.9a1.992,1.992,0,0,0-1.986-1.986H29.472a1.986,1.986,0,0,0,0,3.972h1.986V44.873H27.486a1.986,1.986,0,1,0,0,3.972H39.4a1.986,1.986,0,1,0,0-3.972Z"
                              transform="translate(-3.307 -9.651)" fill="#0098a1"/>
                        <path id="OUT"
                              d="M52.5,0H7.5A7.512,7.512,0,0,0,0,7.433v33.82a7.444,7.444,0,0,0,7.5,7.433H18.75v9.893a1.4,1.4,0,0,0,2.241,1.143L35.625,48.9H52.5A7.512,7.512,0,0,0,60,41.465V7.433A7.508,7.508,0,0,0,52.5,0Zm3.75,41.466a3.771,3.771,0,0,1-3.75,3.77H35.613a3.738,3.738,0,0,0-2.251.755L22.5,54.188V47.12a1.88,1.88,0,0,0-1.875-1.885H7.5a3.771,3.771,0,0,1-3.75-3.77V7.539A3.771,3.771,0,0,1,7.5,3.769h45a3.771,3.771,0,0,1,3.75,3.77Z"
                              transform="translate(0 0)" fill="#0098a1"/>
                    </g>
                </g>
            </svg>
            <Controls onIndexChange={handleIndexChange} onToggleRight={toggleRight} onToggleLeft={toggleLeft} onToggleTerm={toggleTerm} onToggleElectro={toggleElectro}/>
            <AESNavButtons/>
            <AESInfoSlideIn showOffcanvas={showOffcanvas} closeOffcanvas={handleCloseOffcanvas} infoId={infoId}/>
            <AESTourModal showModal={showModal} tourId={tourId} closeModal={handleCloseModal}/>
            {view && <AESMapZoomButtons view={view} />}
            <AESLangSwitch />
            <div id="standort" ref={locRef}>
                {showOnRender && <AESMapLocation />}
            </div>


        </div>
    );

};

export default AesMapComponent;
