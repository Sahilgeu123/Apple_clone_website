import type { ComponentType } from "react";
import { useMediaQuery } from "react-responsive";
import "./product-viewer.css";
import { Canvas } from "@react-three/fiber";
import clsx from "clsx";
import useMacbookStore from "../store/index.tsx";
import StudioLights from "./three/StudioLights.tsx";
import ModelSwitcher from "./three/ModelSwitcher.tsx";

const TypedModelSwitcher = ModelSwitcher as ComponentType<{
  scale: number;
  isMobile: boolean;
}>;

const ProductViewer = () => {
  const { color, scale, setColor, setScale, reset } = useMacbookStore();

  const isMobile = useMediaQuery({ query: "(max-width:1024px)" });

  return (
    <section className="container relative min-h-[93vh] mx-auto px-5 2xl:px-0 mt-40">
      <h2 className="text-white font-semibold text-3xl lg:text-5xl">
        Take a closer look.
      </h2> 
      <div className="absolute z-50 bottom-40 lg:bottom-40 2xl:bottom-52 left-1/2 -translate-x-1/2">
       
        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div
              onClick={() => setColor("#a9a9a9")}
              className={clsx("bg-neutral-300", color == "#adb5db" && "active")}
            />
            <div
              onClick={() => setColor("#2e2c2e")}
              className={clsx("bg-neutral-900", color == "#2e2c2e" && "active")}
            />
          </div>
          <div className="size-control">
            <div
              onClick={() => setScale(0.06)}
              className={clsx(
                scale === 0.06
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
            >
              <p className="pt-[2px] pl-[2px]">14"</p>
            </div>
            <div
              onClick={() => setScale(0.08)}
              className={clsx(
                scale === 0.08
                  ? "bg-white text-black"
                  : "bg-transparent text-white",
              )}
            >
              <p className="pt-[2px] pl-[2px]">16"</p>
            </div>
          </div>
        </div>
      </div>
      <Canvas
        className=" !w-full !h-[80vh] lg:!h-dvh relative z-40"
        camera={{ position: [1, 2, 5], fov: 50, near: 0.1, far: 100 }}
      >
        <StudioLights />
        <TypedModelSwitcher
          scale={isMobile ? scale - 0.03 : scale}
          isMobile={isMobile}
        />
      </Canvas>
    </section>
  );
};

export default ProductViewer;
