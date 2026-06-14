import { Canvas } from '@react-three/fiber'
import { Suspense, useEffect, useRef } from 'react'
import type { Group } from 'three'
import StudioLights from './three/StudioLights'
import { features, featureSequence } from '../constants'
import clsx from 'clsx'
import { Html } from '@react-three/drei'
import MacbookModel from './models/Macbook'
import { useMediaQuery } from 'react-responsive'
import useMacbookStore from '../store'
import { useGSAP } from "@gsap/react";
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)
import './Showcase.css'
import './features.css'

const ModelScroll=()=>{
  const groupRef=useRef<Group>(null);
  const videoRefs=useRef<HTMLVideoElement[]>([]);
  const isMobile = useMediaQuery({query:'(max-width: 1024px)'})
  const {setTexture} =useMacbookStore();

  useEffect(()=>{
    videoRefs.current=[];

    featureSequence.forEach((feature)=>{
      const v = document.createElement('video');

      Object.assign(v,{
        src:feature.videoPath,
        muted:true,
        playsInline:true,
        preload:'auto',
        crossOrigin:'anonymous',
      });

      v.load()
      videoRefs.current.push(v)
    })
  }, [])


  useGSAP(()=>{
    const modelTimeline = gsap.timeline({
      scrollTrigger:{
        trigger: '.canvas',
        start:'top top',
        end:'bottom top',
        scrub:1,
        pin:true,
      }
    });

    const timeline = gsap.timeline({
      scrollTrigger:{
        trigger: '.canvas',
        start:'top center',
        end:'bottom top',
        scrub:1,
      }
    })

    if (groupRef.current) {
      modelTimeline.to(groupRef.current.rotation, { y: Math.PI * 2, ease: 'power1.inOut' })
    }

    timeline
    .call(()=>setTexture('/videos/feature-1.mp4'))
    .to('.box1',{opacity:1,y:0,delay:1})
    .call(()=>setTexture('/videos/feature-2.mp4'))
    .to('.box2',{opacity:1,y:0})
    .call(()=>setTexture('/videos/feature-3.mp4'))
    .to('.box3',{opacity:1,y:0})
    .call(()=>setTexture('/videos/feature-4.mp4'))
    .to('.box4',{opacity:1,y:0})
    .call(()=>setTexture('/videos/feature-5.mp4'))
    .to('.box5',{opacity:1,y:0})

  }, []);
  return(
    <group ref={groupRef}>
      <Suspense fallback={<Html><h1 className='text-white text-3xl uppercase'>Loading...</h1></Html>}>
      <MacbookModel scale={isMobile?0.05 : 0.08}  position={[0,-1,0]}/>
      </Suspense>
    </group>
  )
}

const Features = () => {
  return (
    <section id='features'>
      <h2>See it all in new lights.</h2>
      <Canvas className="canvas !w-full !h-dvh relative z-40" camera={{ position: [0, 0, 5], fov: 50 }}>
        <StudioLights/>
        <ambientLight intensity={0.5}/>
  <directionalLight position={[5, 5, 5]} intensity={1} />
        <ModelScroll/>
      </Canvas>
      <div className='absolute inset-0'>
        {features.map((feature,index)=>(
          <div className={clsx('box',`box${index+1}`,feature.styles)}>
            <img src={feature.icon} alt={feature.highlight}/>
            <p>
              <span className='text-white'>{feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Features