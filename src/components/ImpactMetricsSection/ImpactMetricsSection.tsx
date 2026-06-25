const floatingCards = [
  {
    className:
      "absolute top-[419px] left-[971px] w-[297px] h-[309px] rounded-[26.95px] rotate-[9.73deg] bg-[url(/frame-1171275605.png)] bg-cover bg-[50%_50%]",
  },
  {
    className:
      "absolute top-[445px] left-[1357px] w-[209px] h-[218px] rounded-[18.97px] rotate-[-2.59deg] bg-[url(/frame-1171275607.png)] bg-cover bg-[50%_50%]",
  },
  {
    className:
      "absolute top-[422px] left-[164px] w-[297px] h-[309px] rounded-[26.95px] rotate-[169.76deg] bg-[url(/frame-1171275606.png)] bg-cover bg-[50%_50%]",
  },
  {
    className:
      "absolute top-[504px] left-[-170px] w-[246px] h-64 rounded-[22.32px] rotate-[175.38deg] bg-[url(/frame-1171275608.png)] bg-cover bg-[50%_50%]",
  },
];

export const ImpactMetricsSection = () => {
  return (
    <section
      aria-labelledby="impact-metrics-title"
      className="absolute top-[4026px] left-0 w-full h-[899px] bg-white overflow-hidden"
    >
      <div className="absolute left-[calc(50.00%_-_720px)] top-0 w-[1440px] h-full">
        <img
          className="absolute top-[360px] left-[104px] w-[1217px] h-[539px]"
          alt=""
          src="/vector-1.svg"
          aria-hidden="true"
        />
        <img
          className="absolute top-[calc(50.00%_-_270px)] left-[calc(50.00%_-_250px)] w-[500px] h-[500px] object-contain"
          alt="Kiweena e-commerce app preview displayed on an iPhone"
          src="/kiweena_mockup.png"
        />
        {floatingCards.map((card, index) => (
          <div key={index} aria-hidden="true" className={card.className} />
        ))}

        <div className="absolute w-[calc(100%_-_1313px)] top-28 left-[630px] h-[22px] flex items-center [font-family:'Poppins-Regular',Helvetica] font-normal text-[#484848] text-sm tracking-[0.14px] leading-[22px] whitespace-nowrap">
          E-commerce App
        </div>
        <p className="absolute top-[153px] left-[calc(50.00%_-_407px)] h-[22px] flex items-center [font-family:'Poppins-Medium',Helvetica] font-medium text-[#484848] text-lg tracking-[0.18px] leading-[22px] whitespace-nowrap">
          &nbsp;&nbsp;&nbsp;&nbsp;Discover premium lunch pouches that blend style,
          durability, and convenience.
        </p>
        <h2
          id="impact-metrics-title"
          className="absolute w-[calc(100%_-_1345px)] top-[70px] left-[646px] h-[53px] flex items-center [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#151515] text-[22px] tracking-[0] leading-[52.6px] whitespace-nowrap"
        >
          kiweena
        </h2>
      </div>
    </section>
  );
};
