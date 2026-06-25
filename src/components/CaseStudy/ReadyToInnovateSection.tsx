const ctaButtons = [
  {
    label: "Let's Build Your Product",
    variant: "primary" as const,
    className:
      "flex w-[277px] h-[60px] items-center justify-center px-12 py-5 relative bg-black rounded-full",
    textClassName:
      "relative flex items-center justify-center w-fit mt-[-5.00px] mb-[-3.00px] ml-[-15.50px] mr-[-15.50px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-white text-lg text-center tracking-[0] leading-7 whitespace-nowrap",
  },
  {
    label: "View More Work",
    variant: "secondary" as const,
    className:
      "inline-flex px-12 py-5 relative flex-[0_0_auto] bg-[#ffffff66] border border-solid border-[#ffffff80] backdrop-blur-[10px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(10px)_brightness(100%)] items-center justify-center rounded-full",
    textClassName:
      "relative flex items-center justify-center w-fit [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#0b1c30] text-lg text-center tracking-[0] leading-7 whitespace-nowrap",
  },
];

export const ReadyToInnovateSection = () => {
  return (
    <section
      aria-labelledby="ready-to-innovate-heading"
      className="flex flex-col w-[1234px] h-[478px] items-start pt-[84px] pb-40 px-20 absolute top-[4925px] left-[calc(50.00%_-_614px)] rounded-[54px] overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="absolute w-full h-full top-0 left-0 bg-[#4648d4] opacity-5"
      />
      <div className="flex flex-col max-w-[1440px] h-[322px] items-center gap-[17px] pt-[34px] pb-20 px-20 relative w-full mb-[-88.00px] rounded-[40px] border border-solid border-[#ffffff99] shadow-[0px_4px_30px_#0000000d] backdrop-blur-[20px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(20px)_brightness(100%)] bg-[linear-gradient(156deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.3)_100%)]">
        <header className="flex flex-col items-center relative self-stretch w-full flex-[0_0_auto]">
          <h2
            id="ready-to-innovate-heading"
            className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#0b1c30] text-[42px] text-center tracking-[-1.28px] leading-[72px] whitespace-nowrap"
          >
            Ready to innovate?
          </h2>
        </header>
        <div className="flex flex-col max-w-screen-md w-[768px] items-center relative flex-[0_0_auto]">
          <p className="relative w-fit mt-[-1.00px] [font-family:'Poppins-Light',Helvetica] font-light text-[#45464d] text-lg text-center tracking-[0] leading-[33px]">
            Let&#39;s build the next generation of digital products
            <br />
            together. Our team is ready to scale your vision into reality.
          </p>
        </div>
        <div className="flex items-center justify-center gap-6 relative self-stretch w-full flex-[0_0_auto] mb-[-35.00px]">
          {ctaButtons.map((button) => (
            <button
              key={button.label}
              type="button"
              aria-label={button.label}
              className={button.className}
            >
              {button.variant === "primary" && (
                <span
                  aria-hidden="true"
                  className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-full shadow-[0px_8px_10px_-6px_#0000001a,0px_20px_25px_-5px_#0000001a]"
                />
              )}
              <span className={button.textClassName}>{button.label}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
