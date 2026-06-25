const footerLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Dribbble", href: "#" },
];

export const FooterSection = () => {
  return (
    <footer className="flex flex-col w-[1208px] items-start pt-[101px] pb-40 px-0 absolute top-[5929px] left-[calc(50.00%_-_597px)] bg-white border-t [border-top-style:solid] [border-right-style:none] [border-bottom-style:none] [border-left-style:none] border-[#c6c6cd]">
      <div className="flex max-w-[1440px] items-center justify-between px-20 py-0 relative w-full flex-[0_0_auto]">
        <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
          <div className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#0b1c30] text-[32px] tracking-[-0.32px] leading-10 whitespace-nowrap">
            Codeedex
          </div>
        </div>
        <nav
          aria-label="Footer navigation"
          className="inline-flex items-start relative flex-[0_0_auto]"
        >
          {footerLinks.map((link, index) => (
            <div
              key={link.label}
              className={`inline-flex flex-col items-start justify-center relative self-stretch flex-[0_0_auto] ${
                index === 0 ? "py-0 pr-0 pl-0" : "pl-12 pr-0 py-0"
              }`}
            >
              <div className="inline-flex flex-col items-start relative flex-1 grow">
                <a
                  href={link.href}
                  className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#45464d] text-sm tracking-[0] leading-5 whitespace-nowrap"
                >
                  {link.label}
                </a>
              </div>
            </div>
          ))}
        </nav>
        <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
          <p className="relative flex items-center w-fit mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#45464d] text-sm tracking-[0] leading-5 whitespace-nowrap">
            © 2024 STUDIO_X. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
