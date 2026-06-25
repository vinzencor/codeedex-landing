export const BrandStorySection = () => {
  const badgeText = "What We Do";
  const description =
    "Transforming ideas into powerful digital experiences through modern design, seamless functionality, and scalable development.";

  return (
    <section
      aria-labelledby="brand-story-heading"
      className="absolute left-0 top-[2080px] h-[785px] w-full bg-[#f2f0f0]"
    >
      <div className="absolute left-[calc(50.00%_-_720px)] top-0 w-[1440px] h-full">
        <div className="absolute left-20 top-[178px] h-10 w-[125px]">
          <div className="absolute left-0 top-0 h-10 w-[123px] rounded-[19.64px] border-[0.73px] border-solid border-[#e3e3e3]" />
          <div className="absolute left-[17px] top-[3px] flex h-[34px] w-[88px] items-center [font-family:'Poppins-Regular',Helvetica] text-sm font-normal leading-[33.8px] tracking-[0.14px] text-black">
            {badgeText}
          </div>
        </div>
        <h2
          id="brand-story-heading"
          className="absolute left-20 top-[230px] w-[680px] [font-family:'Gilroy-Medium',Helvetica] font-medium text-black text-[50px] tracking-[1.00px] leading-[60px]"
        >
          We Design Digital Products That Drive Growth
        </h2>
        <p className="absolute left-20 top-[379px] flex h-[60px] w-[541px] items-center [font-family:'Gilroy-Light',Helvetica] text-base font-light leading-[30px] tracking-[0.32px] text-[#191919]">
          {description}
        </p>
        <button
          type="button"
          aria-label="Learn more"
          className="absolute left-20 top-[474px] flex h-[24px] w-[128px] items-center bg-transparent p-0 text-left cursor-pointer"
        >
          <span className="h-[22px] w-[93px] [font-family:'Gilroy-Medium',Helvetica] text-lg font-medium leading-[normal] tracking-[0] text-[#010101]">
            Learn More
          </span>
          <span className="absolute left-[104px] top-0 flex h-6 w-6 rotate-[90deg] items-center justify-center">
            <img
              className="h-auto w-[17.5px] rotate-[-90deg]"
              alt=""
              aria-hidden="true"
              src="/vector-2.svg"
            />
          </span>
        </button>
        <div className="absolute left-[800px] top-[49px] flex h-[687px] w-[546px] overflow-hidden rounded-[87px] bg-white shadow-lg">
          <img
            className="w-full h-full object-cover"
            alt="Illustration preview"
            src="/gif-turivius-correcao-jlxwg0gniv.png"
          />
        </div>
      </div>
    </section>
  );
};
