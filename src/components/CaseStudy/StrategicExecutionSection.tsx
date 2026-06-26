import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import image from "./image.svg";

const SPRING = { type: "spring" as const, stiffness: 80, damping: 14 };

const steps = [
  {
    id: "01",
    number: "01",
    title: "Discovery & Research",
    description:
      "Understanding business goals, user needs, and market opportunities to build a strong product foundation.",
    angle: 0,
  },
  {
    id: "02",
    number: "02",
    title: "Wireframing & Prototyping",
    description:
      "Creating low-fidelity blueprints and interactive flow models to map user journeys and validate interactions.",
    angle: 90,
  },
  {
    id: "03",
    number: "03",
    title: "High-Fidelity UI Design",
    description:
      "Crafting beautiful, modern interfaces with custom design systems, rich typography, and consistent assets.",
    angle: 180,
  },
  {
    id: "04",
    number: "04",
    title: "Advanced Development",
    description:
      "Engineering fast, reliable frontend and backend applications utilizing state-of-the-art web technologies.",
    angle: 270,
  },
];

export const StrategicExecutionSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Auto-rotation effect
  useEffect(() => {
    if (!isHovered) {
      timerRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % steps.length);
      }, 4000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  const activeStep = steps[activeIndex];

  return (
    <section
      aria-labelledby="strategic-execution-heading"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="absolute top-[2688px] left-[calc(50.00%_-_612px)] h-[742px] w-[1224px] overflow-hidden rounded-[50px] bg-[#f7f7f7] shadow-[0px_8px_60px_rgba(0,0,0,0.08)] border border-[#ebebeb]"
    >
      {/* Title */}
      <h2
        id="strategic-execution-heading"
        className="absolute top-[73px] left-0 w-full flex h-[72px] items-center justify-center text-center [font-family:'Poppins-SemiBold',Helvetica] text-[42px] font-semibold leading-[72px] tracking-[-1.28px] text-[#0b1c30] z-20"
      >
        Our Strategic Execution
      </h2>

      {/* Rotating Circle Container */}
      <div className="absolute top-[-31px] left-[-498px] h-[804px] w-[804px] z-10">
        <motion.div
          animate={{ rotate: -activeIndex * 90 }}
          transition={SPRING}
          className="relative w-full h-full rounded-full border border-solid border-gray-300 flex items-center justify-center"
        >
          {/* Numbers placed along the perimeter of the circle */}
          {steps.map((step, index) => {
            // Translate the angle into x, y coordinates along the border
            const radian = (step.angle * Math.PI) / 180;
            // Radius of the perfect circle (w/2 = 402)
            const r = 402;
            const x = r * Math.cos(radian);
            const y = r * Math.sin(radian);

            const isActive = index === activeIndex;

            return (
              <motion.div
                key={step.id}
                style={{
                  position: "absolute",
                  left: `calc(50% + ${x}px - 28px)`,
                  top: `calc(50% + ${y}px - 28px)`,
                }}
                animate={{ rotate: activeIndex * 90 }}
                transition={SPRING}
                className="w-14 h-14 flex items-center justify-center"
              >
                {isActive ? (
                  <div className="flex h-12 w-[49px] items-center justify-center rounded-full bg-[#1f4c92] shadow-lg cursor-pointer">
                    <img
                      className="h-[14.5px] w-[14.5px] invert"
                      alt=""
                      src={image}
                    />
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="relative text-[30px] font-normal italic [font-family:'Plus_Jakarta_Sans-Italic',Helvetica] text-gray-400 opacity-40 hover:opacity-100 hover:scale-110 transition-all cursor-pointer"
                  >
                    {step.id}
                  </button>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Active Step Details (Right Side) */}
      <div className="absolute top-[230px] left-[520px] w-[620px] h-[350px] flex flex-col justify-center z-15">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ ...SPRING, opacity: { duration: 0.25 } }}
            className="flex items-center gap-8"
          >
            {/* Big Italic Number */}
            <div className="[font-family:'Poppins-Italic',Helvetica] text-[110px] font-normal italic leading-none tracking-[-4.53px] text-gray-800/20 select-none">
              {activeStep.number}
            </div>

            {/* Title & Description */}
            <div className="flex flex-col gap-3">
              <h3 className="[font-family:'Poppins-Bold',Helvetica] text-2xl font-bold leading-7 tracking-[0] text-[#0b1c30]">
                {activeStep.title}
              </h3>
              <p className="[font-family:'Plus_Jakarta_Sans-Regular',Helvetica] text-lg font-normal leading-[28px] tracking-[0] text-gray-500 max-w-[480px]">
                {activeStep.description}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Step dots for manual navigation indicator */}
        <div className="flex gap-3 mt-12 pl-[110px]">
          {steps.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex
                  ? "w-8 bg-[#1f4c92]"
                  : "w-2.5 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to step ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
