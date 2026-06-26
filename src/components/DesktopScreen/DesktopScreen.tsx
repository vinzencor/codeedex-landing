import { useRef, useState, useEffect } from "react";
import { BrandStorySection } from "../BrandStorySection/BrandStorySection";
import { CTAWithContactSection } from "../CTAWithContactSection/CTAWithContactSection";
import { CustomerQuotesSection } from "../CustomerQuotesSection/CustomerQuotesSection";
import { DesignServicesSection } from "../DesignServicesSection/DesignServicesSection";
import { FeaturedProjectsSection } from "../FeaturedProjectsSection/FeaturedProjectsSection";
import { HeroBannerSection } from "../HeroBannerSection/HeroBannerSection";
import { ImpactMetricsSection } from "../ImpactMetricsSection/ImpactMetricsSection";
import { World } from "../ui/globe";
import { useScrollProgress } from "../../hooks/use-scroll-progress";
import { ScrollTransitionGlobeParticle } from "../ui/scroll-transition-globe-particle";
import { Navbar } from "../Navbar/Navbar";

const colors = ["#ffffff", "#cbd5e1", "#e2e8f0", "#94a3b8", "#f8fafc"];
const introArcs = [
  { order: 1, startLat: 37.7749, startLng: -122.4194, endLat: 51.5072, endLng: -0.1276, arcAlt: 0.3, color: colors[0] },
  { order: 2, startLat: 51.5072, startLng: -0.1276, endLat: 35.6762, endLng: 139.6503, arcAlt: 0.3, color: colors[1] },
  { order: 3, startLat: 35.6762, startLng: 139.6503, endLat: -33.8688, endLng: 151.2093, arcAlt: 0.4, color: colors[2] },
  { order: 4, startLat: -33.8688, startLng: 151.2093, endLat: 40.7128, endLng: -74.0060, arcAlt: 0.4, color: colors[3] },
  { order: 5, startLat: 12.9716, startLng: 77.5946, endLat: 37.7749, endLng: -122.4194, arcAlt: 0.5, color: colors[4] },
  { order: 6, startLat: 10.8505, startLng: 76.2711, endLat: 50.1109, endLng: 8.6821, arcAlt: 0.3, color: colors[0] },
];

const introGlobeConfig = {
  pointSize: 1.5,
  globeColor: "#050505",
  showAtmosphere: false,
  atmosphereColor: "#ffffff",
  atmosphereAltitude: 0.0,
  emissive: "#000000",
  emissiveIntensity: 0.0,
  shininess: 0.9,
  polygonColor: "#ffffff",
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 2500,
  arcLength: 0.85,
  rings: 1,
  maxRings: 2.5,
  initialPosition: { lat: 20, lng: 0 },
  autoRotate: true,
  autoRotateSpeed: 1.2,
  globeOpacity: 0.85,
  cameraZ: 420,
  hexPolygonMargin: 0.7,
};

export const DesktopScreen = () => {
  const section2Ref = useRef<HTMLElement | null>(null);
  const progress = useScrollProgress(section2Ref);

  const introText = "At Codeedex Technologies, we believe every business deserves a digital presence that inspires trust, drives growth, and creates lasting connections. We're here to design, build and market it.";

  // Globe mouse tilt
  const [globeTilt, setGlobeTilt] = useState({ x: 0, y: 0 });

  // Blast animation trigger — fires once when text becomes visible
  const [blastTriggered, setBlastTriggered] = useState(false);

  useEffect(() => {
    if (progress >= 0.35 && !blastTriggered) {
      setBlastTriggered(true);
    } else if (progress < 0.1) {
      setBlastTriggered(false);
    }
  }, [progress, blastTriggered]);

  const handleSectionMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const dx = (e.clientX - rect.left - cx) / cx;
    const dy = (e.clientY - rect.top - cy) / cy;
    setGlobeTilt({ x: dx * 14, y: dy * -10 });
  };

  const handleSectionMouseLeave = () => {
    setGlobeTilt({ x: 0, y: 0 });
  };

  // Text / globe opacity
  const rawTextOpacity =
    progress < 0.35
      ? 0
      : progress < 0.5
      ? (progress - 0.35) / 0.15
      : progress < 0.75
      ? 1
      : progress < 0.95
      ? 1 - (progress - 0.75) / 0.2
      : 0;

  const [scale, setScale] = useState(1);
  const textOpacity = scale < 1 ? 1 : rawTextOpacity;
  const introGlobeOpacity = scale < 1 ? 0.85 : rawTextOpacity * 0.6;

  useEffect(() => {
    const handleResize = () => {
      setScale(window.innerWidth < 1440 ? window.innerWidth / 1440 : 1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Blast keyframe */}
      <style>{`
        @keyframes charBlast {
          0%   { opacity: 0; transform: translate3d(0, 0, 0) scale(2.2); filter: blur(8px); }
          55%  { filter: blur(0px); }
          100% { opacity: 1; transform: translate3d(0, 0, 0) scale(1); filter: blur(0px); }
        }
      `}</style>

      <div className="w-full flex justify-center overflow-hidden bg-[#f3f3f3]" style={{ height: `${6700 * scale}px` }}>
        <Navbar />
        <main
          className="bg-[#f3f3f3] h-[6700px] relative overflow-hidden shrink-0"
          style={{
            width: scale < 1 ? "1440px" : "100%",
            transform: `scale(${scale})`,
            transformOrigin: "top center",
          }}
        >
          <h1 className="sr-only">Codeedex Technologies</h1>

          <section aria-label="Hero banner">
            <HeroBannerSection progress={progress} scale={scale} />
          </section>

          {/* Particle canvas overlay */}
          <div className="absolute top-0 left-0 w-full h-[1800px] pointer-events-none z-20">
            <ScrollTransitionGlobeParticle
              text={introText}
              progress={progress}
              particleCount={1200}
              particleColor="#ffffff"
              ambientColor="#ffffff"
              rotationSpeed={1.2}
            />
          </div>

          {/* Section 2 — dark intro */}
          <section
            ref={section2Ref}
            aria-label="Introduction"
            className="absolute left-0 w-full bg-[#0b0a0a]"
            style={{ top: "900px", height: "1000px" }}
            onMouseMove={handleSectionMouseMove}
            onMouseLeave={handleSectionMouseLeave}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Globe with mouse tilt */}
              <div
                className="absolute w-[976px] h-[976px] overflow-hidden select-none"
                style={{
                  opacity: introGlobeOpacity,
                  transform: `perspective(1200px) rotateY(${globeTilt.x}deg) rotateX(${globeTilt.y}deg)`,
                  transition: "transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
              >
                <World data={introArcs} globeConfig={introGlobeConfig} progress={progress} />
              </div>

              {/* Text — blast animation, no hover interaction */}
              <div
                className="relative w-[1257px] flex items-center justify-center z-10 pointer-events-none"
                style={{ opacity: textOpacity }}
              >
                <p
                  className="w-full [font-family:'Gilroy-Light',Helvetica] font-light text-white text-[50px] text-center tracking-[0.50px] leading-[57px] select-none flex flex-wrap justify-center items-center"
                  style={{ perspective: "1000px" }}
                >
                  {introText.split("").map((char, index) => {
                    if (char === " ") {
                      return (
                        <span key={index} className="inline-block w-[12px]">
                          &nbsp;
                        </span>
                      );
                    }
                    return (
                      <span
                        key={index}
                        className="inline-block"
                        style={
                          blastTriggered
                            ? {
                                animation: `charBlast 0.75s cubic-bezier(0.22, 1, 0.36, 1) ${Math.min(index * 0.006, 0.28)}s both`,
                              }
                            : { opacity: 0 }
                        }
                      >
                        {char}
                      </span>
                    );
                  })}
                </p>
              </div>
            </div>
          </section>

          <section id="design-services" aria-label="Design services">
            <DesignServicesSection />
          </section>
          <section aria-label="Brand story">
            <BrandStorySection />
          </section>

          <section aria-label="Featured works intro" className="absolute left-0 top-0 w-full h-full pointer-events-none">
            <div className="absolute left-[calc(50.00%_-_720px)] top-0 w-[1440px] h-full pointer-events-none">
              <div className="absolute w-[calc(100%_-_1325px)] top-[3817px] left-[79px] h-10 pointer-events-auto">
                <div className="absolute w-[calc(100%_-_2px)] top-0 left-0 h-10 rounded-[19.64px] border-[0.73px] border-solid border-[#e3e3e3]" />
                <div className="absolute w-[calc(100%_-_26px)] top-[3px] left-3 h-[34px] flex items-center [font-family:'Poppins-Regular',Helvetica] font-normal text-black text-sm tracking-[0.14px] leading-[33.8px]">
                  CaseStudies
                </div>
              </div>
              <p className="absolute w-[calc(100%_-_870px)] top-[3800px] left-[782px] h-[49px] flex items-center [font-family:'Poppins-Regular',Helvetica] font-normal text-[#7f7f7f] text-sm tracking-[0.14px] leading-[22px]">
                Explore the digital products, websites, and applications we&apos;ve crafted to help businesses grow and innovate.
              </p>
              <h2 className="absolute w-[calc(100%_-_981px)] top-[3876px] left-[83px] h-[53px] flex items-center [font-family:'Gilroy-Light-☞',Helvetica] font-normal text-black text-5xl tracking-[0.96px] leading-[52.6px] whitespace-nowrap">
                Our Featured Works
              </h2>
              <a
                href="#our-works"
                className="absolute w-[calc(100%_-_1337px)] top-[3929px] left-[89px] h-[49px] flex items-center [font-family:'Poppins-Regular',Helvetica] font-normal text-black text-sm tracking-[0.14px] leading-[22px] pointer-events-auto"
              >
                All Works
              </a>
              <div className="absolute top-[3945px] left-[162px] w-[18px] h-[18px] flex rotate-[-90.00deg] aspect-[1] pointer-events-auto" aria-hidden="true">
                <img className="flex-1 w-[13.5px] rotate-[90.00deg]" alt="" src="/image.svg" />
              </div>
            </div>
          </section>

          <section aria-label="Customer quotes" className="absolute left-0 top-0 w-full h-full pointer-events-none">
            <div className="absolute left-[calc(50.00%_-_720px)] top-0 w-[1440px] h-full pointer-events-none">
              <div className="pointer-events-auto">
                <CustomerQuotesSection />
              </div>
            </div>
          </section>

          <section id="featured-projects" aria-label="Featured projects" className="absolute left-0 top-0 w-full h-full pointer-events-none">
            <div className="absolute left-[calc(50.00%_-_720px)] top-0 w-[1440px] h-full pointer-events-none">
              <div className="pointer-events-auto">
                <FeaturedProjectsSection />
              </div>
            </div>
          </section>

          <section id="footer-area" aria-label="Footer area" className="absolute left-0 top-0 w-full h-full pointer-events-none">
            <div className="absolute left-[calc(50.00%_-_720px)] top-0 w-[1440px] h-full pointer-events-none">
              <aside className="absolute h-[calc(100%_-_6294px)] top-[6236px] left-[92px] w-[326px] flex flex-col justify-between rounded-[32.63px] shadow-[0px_2px_4.08px_#00000040] bg-[linear-gradient(139deg,rgba(32,76,147,1)_0%,rgba(30,105,210,1)_50%,rgba(54,152,230,1)_100%)] pointer-events-auto">
                <img className="ml-[32.6px] w-[107.2px] h-[35.65px] mt-[40.8px] aspect-[3.01]" alt="Codeedex logo" src="/image-removebg-preview-1.png" />
                <div className="ml-[32.6px] mr-[32.6px] flex-1 max-h-[288.51px] mb-[32.6px] h-[288.51px] flex items-end">
                  <div className="mb-0 h-[189.67px] ml-0 mr-0 flex-1 flex flex-col gap-[37.9px]">
                    <p className="block ml-[3.1px] mt-[24.5px] [font-family:'Poppins-SemiBold',Helvetica] font-normal text-white text-[18.4px] tracking-[0] leading-[30.6px]">
                      <span className="font-semibold">Designing tomorrow&apos;s </span>
                      <span className="[font-family:'Poppins-Light',Helvetica] font-light">digital experiences.</span>
                    </p>
                    <div className="flex ml-0 mr-0 flex-1 max-h-[65.26px] relative w-[261.05px] h-[65.26px] items-center gap-[58.13px]">
                      <div className="relative flex items-center w-[131.55px] [font-family:'Caveat-Regular',Helvetica] font-normal text-[#fdfdfd] text-[22.4px] tracking-[0] leading-[32.6px]">
                        Stay in touch!
                      </div>
                      <img className="relative flex-[0_0_auto]" alt="" src="/container.svg" />
                    </div>
                  </div>
                </div>
              </aside>
              <div className="pointer-events-auto">
                <CTAWithContactSection />
              </div>
            </div>
          </section>

          <section aria-label="Impact metrics">
            <ImpactMetricsSection />
          </section>
        </main>
      </div>
    </>
  );
};
