import { OrbitControls } from "@react-three/drei";
// import { useRef } from "react";
// import { DoubleSide } from "three";
// import * as THREE from "three"
import Lights from "./Lights.js";
import {Levels} from "./Levels.js";
import { Physics } from "@react-three/rapier";
import Player from "./Player.js";

import useGame from "../store/useGame"
import Effects from "./Effects.js";

export default function Experience(){
    const blocksCount = useGame((state)=>state.blocksCount)
    const randomBlock = useGame((state)=>state.randomBlock)
    // useHelper(dlref,THREE.DirectionalLightHelper,1)
    return <>
    <OrbitControls />
        <Physics>
        {/* <Debug /> */}
        <Lights />
        <Levels trapCount={blocksCount} randomBlock={randomBlock}/>
        <Player />
        </Physics>
        <Effects />
    </>
}