import { useKeyboardControls } from "@react-three/drei"
import React, { useEffect, useRef } from "react"
import useGame from "../store/useGame";
import { addEffect } from "@react-three/fiber";


export default function Interface(){
    const restart = useGame((state)=>state.restart)
    const phase = useGame((state)=>state.phase)

    const time = useRef()

    const forward = useKeyboardControls((state)=>state.forward)
    const backward = useKeyboardControls((state)=>state.backward)
    const leftMove = useKeyboardControls((state)=>state.leftMove)
    const rightMove = useKeyboardControls((state)=>state.rightMove)
    const jump = useKeyboardControls((state)=>state.jump)

    useEffect(()=>{
      const unsubscribeEffect =   addEffect(()=>{
            const state = useGame.getState();
            
                let elapsedTime = 0;
            
            if(state.phase=="playing"){
                    elapsedTime = Date.now() - state.startTime 
            }

            else if(state.phase == "ended"){
                elapsedTime = state.endTime - state.startTime
            }

            elapsedTime /= 1000
            elapsedTime = elapsedTime.toFixed(2)

            if(time.current){
                time.current.textContent = elapsedTime
            }
        })
        return () => unsubscribeEffect()
    },[])
    return <div className="interface">
        <div ref={time} className="time">0.00</div>
        {phase == "ended" &&<div className="restart" onClick={restart}>RESTART</div>}
        <div className="controls">
            <div className="raw">
                <div className={`key ${forward ? "active" :  " "}`}></div>
            </div>
            <div className="raw">
                <div className={`key ${leftMove ? "active" :  " "}`}></div>
                <div className={`key ${backward ? "active" :  " "}`}></div>
                <div className={`key ${rightMove ? "active" :  " "}`}></div>
            </div>
            <div className="raw">
                <div className={`key large ${jump ?"active" : " "}`}></div>
            </div>
        </div>
    </div>
}