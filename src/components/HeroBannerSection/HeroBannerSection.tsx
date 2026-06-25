import { World } from "../ui/globe";

const navItems = [
  { label: "Our Services", tracking: "tracking-[1.00px]" },
  { label: "Our Works", tracking: "tracking-[3.20px]" },
];

const colors = ["#ffffff", "#cbd5e1", "#e2e8f0", "#94a3b8", "#f8fafc"];
const heroArcs = [
  {
    order: 1,
    startLat: 10.8505,
    startLng: 76.2711,
    endLat: 40.7128,
    endLng: -74.0060,
    arcAlt: 0.4,
    color: colors[0],
  },
  {
    order: 2,
    startLat: 10.8505,
    startLng: 76.2711,
    endLat: 51.5072,
    endLng: -0.1276,
    arcAlt: 0.3,
    color: colors[1],
  },
  {
    order: 3,
    startLat: 10.8505,
    startLng: 76.2711,
    endLat: 1.3521,
    endLng: 103.8198,
    arcAlt: 0.1,
    color: colors[2],
  },
  {
    order: 4,
    startLat: 10.8505,
    startLng: 76.2711,
    endLat: 25.2048,
    endLng: 55.2708,
    arcAlt: 0.2,
    color: colors[3],
  },
  {
    order: 5,
    startLat: 10.8505,
    startLng: 76.2711,
    endLat: -33.8688,
    endLng: 151.2093,
    arcAlt: 0.4,
    color: colors[4],
  },
  {
    order: 6,
    startLat: 10.8505,
    startLng: 76.2711,
    endLat: 35.6762,
    endLng: 139.6503,
    arcAlt: 0.3,
    color: colors[0],
  }
];

const globeConfig = {
  pointSize: 1.5,
  globeColor: "#ffffff",
  showAtmosphere: false,
  atmosphereColor: "#ffffff",
  atmosphereAltitude: 0.0,
  emissive: "#000000",
  emissiveIntensity: 0.0,
  shininess: 0.0,
  polygonColor: "rgba(15, 23, 42, 0.85)",
  ambientLight: "#ffffff",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 2000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 2.5,
  initialPosition: { lat: 10.8505, lng: 76.2711 },
  autoRotate: true,
  autoRotateSpeed: 0.8,
  globeOpacity: 0.0,
  cameraZ: 120,
  yOffset: -47,
  hexPolygonMargin: 0.7,
};

export const HeroBannerSection = ({ progress = 0 }: { progress?: number }) => {
  const globeOpacity = Math.max(0, 1 - progress / 0.2);

  return (
    <section
      className="absolute left-0 top-0 h-screen w-full overflow-hidden bg-white"
      aria-labelledby="hero-banner-heading"
    >
      <div className="absolute left-[calc(50.00%_-_720px)] top-0 w-[1440px] h-full">
        <img
          className="absolute left-[772px] top-[97px] h-[731px] w-[668px] aspect-[1.22] pointer-events-none select-none"
          alt=""
          aria-hidden="true"
          src="/transparent-vector-white-cloud-sky-realistic-set-fog-smoke-png-texture-isolated-design-abstract-cloudy-air-effect-with-day-light-icon-collection-3d-beautiful-nature-atmosphere-vapor-smoky-steam-2.png"
        />
        <header className="absolute left-0 top-0 h-[100px] w-[1440px] bg-[#0000001a] shadow-[inset_0px_0px_22px_#f2f2f2,inset_0px_0px_0px_1px_#a6a6a6,inset_-2px_-2px_1px_-2px_#666666,inset_2px_2px_1px_-2px_#666666,inset_3px_3px_0.5px_-3.5px_#ffffff80] backdrop-blur-[6px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(6px)_brightness(100%)]">
          <img
            className="absolute left-[57px] top-[27px] h-[42px] w-20 object-contain"
            alt=""
            aria-hidden="true"
            src="/Group 1.svg"
          />
          <img
            className="absolute left-[104px] top-[31px] h-[41px] w-[166px] aspect-[4.09]"
            alt="Codeedex Technologies"
            src="/logoname.svg"
          />
          <nav
            className="absolute left-[calc(50.00%_-_141px)] top-[calc(50.00%_-_6px)] flex h-3 w-28 items-center gap-12"
            aria-label="Primary navigation"
          >
            {navItems.map((item, index) => (
              <div
                key={item.label}
                className={`inline-flex flex-[0_0_auto] flex-col items-start relative ${
                  index === 0
                    ? "mb-[-6.00px] mt-[-6.00px]"
                    : "mb-[-6.00px] mr-[-141.00px] mt-[-6.00px]"
                }`}
              >
                <button
                  type="button"
                  className={`relative mt-[-1.00px] flex w-fit items-center whitespace-nowrap [font-family:'Gilroy-Medium',Helvetica] text-base font-medium leading-6 text-[#000000cc] cursor-pointer ${item.tracking}`}
                >
                  {item.label}
                </button>
              </div>
            ))}
          </nav>
          <button
            type="button"
            aria-label="Lets Connect"
            className="box-border inline-flex absolute left-[1172px] top-[calc(50.00%_-_25px)] flex-col items-center justify-center rounded-full bg-[#030303] px-8 py-3 cursor-pointer"
          >
            <span
              className="absolute left-0 top-0 h-full w-full rounded-full bg-[#ffffff01]"
              aria-hidden="true"
            />
            <span className="relative mt-[-1.00px] flex w-fit items-center justify-center whitespace-nowrap [font-family:'Gilroy-Medium',Helvetica] text-center text-base font-medium leading-6 tracking-[1.60px] text-white">
              Lets Connect
            </span>
          </button>
        </header>
        <h1
          id="hero-banner-heading"
          className="absolute left-[183px] top-[196px] flex h-[226px] w-[1081px] items-center justify-center text-center [font-family:'Outfit-ExtraBold',Helvetica] text-[72px] font-extrabold leading-[88px] tracking-[1.73px] text-black"
        >
          We Build Digital Products for Modern Businesses
        </h1>
        <p className="absolute left-[87px] top-[411px] block w-[1274px] text-center [font-family:'Gilroy-Light',Helvetica] text-lg font-light leading-[35px] tracking-[0.18px] text-transparent">
          <span className="tracking-[0.03px] text-[#7f7f7f]">
            For over 3 years, Codeedex Technologies has been helping businesses
            turn ideas into impactful digital products. Based in Perinthalmanna,
            Kerala, we{" "}
          </span>
          <span className="tracking-[0.03px] text-[#2d2d2d]">design</span>
          <span className="tracking-[0.03px] text-[#7f7f7f]"> and </span>
          <span className="tracking-[0.03px] text-[#2d2d2d]">
            develop websites
          </span>
          <span className="tracking-[0.03px] text-[#7f7f7f]">, </span>
          <span className="tracking-[0.03px] text-[#2d2d2d]">web apps</span>
          <span className="tracking-[0.03px] text-[#7f7f7f]">, and</span>
          <span className="tracking-[0.03px] text-[#2d2d2d]">
            {" "}
            mobile applications
          </span>
          <span className="tracking-[0.03px] text-[#7f7f7f]">
            {" "}
            that help brands grow and succeed online.
          </span>
        </p>
        <img
          className="absolute left-0 top-[141px] h-[454px] w-[497px] aspect-[1.22] pointer-events-none select-none"
          alt=""
          aria-hidden="true"
          src="/transparent-vector-white-cloud-sky-realistic-set-fog-smoke-png-texture-isolated-design-abstract-cloudy-air-effect-with-day-light-icon-collection-3d-beautiful-nature-atmosphere-vapor-smoky-steam-1.png"
        />
        <div 
          className="absolute left-[58px] bottom-0 h-[496px] w-[1318px] overflow-hidden select-none transition-opacity duration-75"
          style={{ opacity: globeOpacity }}
        >
          <World data={heroArcs} globeConfig={globeConfig} progress={progress} />
        </div>
      </div>
    </section>
  );
};
