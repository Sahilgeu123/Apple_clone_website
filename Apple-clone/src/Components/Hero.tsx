import React, { useEffect, useRef } from "react";

const Hero = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) videoRef.current.playbackRate = 2;
  }, []);

  return (
    <section className="h-fit lg:h-[80vh] col-center mt-40 lg:mt-20 2xl:mt-[7vh]">
      <div className="relative z-10 col-center lg:translate-y-16">
        <h1 className="font-semibold lg:text-3xl 2xl:text-5xl text-white">
          MacBook Pro
        </h1>
        <img
          className="container mx-auto w-2/3"
          src="title.png"
          alt="MacBook Pro Title"
        />
      </div>
      <video
        className="mx-auto lg:translate-y-5 2xl:translate-y-0"
        src="/videos/hero.mp4"
        autoPlay
        muted
        playsInline
        ref={videoRef}
      />
      <button>Buy</button>
      <p>From $1599 or $133/mo. for 12 months</p>
    </section>
  );
};

export default Hero;
