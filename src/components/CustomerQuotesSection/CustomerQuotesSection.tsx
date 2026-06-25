const quotes = [
  {
    id: 1,
    text: `"Working with Codeedex Technologies was a great experience. They understood our requirements clearly and delivered a clean, modern e-commerce website that perfectly reflects our brand. The shopping experience is smooth, mobile-friendly, and easy for our customers to use. Their team was responsive throughout the project and completed everything on time. We've already seen an improvement in customer engagement and online orders. Highly recommended!"`,
    company: "Kiweena",
    author: "Sharukh rahman",
    avatarClassName: "bg-[url(/lester-walsh.png)] bg-cover bg-[50%_50%]",
  },
];

export const CustomerQuotesSection = () => {
  return (
    <section
      aria-labelledby="customer-quotes-heading"
      className="flex flex-col max-w-4xl w-[calc(100%_-_544px)] items-start gap-16 absolute top-[calc(50.00%_+_2425px)] left-[104px]"
    >
      <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
        <h2
          id="customer-quotes-heading"
          className="relative flex items-center self-stretch mt-[-1.00px] [font-family:'Gilroy-Light-☞',Helvetica] font-normal text-black text-5xl tracking-[0.96px] leading-[52.6px]"
        >
          Our customers speak
        </h2>
      </div>
      <div className="flex flex-col items-start gap-10 pl-px pr-0 py-0 relative self-stretch w-full flex-[0_0_auto]">
        {quotes.map((quote) => (
          <article
            key={quote.id}
            className="flex flex-col items-start gap-10 relative self-stretch w-full flex-[0_0_auto]"
          >
            <div className="flex items-start gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <div
                className="inline-flex flex-col items-start pt-1 pb-0 px-0 relative flex-[0_0_auto] shrink-0"
                aria-hidden="true"
              >
                <div className="relative w-10 h-[30px]">
                  <img
                    className="absolute w-full h-full top-0 left-0"
                    alt=""
                    src="/vector.svg"
                  />
                </div>
              </div>
              <div className="inline-flex flex-col items-start pl-0 pr-[17.61px] py-0 relative flex-[0_0_auto]">
                <blockquote className="m-0">
                  <p className="relative w-[604px] mt-[-1.00px] [font-family:'Poppins-Regular',Helvetica] text-[#7f7f7f] text-sm tracking-[0.14px] flex items-center font-normal leading-[22px]">
                    {quote.text}
                  </p>
                </blockquote>
              </div>
            </div>
            <div className="flex items-center gap-6 relative self-stretch w-full flex-[0_0_auto]">
              <div className="inline-flex min-w-[280px] items-center pl-2 pr-[83.86px] py-2 relative flex-[0_0_auto] bg-black rounded-full">
                <div
                  className="absolute w-full h-full top-0 left-0 bg-[#ffffff01] rounded-full shadow-[0px_4px_6px_-4px_#0000001a,0px_10px_15px_-3px_#0000001a]"
                  aria-hidden="true"
                />
                <div
                  className={`relative w-14 h-14 rounded-full border-2 border-solid border-gray-800 ${quote.avatarClassName}`}
                  aria-hidden="true"
                />
                <div className="relative w-[132.14px] h-[42.5px]">
                  <div className="inline-flex flex-col items-start relative -top-px left-4">
                    <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                      <div className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-sm tracking-[0] leading-[22.5px] whitespace-nowrap">
                        {quote.company}
                      </div>
                    </div>
                    <footer className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto] not-italic">
                      <div className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Poppins-Regular',Helvetica] font-normal text-gray-400 text-sm tracking-[0] leading-5 whitespace-nowrap">
                        {quote.author}
                      </div>
                    </footer>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
