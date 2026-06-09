//14 & 16 -presentation control
import * as THREE from "three";
import { PresentationControls } from "@react-three/drei";
import {  useRef } from "react";
import Macbook16Model from "../models/Macbook-16";
import Macbook14Model from "../models/Macbook-14";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const FadeMeshes = (group: THREE.Object3D | null | undefined, opacity: number) => {
  if (!group) return;
  group.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {

      const mesh = child as THREE.Mesh;

      const material = mesh.material as THREE.Material;
      material.transparent = true;
      material.blending = THREE.NormalBlending;

      gsap.to(material, {
        opacity,
        duration: ANIMATION_DURATION,
      });
    }
  });
};


const moveGroup = (group: THREE.Group | null, x: number) => {
  if (!group) return;
  gsap.to(group.position, { x, duration: ANIMATION_DURATION, });
};

type ModelSwitcherProps = {
  scale: number;
  isMobile: boolean;
};

const ModelSwitcher = ({ scale, isMobile }: ModelSwitcherProps) => {
  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;

  const smallMacbookRef = useRef<THREE.Group | null>(null);
  const largeMacbookRef = useRef<THREE.Group | null>(null);

  const showLargeMac = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;
  
  useGSAP(() => {
    if (showLargeMac) {
      moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
      moveGroup(largeMacbookRef.current, 0);

      FadeMeshes(smallMacbookRef.current, 0);
      FadeMeshes(largeMacbookRef.current, 1);
    } else {
      moveGroup(smallMacbookRef.current, 0);
      moveGroup(largeMacbookRef.current, -OFFSET_DISTANCE);

      FadeMeshes(smallMacbookRef.current, 1);
      FadeMeshes(largeMacbookRef.current, 0);
    }
  }, [showLargeMac]);

  const controlConfig = {
    snap: true,
    speed: 1,
    zoom: 1,
    azimuth: [-Infinity, Infinity] as [number, number],
    config: { mass: 1, tension: 0, friction: 26 },
  };

  return (
    <>
      <PresentationControls {...controlConfig}>
        <group ref={smallMacbookRef}>
          <Macbook14Model scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>
      <PresentationControls {...controlConfig}>
        <group ref={largeMacbookRef}>
          <Macbook16Model scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
