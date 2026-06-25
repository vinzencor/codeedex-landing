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
      className="absolute top-[3547px] left-[calc(50.00%_-_546px)] h-[525px] w-[1120px] overflow-hidden rounded-[70px] border border-solid border-[#ffffff99] bg-[linear-gradient(150deg,rgba(255,255,255,0.7)_0%,rgba(255,255,255,0.3)_100%)] shadow-[0px_4px_30px_#0000000d] backdrop-blur-[20px] backdrop-brightness-[100%] [-webkit-backdrop-filter:blur(20px)_brightness(100%)]"
    >
      <div
        aria-hidden="true"
        className="absolute left-[691px] top-0 h-[calc(100%_-_1px)] w-[calc(100%_-_691px)] bg-[linear-gradient(0deg,rgba(255,255,255,1)_0%,rgba(255,255,255,1)_100%)]"
      />
      <div className="absolute left-0 top-[18px] flex w-[calc(100%_-_483px)] flex-col items-start gap-8 bg-[#ffffff66] p-16">
        <div className="relative flex w-full flex-[0_0_auto] flex-col items-start">
          <img
            className="relative h-[30px] w-full self-stretch"
            alt="Quotation mark icon"
            src={icon}
          />
        </div>
        <figure className="relative mr-[-64.00px] flex w-[573px] flex-[0_0_auto] flex-col items-start">
          <blockquote className="relative mt-[-1.00px] flex items-center self-stretch [font-family:'Poppins-MediumItalic',Helvetica] text-2xl font-medium italic leading-10 tracking-[-0.32px] text-[#0b1c30]">
            {quote}
          </blockquote>
        </figure>
        <div className="relative flex w-full flex-[0_0_auto] flex-col items-start border-t border-[#e9e9e9] px-0 pb-0 pt-8 [border-top-style:solid]">
          <div className="relative flex w-full flex-[0_0_auto] flex-col items-start">
            <div className="relative mt-[-1.00px] flex items-center self-stretch [font-family:'Poppins-SemiBold',Helvetica] text-2xl font-semibold leading-9 tracking-[0] text-[#0b1c30]">
              {name}
            </div>
          </div>
          <div className="relative flex w-full flex-[0_0_auto] flex-col items-start">
            <div className="relative mt-[-1.00px] flex items-center self-stretch [font-family:'Poppins-Medium',Helvetica] text-xs font-medium leading-4 tracking-[1.20px] text-[#45464d]">
              {role}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
