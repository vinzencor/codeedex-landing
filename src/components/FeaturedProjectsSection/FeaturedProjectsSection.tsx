import { useState } from "react";

const services = [
  "Logo Branding",
  "Package Designing",
  "Graphic Designing",
  "Brand Consulting",
  "Explainer Videos",
];

const serviceImages: Record<string, string> = {
  "Logo Branding": "/logo-branding.png",
  "Package Designing": "/package-designing.png",
  "Graphic Designing": "/graphic-designing.png",
  "Brand Consulting": "/brand-consulting.png",
  "Explainer Videos": "/explainer-videos.png",
};

export const FeaturedProjectsSection = () => {
  const [selectedService, setSelectedService] = useState("Logo Branding");

  return (
    <section
      aria-labelledby="featured-projects-branding-title"
      className="absolute top-[4995px] left-[52px] h-[640px] w-[1280px] overflow-hidden rounded-[42px] bg-white"
    >
      <div className="absolute left-[52px] top-[41px] flex h-[127px] w-[calc(100%_-_723px)] flex-col gap-[34px]">
        <div className="relative mr-[418px] max-h-10 flex-1">
          <div
            aria-hidden="true"
            className="absolute left-0 top-0 h-10 w-[calc(100%_-_2px)] rounded-[19.64px] border-[0.73px] border-solid border-[#e3e3e3]"
          />
          <div className="absolute left-[17px] top-[3px] flex h-[34px] w-[calc(100%_-_37px)] items-center [font-family:'Poppins-Regular',Helvetica] text-sm font-normal leading-[33.8px] tracking-[0.14px] text-black">
            Our services
          </div>
        </div>
        <h2
          id="featured-projects-branding-title"
          className="mr-0.5 flex max-h-[53px] flex-1 items-center [font-family:'Gilroy-Medium',Helvetica] text-[50px] font-medium leading-[52.6px] tracking-[1.00px] text-black"
        >
          Branding
        </h2>
      </div>
      <img
        className="absolute left-[698px] top-[41px] h-[558px] w-px object-cover"
        alt=""
        aria-hidden="true"
        src="/line-1.svg"
      />

      {/* Render all images overlapping each other, crossfading and scaling dynamically */}
      <div className="absolute left-[52px] top-[195px] h-[404px] w-[611px] rounded-[24px] overflow-hidden bg-slate-50">
        {services.map((service) => (
          <img
            key={service}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              selectedService === service
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4 pointer-events-none"
            }`}
            alt={`${service} project preview`}
            src={serviceImages[service]}
          />
        ))}
      </div>

      <ul className="absolute left-[751px] top-[98px] flex w-[calc(100%_-_814px)] flex-col items-start gap-[16px]">
        {services.map((service, index) => {
          const isLast = index === services.length - 1;
          const isActive = selectedService === service;

          return (
            <li
              key={service}
              onClick={() => setSelectedService(service)}
              className={`relative flex w-full items-center justify-between px-2 py-4 cursor-pointer select-none border-b border-transparent transition-all duration-300 group ${
                !isLast ? "border-b [border-bottom-style:solid] border-slate-200" : ""
              }`}
            >
              <span
                className={`relative flex items-center transition-all duration-300 ${
                  isLast ? "self-stretch" : "w-fit whitespace-nowrap"
                } ${
                  isActive
                    ? "[font-family:'Gilroy-Medium',Helvetica] font-medium text-black translate-x-2"
                    : "[font-family:'Gilroy-Regular',Helvetica] font-normal text-[#191c1e] opacity-40 group-hover:opacity-85"
                } text-[28px] leading-7 tracking-[0]`}
              >
                {service}
              </span>
              <div
                className={`w-8 h-8 flex items-center justify-center rounded-full bg-black text-white text-sm transition-all duration-300 shadow-[0px_4px_12px_rgba(0,0,0,0.15)] ${
                  isActive
                    ? "opacity-100 scale-100 translate-x-0"
                    : "opacity-0 scale-50 translate-x-4 pointer-events-none"
                }`}
              >
                ➔
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};
