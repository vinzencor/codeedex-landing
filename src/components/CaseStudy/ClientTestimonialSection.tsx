import icon from "./icon.svg";

interface ClientTestimonialSectionProps {
  quote?: string;
  name?: string;
  role?: string;
}

export const ClientTestimonialSection = ({
  quote = '"Codedex transformed our vision into a digital experience that feels both premium and authentic. Every interaction reflects the quality and craftsmanship behind Sweet Laban, helping us connect with customers from the very first visit."',
  name = "Marcus Chen",
  role = "FOUNDER, SWEET LABAN",
}: ClientTestimonialSectionProps) => {
  return (
    <section
      aria-label="Client testimonial"
      className="relative md:absolute md:top-[3547px] md:left-[calc(50.00%_-_546px)] mx-auto mt-16 md:mt-0 w-[90%] md:w-[1120px] h-auto min-h-[525px] overflow-hidden rounded-[30px] md:rounded-[70px] border border-solid border-[#ffffff99] bg-[linear-gradient(150deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.3)_100%)] shadow-[0px_4px_30px_#0000000d] backdrop-blur-[20px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(20px)_brightness(100%)] flex flex-col md:flex-row"
    >
      <div className="relative z-10 flex w-full md:w-[637px] flex-col items-start gap-6 md:gap-8 bg-[#ffffff66] p-8 md:p-16 my-auto">
        <div className="flex w-full flex-col items-start">
          <img
            className="h-[24px] md:h-[30px] w-auto object-contain"
            alt="Quotation mark icon"
            src={icon}
          />
        </div>
        <figure className="flex w-full flex-col items-start">
          <blockquote className="[font-family:'Poppins-MediumItalic',Helvetica] text-lg md:text-2xl font-medium italic leading-relaxed md:leading-10 tracking-[-0.32px] text-[#0b1c30]">
            {quote}
          </blockquote>
        </figure>
        <div className="flex w-full flex-col items-start border-t border-[#e9e9e9] pt-6 md:pt-8 mt-4 md:mt-0">
          <div className="flex w-full flex-col items-start">
            <div className="[font-family:'Poppins-SemiBold',Helvetica] text-xl md:text-2xl font-semibold leading-8 md:leading-9 text-[#0b1c30]">
              {name}
            </div>
          </div>
          <div className="flex w-full flex-col items-start mt-1">
            <div className="[font-family:'Poppins-Medium',Helvetica] text-[10px] md:text-xs font-medium leading-4 tracking-[1.20px] text-[#45464d] uppercase">
              {role}
            </div>
          </div>
        </div>
      </div>
      
      <div
        aria-hidden="true"
        className="hidden md:block absolute right-0 top-0 h-full w-[429px] bg-[linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)] z-0"
      />
    </section>
  );
};
