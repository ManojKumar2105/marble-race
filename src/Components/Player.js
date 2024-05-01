import { useKeyboardControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { RigidBody, useRapier } from "@react-three/rapier";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three"
import useGame from "../store/useGame";

export default function Player(){
    // console.log("Hellokjvfjhfjh");
   const [subscribeKeys,getKeys] = useKeyboardControls()
   const ball = useRef();
   const [smoothedCameraPosition] = useState(()=> new THREE.Vector3(10, 10, 10))
   const [smoothedCameraTarget] = useState(()=> new THREE.Vector3())

   const start = useGame((state)=>state.start)
   const end = useGame((state)=>state.end)
   const restart = useGame((state)=>state.restart)
   const blocksCount = useGame((state)=>state.blocksCount)
   const {rapier,world} = useRapier();

   const rapierWorld = world.raw();
    const reset = () => {
        ball.current.setTranslation({x:0,y:1,z:0});
        ball.current.setLinvel({x:0,y:0,z:0});
        ball.current.setAngvel({x:0,y:0,z:0});
    }

   const jump=() =>{
    // console.log("jump");
    const origin = ball.current.translation()
    origin.y -= 0.3
    const direction = {x:0,y:-1,z:0}
    const ray = new rapier.Ray(origin,direction)
    const hit = rapierWorld.castRay(ray)
    // console.log(hit.toi);
    if(hit.toi<0.2){ball.current.applyImpulse({x:0,y:0.5,z:0})}
    if(hit.toi === null){reset()}
   
   }

   useEffect(()=>{

    const unsubscribeReset = useGame.subscribe(
                    (state)=>state.phase,
                        (phase)=>{
                            if(phase === "ready"){
                                reset()
                            }
                        })

    const unsubscribeKeys =  subscribeKeys((state)=>state.jump,
    (value)=>{
        if(value){
            jump()
        }
    },
) 
    const unsubscribeAny =  subscribeKeys(
    ()=>   start()
) 
return ()=>{
    unsubscribeKeys()
    unsubscribeAny()
    unsubscribeReset()
}  
},[])



    useFrame((state, delta)=>{

        //Controls
        const {forward, backward, leftMove, rightMove} = getKeys();

        const impulse = {x:0,y:0,z:0}
        const torqueImpulse = {x:0,y:0,z:0}

        const impulseStrength = 0.6 * delta
        const torqueStrength = 0.2 * delta

        
        if(forward){
            impulse.z -= impulseStrength
            torqueImpulse.x -= torqueStrength
        }

        if(backward){
            impulse.z += impulseStrength
            torqueImpulse.x += torqueStrength
        }
        if(rightMove){
            impulse.x += impulseStrength
            torqueImpulse.z -= torqueStrength
        }
        if(leftMove){
            impulse.x -= impulseStrength
            torqueImpulse.z+= torqueStrength
        }
        
        ball.current.applyImpulse(impulse);
        ball.current.applyTorqueImpulse(torqueImpulse);

        // Camera
        const ballPosition = ball.current.translation()
        const cameraPosition = new THREE.Vector3();
        cameraPosition.copy(ballPosition)
        cameraPosition.z+=3
        cameraPosition.y+=0.65

        const cameraTarget = new THREE.Vector3();
        cameraTarget.copy(ballPosition);
        cameraTarget.y+=0.25

        smoothedCameraPosition.lerp(cameraPosition,5 * delta)
        smoothedCameraTarget.lerp(cameraTarget,5 * delta)
    
        state.camera.position.copy(smoothedCameraPosition)
        state.camera.lookAt(smoothedCameraTarget)


        if(ballPosition.z < -(blocksCount*4 + 2)){
            end()
        }

        if(ballPosition.y < -2){
            restart()
        }
    })
    return <RigidBody ref={ball} colliders="ball" position={[0,1,0] } friction={1} restitution={[0.25]} linearDamping={0.5} angularDamping={0.5}>
        <mesh castShadow>
            <icosahedronGeometry args={[0.3,2]}/>
            <meshStandardMaterial flatShading color="mediumpurple" toneMapped={true} />
        </mesh>
        </RigidBody>
    
}