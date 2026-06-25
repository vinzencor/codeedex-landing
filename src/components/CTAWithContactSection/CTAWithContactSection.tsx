import { useId, useState } from "react";
import type { FormEvent } from "react";

const navigationItems = [
  "Services",
  "Our Work",
  "Industries",
  "Process",
  "Case Studies",
];

const companyItems = ["About Us", "Contact", "Privacy Policy"];

export const CTAWithContactSection = () => {
  const [email, setEmail] = useState("");
  const emailId = useId();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <section
      className="flex flex-col w-[calc(100%_-_551px)] h-[405px] items-start p-[40.79px] absolute top-[calc(50.00%_+_2887px)] left-[443px] bg-[#f7f7f7] rounded-[32.63px] overflow-hidden"
      aria-labelledby="cta-contact-heading"
    >
      <div className="relative self-stretch w-full h-[216.18px]">
        <nav
          className="flex flex-col w-[calc(100%_-_577px)] items-start gap-[16.32px] absolute top-0 left-px"
          aria-label="Footer navigation"
        >
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <h2
              id="cta-contact-heading"
              className="relative flex items-center self-stretch mt-[-1.02px] [font-family:'Caveat-Regular',Helvetica] font-normal text-gray-400 text-[20.4px] tracking-[0] leading-[28.6px]"
            >
              Navigation
            </h2>
          </div>
          <ul className="flex flex-col items-start gap-[12.24px] relative self-stretch w-full flex-[0_0_auto]">
            {navigationItems.map((item) => (
              <li
                key={item}
                className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]"
              >
                <a
                  href="#"
                  className="relative flex items-center self-stretch mt-[-1.02px] [font-family:'Poppins-Medium',Helvetica] font-medium text-gray-800 text-[14.3px] tracking-[0] leading-[24.5px]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <nav
          className="flex flex-col w-[calc(100%_-_271px)] items-start gap-[16.32px] pt-0 pb-[36.71px] px-0 absolute top-0 left-[271px]"
          aria-label="Company links"
        >
          <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
            <h3 className="relative flex items-center self-stretch mt-[-1.02px] [font-family:'Caveat-Regular',Helvetica] font-normal text-gray-400 text-[20.4px] tracking-[0] leading-[28.6px]">
              Company
            </h3>
          </div>
          <ul className="flex flex-col items-start gap-[12.24px] relative self-stretch w-full flex-[0_0_auto]">
            {companyItems.map((item) => (
              <li
                key={item}
                className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]"
              >
                <a
                  href="#"
                  className="relative flex items-center self-stretch mt-[-1.02px] [font-family:'Poppins-Medium',Helvetica] font-medium text-gray-800 text-[14.3px] tracking-[0] leading-[24.5px]"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="self-stretch h-[210.07px] mb-[-32.63px] mt-[-70.36px] relative w-full">
        <div className="flex h-32 items-end justify-between top-[51px] left-px relative w-full">
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <p className="relative flex items-center w-fit mt-[-1.02px] [font-family:'Inter-Medium',Helvetica] font-medium text-gray-400 text-[12.2px] tracking-[0] leading-[16.3px] whitespace-nowrap">
              © 2026 Codeedex. All rights reserved.
            </p>
          </div>
          <div className="relative flex-1 max-w-[391.58px] grow h-[152.96px] mt-[-24.47px]">
            <div className="flex flex-col w-full items-start absolute top-[-111px] left-[71px]">
              <div className="relative self-stretch w-full h-[24.47px]" />
              <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
                <p className="relative self-stretch mt-[-1.02px] [font-family:'Poppins-Light',Helvetica] font-normal text-gray-900 text-[17.3px] tracking-[0] leading-[28.6px]">
                  <span className="font-light">Technology evolves fast.</span><br />
                  <span className="[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[18.4px]">
                    {" "}
                    Stay ahead with Codeedex.
                  </span>
                </p>
              </div>
            </div>
            <form
              className="flex w-full h-[55px] items-start gap-[8.69e-14px] p-[6.12px] absolute top-[98px] left-px bg-white rounded-[20.39px] border-[1.02px] border-solid border-gray-100 shadow-[0px_1.02px_2.04px_#0000000d]"
              onSubmit={handleSubmit}
            >
              <div className="flex flex-col items-start pt-[11.22px] pb-[12.24px] px-[16.32px] relative flex-1 self-stretch grow bg-white">
                <label htmlFor={emailId} className="sr-only">
                  Enter email address
                </label>
                <input
                  id={emailId}
                  className="relative self-stretch w-full border-[none] [background:none] mt-[-1.02px] [font-family:'Inter-Regular',Helvetica] font-normal text-gray-300 text-[14.3px] tracking-[0] leading-[normal] p-0 outline-none"
                  placeholder="Enter email address"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-label="Email address"
                />
              </div>
              <button
                type="submit"
                className="inline-flex flex-col items-center justify-center px-[24.47px] py-[10.2px] relative flex-[0_0_auto] bg-[#1a1a1a] rounded-[18.36px] cursor-pointer"
              >
                <span className="relative flex items-center justify-center w-fit mt-[-1.02px] [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-[14.3px] text-center tracking-[0] leading-[20.4px] whitespace-nowrap">
                  Subscribe
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
