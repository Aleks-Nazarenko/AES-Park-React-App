import { useRef, useEffect } from 'react';
import 'aframe';
import { Scene, Entity, Camera } from 'react-aframe-ar/src';
//import 'ar.js/three.js/build/ar.min'
import arrow_right from "./ar_assets/arrow_right.svg";
import arrow from "./ar_assets/arrow.svg";
import e_mobility from "./ar_assets/e-mobility.svg";
import {Text} from "react-aframe-ar/src";

const AESARScene = () => {


    return (
        <Scene>
            <a-marker preset="hiro">
                <Entity
                    geometry={{ primitive: 'box' }}
                    material={{ color: 'red' }}
                    scale="0.1 0.1 0.1" camera={true} />
            </a-marker>

        </Scene>
    );
};

export default AESARScene;
