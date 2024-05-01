import { Float, useGLTF, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { CuboidCollider, RigidBody } from "@react-three/rapier";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";
THREE.ColorManagement.legacyMode = false;  //Since the material is given out of R3F,the color encoding of Three and R3F will be confused so we are not getting proper color,to get proper color we are using this

const boxGeometry = new THREE.BoxGeometry(1,1,1);
const floor1Material = new THREE.MeshStandardMaterial({color:"#11111",metalness:0,roughness:0})
const floor2Material = new THREE.MeshStandardMaterial({color:"#222222",metalness:0,roughness:0})
const obstacleMaterial = new THREE.MeshStandardMaterial({color:"#ff0000",metalness:0,roughness:1})
const wallMaterial = new THREE.MeshStandardMaterial({color:"#887777",metalness:0,roughness:0})

export function BlockStart({position=[0,0,0]}){
    
    return <>
    <group position={position}>
        <mesh geometry={boxGeometry} material={floor1Material} scale={[4,0.2,4]} receiveShadow position={[0,-0.1,0]} />
        {/* <boxGeometry args={[4,0.2,4]} /> */}
        {/* <meshBasicMaterial color="limegreen" /> */}
        <Float floatIntensity={1.3}>
            <Text
                font="public/bebas-neue-v9-latin-regular.woff" 
                fontSize={0.5} 
                position-y={0.8} 
                position-x={1} 
                maxWidth={2}
                textAlign="center" 
                >
                Marble Race
            <meshToonMaterial color="white"/>
            </Text>
        </Float>
        
    </group>
    </>
}
export function BlockEnd({position=[0,0,0]}){

    const Monkey = useGLTF("Monkey.glb");
    Monkey.scene.children.forEach((mesh)=>{
        mesh.castShadow = true
    })
    return <>
    <group position={position}>
        <mesh geometry={boxGeometry} material={floor1Material} scale={[4,0.35,4]} receiveShadow position={[0,-0.1,0]} />
        <RigidBody type="fixed" colliders="trimesh" friction={0} restitution={0.2}>
        <primitive  object={Monkey.scene}  />
        </RigidBody>
        <Float floatIntensity={1.3}>
            <Text
                font="public/bebas-neue-v9-latin-regular.woff" 
                fontSize={0.5} 
                position-y={2.3} 
                position-x={1} 
                maxWidth={2}
                textAlign="center" 
                >
                FINISH
            <meshToonMaterial color="white"/>
            </Text>
        </Float>
        {/* <boxGeometry args={[4,0.2,4]} /> */}
        {/* <meshBasicMaterial color="limegreen" /> */}
        
    </group>
    </>
}

export function BlockSpinner({position=[0,0,0]}){
    const obstacleref = useRef();
    const [speed] = useState(()=>(Math.random()+0.4) * (Math.random() < 0.5 ? -1 : 1))
    
useFrame((state,delta)=>{
    const time = state.clock.getElapsedTime();
    // obstacleref.current.rotation.y+=delta*5;
    const rotation = new THREE.Quaternion();
    rotation.setFromEuler(new THREE.Euler(0,time * speed,0))
    obstacleref.current.setNextKinematicRotation(rotation)
})
    
    return <>
    <group position={position}>
        <mesh geometry={boxGeometry} material={floor2Material} scale={[4,0.2,4]} receiveShadow position={[0,-0.1,0]} />
        <RigidBody  ref={obstacleref} type="kinematicPosition" restitution={0.2} friction={0} position={[0,0.2,0]}>
        <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[3.3,0.3,0.27]} castShadow receiveShadow />
        </RigidBody>
    </group>
    </>
}

export function BlockLimbo({position=[0,0,0]}){
    const obstacleref = useRef();
    const limboref = useRef();
    const [timeoffset] = useState(()=>Math.random() * Math.PI * 2)
    
useFrame((state,delta)=>{
    const time = state.clock.getElapsedTime();
     
    // obstacleref.current.rotation.y+=delta*5;`),0))
    limboref.current.setNextKinematicTranslation({x:position[0],y:Math.sin(time + timeoffset) + 1.25,z:position[2]})
    
})
    
    return <>
    <group position={position}>
        
        <mesh geometry={boxGeometry} material={floor2Material} scale={[4,0.2,4]} receiveShadow position={[0,-0.1,0]} />
        
        <RigidBody  ref={limboref} type="kinematicPosition" restitution={0.2} friction={0} position={[0,0.2,0]}>
        <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[4,0.5,0.27]} castShadow receiveShadow />
        </RigidBody>
    </group>
    </>
}
export function AxeTrap({position=[0,0,0]}){
    const obstacleref = useRef();
    const limboref = useRef();
    const [timeoffset] = useState(()=>Math.random() * Math.PI * 2)
    
useFrame((state,delta)=>{
    const time = state.clock.getElapsedTime();
     
    // obstacleref.current.rotation.y+=delta*5;`),0))
    limboref.current.setNextKinematicTranslation({x:Math.sin(time+timeoffset) * 1.25,y:position[1]+0.75,z:position[2]})
    
})
    
    return <>
    <group position={position}>
        
        <mesh geometry={boxGeometry} material={floor2Material} scale={[4,0.2,4]} receiveShadow position={[0,-0.1,0]} />
        
        <RigidBody  ref={limboref} type="kinematicPosition" restitution={0.2} friction={0} position={[0,0.2,0]}>
        <mesh geometry={boxGeometry} material={obstacleMaterial} scale={[1.5,1.5,0.15]} castShadow receiveShadow />
        </RigidBody>
    </group>
    </>
}

export function Bounds({length = 1}){

    return <>
    <RigidBody type="fixed" restitution={0.2} friction={0}>
        <mesh geometry={boxGeometry} material={wallMaterial} position={[2.15,0.5,(length*-2)+2]} scale={[0.3,1.5,(length*4)]} castShadow receiveShadow /> 
        <mesh geometry={boxGeometry} material={wallMaterial} position={[-2.15,0.5,(length*-2)+2]} scale={[0.3,1.5,(length*4)]} receiveShadow/>
        <mesh geometry={boxGeometry} material={wallMaterial} position={[0,0.78,(length*-4)+2]} scale={[4,1.5,0.18]} />
        </RigidBody>
        <CuboidCollider args={[1,1,1]} scale={[2,0.1,(length*2)]} position={[0,-0.1,(length*-2)+2]} restitution={0.2} friction={1}/>
    </>
}
//Dont give the scale as 0 , then there will be no height and depth and length so the object will be displayed as black

export function Levels({trapCount = 7, types = [BlockLimbo,BlockSpinner,AxeTrap], randomBlock = 0}){
    const blocks = useMemo(()=>{
        const blocks = []
        for(let i = 0;i < trapCount; i++){
            const type = types[Math.floor(Math.random() * types.length)]
            blocks.push(type)
        }
        return blocks;
    },[types,trapCount,randomBlock])

    // console.log(blocks);
    return <>

      <BlockStart position={[0,0,0]}/>
      {blocks.map((Block, index)=><Block key={index} position={[0,0,-(index+1)*4]} />)}
      <BlockEnd position={[0,0,-(trapCount + 1) * 4]} />
      <Bounds length ={trapCount + 2}  />
      
    </>
}

{/* <mesh receiveShadow={true} rotation={[-Math.PI/2,0,0]} position={[0,-1,0]}>
            <planeGeometry args={[15,15]} />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <mesh castShadow={true} position={[-2,0,0]}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow position={[2,0.01,0]}>
        <boxGeometry args={[2,2,2]}/>
        <meshStandardMaterial color="mediumpurple" />
      </mesh> */}

{/* <BlockSpinner position={[0,0,12]}/>
      <BlockLimbo position={[0,0,8]} />
      <AxeTrap position={[0,0,4]} />
      <BlockEnd position={[0,0,0]} /> */}