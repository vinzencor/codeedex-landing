const statCards = [
  {
    type: "clients",
    className:
      "absolute top-[234px] left-[54px] w-[326px] h-[86px] bg-white rounded-[25.94px] overflow-hidden border-[1.08px] border-solid border-[#cccccc]",
    value: "20+",
    label: "Clients partnered",
  },
  {
    type: "projects",
    className:
      "absolute top-[343px] left-[54px] w-[326px] h-[350px] flex flex-col bg-white rounded-[25.94px] overflow-hidden border-[1.08px] border-solid border-[#cccccc]",
    description:
      "Across branding, product design, web, and digital development.",
    image: "/50.svg",
    imageAlt: "50 plus",
    footer: "Projects completed",
  },
  {
    type: "team",
    className:
      "absolute top-[231px] left-[414px] w-[326px] h-[294px] flex flex-col bg-white rounded-[25.94px] overflow-hidden border-[1.08px] border-solid border-[#cccccc]",
    description:
      "Designers, developers, and creatives working closely as one team.",
    image: "/30.svg",
    imageAlt: "30 plus",
    footer: "Team members",
  },
  {
    type: "impressions",
    className:
      "absolute top-[554px] left-[414px] w-[326px] h-[136px] bg-white rounded-[25.94px] overflow-hidden border-[1.08px] border-solid border-[#cccccc]",
    image: "/1m.svg",
    imageAlt: "1 million",
    footer: "Impressions generated",
  },
];

export const DesignServicesSection = () => {
  return (
    <section
      aria-labelledby="design-services-heading"
      className="absolute top-[calc(50.00%_-_409px)] left-[calc(50.00%_-_649px)] w-[1283px] h-[762px] bg-[#090909] rounded-[42px] overflow-hidden"
    >
      <div
        className="absolute w-[calc(100%_-_1158px)] top-[41px] left-[54px] h-10"
        aria-label="Section overview"
      >
        <div className="absolute w-full top-0 left-0 h-10">
          <div className="absolute w-[calc(100%_-_2px)] top-0 left-0 h-10 rounded-[19.64px] border-[0.73px] border-solid border-[#e3e3e3]" />
          <div className="absolute w-[calc(100%_-_37px)] top-[3px] left-[17px] h-[34px] flex items-center [font-family:'Poppins-Regular',Helvetica] font-normal text-black text-sm tracking-[0.14px] leading-[33.8px]">
            What We Do
          </div>
        </div>
        <div className="absolute w-[calc(100%_-_59px)] top-[3px] left-[29px] h-[34px] flex items-center [font-family:'Gilroy-Regular',Helvetica] font-normal text-[#ced0d2] text-sm tracking-[0.14px] leading-[33.8px]">
          Overview
        </div>
      </div>
      <h2
        id="design-services-heading"
        className="absolute w-[calc(100%_-_783px)] top-[105px] left-[54px] h-[106px] [font-family:'Gilroy-Regular',Helvetica] font-normal text-transparent text-5xl tracking-[0.96px] leading-[52.6px]"
      >
        <span className="text-white tracking-[0.46px]">
          A snapshot of our <br />
        </span>
        <span className="text-[#a1a1a1] tracking-[0.46px]">Impact</span>
      </h2>
      {statCards.map((card) => {
        if (card.type === "clients") {
          return (
            <article key={card.type} className={card.className}>
              <p className="absolute w-[calc(100%_-_271px)] top-[15px] left-[155px] h-9 flex items-center bg-[linear-gradient(180deg,rgba(2,2,2,1)_0%,rgba(147,158,170,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Poppins-Medium',Helvetica] font-medium text-transparent text-[28px] tracking-[0.28px] leading-[35.8px] whitespace-nowrap">
                <span className="text-black tracking-[0.08px]">
                  {card.value}
                </span>
                <span className="text-black text-[14.8px] tracking-[0.02px]">
                  {""}
                </span>
              </p>
              <div className="absolute w-[calc(100%_-_202px)] top-11 left-[155px] h-9 flex items-center [font-family:'Poppins-Regular',Helvetica] font-normal text-black text-sm tracking-[0.14px] leading-[35.8px] whitespace-nowrap">
                {card.label}
              </div>
              <div
                className="absolute top-7 left-[62px] w-[27px] h-[27px] bg-[#d9d9d9] rounded-[13.47px] shadow-[0px_8px_17.9px_#00000040]"
                aria-hidden="true"
              />
              <div
                className="absolute top-[25px] left-[98px] w-[37px] h-[37px] bg-[#d9d9d9] rounded-[18.58px] shadow-[0px_12px_23.1px_#0000001c]"
                aria-hidden="true"
              />
              <div
                className="absolute top-7 left-[19px] w-8 h-8 bg-[#d9d9d9] rounded-2xl shadow-[0px_12px_23.1px_#0000001c]"
                aria-hidden="true"
              />
            </article>
          );
        }

        if (card.type === "projects") {
          return (
            <article key={card.type} className={card.className}>
              <p className="absolute top-[38px] left-[39px] w-[197px] [font-family:'Poppins-Regular',Helvetica] font-normal text-black text-sm tracking-[0.14px] leading-[22px]">
                {card.description}
              </p>
              <img
                className="absolute top-[180px] left-[40px] w-[125px] h-[50px] object-contain object-left"
                alt={card.imageAlt}
                src={card.image}
              />
              <div className="absolute bottom-[30px] left-[40px] [font-family:'Poppins-Regular',Helvetica] font-normal text-[#919191] text-lg tracking-[0.18px] leading-[22px] whitespace-nowrap">
                {card.footer}
              </div>
            </article>
          );
        }

        if (card.type === "team") {
          return (
            <article key={card.type} className={card.className}>
              <p className="absolute top-[32px] left-[30px] w-[198px] [font-family:'Poppins-Regular',Helvetica] font-normal text-black text-sm tracking-[0.14px] leading-[22px]">
                {card.description}
              </p>
              <img
                className="absolute top-[140px] left-[25px] w-[92px] h-[37px] object-contain object-left"
                alt={card.imageAlt}
                src={card.image}
              />
              <div className="absolute bottom-[25px] left-[24px] [font-family:'Poppins-Regular',Helvetica] font-normal text-[#919191] text-lg tracking-[0.18px] leading-[22px] whitespace-nowrap">
                {card.footer}
              </div>
            </article>
          );
        }

        return (
          <article key={card.type} className={card.className}>
            <div
              className="absolute top-[54px] left-[23px] w-[27px] h-[27px] bg-[#dce9ff] rounded-[13.5px] blur-[0.72px]"
              aria-hidden="true"
            />
            <div
              className="absolute top-[61px] left-[30px] w-3.5 h-3.5 bg-[#1f4c92] rounded-[6.9px]"
              aria-hidden="true"
            />
            <img
              className="absolute top-[52px] left-[65px] w-[75px] h-[29px] object-contain object-left"
              alt={card.imageAlt}
              src={card.image}
            />
            <div className="absolute top-[40px] left-[173px] h-[52px] [font-family:'Poppins-Regular',Helvetica] font-normal text-black text-[16.2px] tracking-[0.16px] leading-[26px]">
              Impressions <br />
              generated
            </div>
          </article>
        );
      })}

      <article className="absolute top-[230px] left-[780px] w-[449px] h-[460px] flex flex-col bg-[#242424] rounded-[31.11px] overflow-hidden">
        <h3 className="flex items-center ml-9 mr-[251px] flex-1 max-h-[22px] mt-[41px] [font-family:'Outfit-Medium',Helvetica] font-medium text-[#f8f8f8] text-lg tracking-[0.18px] leading-[22px]">
          Global reach
        </h3>
        <p className="ml-9 mr-[37px] flex-1 max-h-[49px] mt-5 [font-family:'Outfit-Regular',Helvetica] text-[#f8f8f8] text-base tracking-[0.16px] flex items-center font-normal leading-[22px]">
          Working with clients and audiences beyond geographical boundaries.
        </p>
        <img
          className="ml-[29px] w-[390px] h-[264px] mt-10 aspect-[1.48]"
          alt="World map showing global reach"
          src="/world-map-removebg-preview 1.svg"
        />
      </article>
    </section>
  );
};
