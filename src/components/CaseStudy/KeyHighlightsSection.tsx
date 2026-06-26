import iPhone from "./i-phone.svg";
import iPhone2 from "./i-phone-2.svg";

interface KeyHighlightsProps {
  highlight1Title?: string;
  highlight1Desc?: string;
  highlight1Image?: string;
  highlight2Title?: string;
  highlight2Desc?: string;
  highlight2Image?: string;
}

export const KeyHighlightsSection = ({
  highlight1Title = "User-Centered Design",
  highlight1Desc = "Designed with simplicity and intuitive navigation to improve usability and reduce friction.",
  highlight1Image = "",
  highlight2Title = "Responsive Experience",
  highlight2Desc = "Optimized layouts for desktop, tablet, and mobile devices to ensure a seamless experience.",
  highlight2Image = "",
}: KeyHighlightsProps) => {
  const cards = [
    {
      id: "highlight-1",
      title: highlight1Title,
      description: highlight1Desc,
      image: highlight1Image || iPhone,
      imageAlt: "Highlight 1 interface preview",
      imageClassName: "absolute top-[56px] left-[194px] w-[165px] h-[234px] object-contain pointer-events-none",
      imageWrapperColor: "bg-[#eaeaea]",
    },
    {
      id: "highlight-2",
      title: highlight2Title,
      description: highlight2Desc,
      image: highlight2Image || iPhone2,
      imageAlt: "Highlight 2 interface preview",
      imageClassName: "absolute top-[37px] left-[168px] w-[217px] h-[253px] object-contain pointer-events-none",
      imageWrapperColor: "bg-[#e9e9e9]",
    },
  ];

  return (
    <section
      aria-labelledby="key-highlights-heading"
      className="absolute w-[1440px] left-1/2 -translate-x-1/2 top-[4092px] h-[672px]"
    >
      <div className="absolute w-full top-[105px] left-0 h-[72px] flex justify-center">
        <h2
          id="key-highlights-heading"
          className="flex items-center justify-center w-auto h-[72px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#0b1c30] text-[42px] text-center tracking-[-1.28px] leading-[72px] whitespace-nowrap"
        >
          Key Highlights
        </h2>
      </div>
      
      <div className="absolute w-full top-[223px] left-0 h-[402px] flex justify-center gap-[103px]">
        {cards.map((card) => (
          <article
            key={card.id}
            className="relative w-[553px] h-[402px] rounded-3xl border border-solid border-[#ffffff99] shadow-[0px_4px_30px_#0000000d] backdrop-blur-[20px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(20px)_brightness(100%)] bg-[linear-gradient(144deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.3)_100%)]"
          >
            <div
              className={`absolute top-0 left-0 w-full h-[290px] ${card.imageWrapperColor} rounded-3xl overflow-hidden flex items-center justify-center`}
            />
            
            {/* The image moved inside the card */}
            <img
              className={card.imageClassName}
              alt={card.imageAlt}
              src={card.image}
            />

            <div className="absolute top-[284px] left-[41px] w-[calc(100%_-_82px)] flex flex-col items-center pt-4 pb-0 px-0">
              <h3 className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#0b1c30] text-[22px] text-center tracking-[0] leading-9 whitespace-nowrap">
                {card.title}
              </h3>
            </div>
            <div className="absolute w-[calc(100%_-_82px)] top-[324px] left-[41px] h-[72px] flex justify-center">
              <p className="flex items-center justify-center mt-[15px] w-[523px] h-[42px] ml-[-0.3px] [font-family:'Poppins-Light',Helvetica] font-light text-[#45464d] text-sm text-center tracking-[0] leading-[21px]">
                {card.description}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
