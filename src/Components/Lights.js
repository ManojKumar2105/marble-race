import { useFrame } from "@react-three/fiber";
import { useRef } from "react"

export default function Lights(){
    const light = useRef();
    useFrame((state)=>{
        light.current.position.z = state.camera.position.z+1 - 4
        light.current.target.position.z = state.camera.position.z+1 - 4
        light.current.target.updateMatrixWorld();
    })
    return <>
        <directionalLight 
                    ref={light}
                    castShadow 
                    position={[4,4,1]}
                    intensity={1} 
                    shadow-mapSize={[1024,1024]} 
                    shadow-camera-near={1}
                    shadow-camera-far={20}
                    shadow-camera-top={20}
                    shadow-camera-bottom={-20}
                    shadow-camera-left={-20}
                    shadow-camera-right={20}
        />
        <ambientLight  intensity={0.5} />
    </>
}