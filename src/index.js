import React from 'react';
import ReactDOM from 'react-dom/client';
import { Canvas } from '@react-three/fiber';
import Experience from './Components/Experience.js';
import { KeyboardControls } from '@react-three/drei';
import Interface from './Components/Interface.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <KeyboardControls
    map={[
          {name:"forward" ,keys:["ArrowUp","KeyW"]},
          {name:"backward" ,keys:["ArrowDown","KeyS"]}, 
          {name:"leftMove" ,keys:["ArrowLeft","KeyA"]},
          {name:"rightMove" ,keys:["ArrowRight","KeyD"]},
          {name:"jump" ,keys:["Space"]}]}
  >

    <Canvas camera={{
        fov:45,
        near:0.1,
        far:200,
        position:[-4,3,10]
    }}
    shadows={true}>
      <Experience />
    </Canvas>
    <Interface />
    </KeyboardControls>
  
);


    
        