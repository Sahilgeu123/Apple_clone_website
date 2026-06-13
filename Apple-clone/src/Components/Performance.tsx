import { useRef } from "react"
import { performanceImages, performanceImgPositions } from "../constants"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import "./Performance.css"

gsap.registerPlugin(ScrollTrigger)

const Performance = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useGSAP(() => {
    const section = sectionRef.current
    if (!section) return

    // Text animation
    gsap.to(".content p", {
      scrollTrigger: {
        trigger: section,
        start: "top center",
        end: "center center",
        scrub: 0.5,
      },
      opacity: 1,
      y: 0,
      duration: 1,
      ease: "power2.out",
    })

    // Image timeline only on desktop
    const mm = gsap.matchMedia()

    mm.add("(min-width: 1025px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        },
      })

      performanceImgPositions.forEach((position) => {
        if (position.id === "p5") return

        const imgElement = section.querySelector(`.${position.id}`) as HTMLImageElement | null
        if (!imgElement) return

        const toVars: Record<string, unknown> = {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
        }

        if (position.left !== undefined) toVars.left = `${position.left}%`
        if (position.right !== undefined) toVars.right = `${position.right}%`
        if (position.bottom !== undefined) toVars.bottom = `${position.bottom}%`

        // Animate each image from hidden state
        tl.fromTo(
          imgElement,
          {
            opacity: 0,
            y: 60,
          },
          toVars,
          0
        )
      })

      return () => {
        tl.kill()
      }
    })

    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener("resize", handleResize)

    return () => {
      mm.revert()
      window.removeEventListener("resize", handleResize)
    }
  }, { scope: sectionRef })

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>
      <div className="wrapper">
        {performanceImages.map(({ id, src }) => (
          <img key={id} className={id} src={src} alt={id} />
        ))}
      </div>
      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. 
          The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing engine that renders images faster, 
          <span className="text-white">so gaming feels more immersive and realistic than ever.</span>
          And Dynamic Caching optimizes fast on-chip memory to dramatically increase average GPU utilization — driving a huge performance boost for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  )
}

export default Performance
