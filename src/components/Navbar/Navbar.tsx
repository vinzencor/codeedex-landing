import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Our Works", path: "/our-works" },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.startsWith("/#")) {
      const sectionId = path.substring(2);
      if (location.pathname === "/") {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      } else {
        navigate("/");
        setTimeout(() => {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
    } else {
      navigate(path);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const expanded = !isScrolled || isHovered || mobileMenuOpen;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed z-[9999] left-1/2 -translate-x-1/2 top-4 scale-[0.65] md:scale-100 origin-top"
      style={{ transition: "all 0.45s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      <div
        className="relative flex flex-col items-center overflow-hidden rounded-[32px] border border-gray-200/80 bg-gray-50/90 backdrop-blur-xl"
        style={{
          width: expanded ? "min(480px, 90vw)" : "160px",
          height: expanded && mobileMenuOpen ? "220px" : "64px",
          transition:
            "width 0.5s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s ease, box-shadow 0.3s ease",
          boxShadow: expanded
            ? "0 4px 24px 0 rgba(0,0,0,0.08), 0 1px 4px 0 rgba(0,0,0,0.04)"
            : "0 2px 12px 0 rgba(0,0,0,0.10)",
        }}
      >
        {/* ── COLLAPSED: only logo, perfectly centered ── */}
        {!expanded && (
          <button
            type="button"
            onClick={() => {
              navigate("/");
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            className="flex items-center justify-center gap-2 w-full h-[64px] cursor-pointer focus:outline-none"
          >
            <img
              className="h-[64px] w-[64px] object-contain"
              alt="Codeedex Logo"
              src="/Group 1.svg"
            />
            <img
              className="h-[26px] w-auto object-contain"
              alt="Codeedex"
              src="/logoname.svg"
            />
          </button>
        )}

        {/* ── EXPANDED: full navbar row ── */}
        {expanded && (
          <>
            <div
              className="flex items-center justify-between w-full px-4 sm:px-5 gap-4 sm:gap-0 h-[64px] shrink-0"
              style={{
                opacity: expanded ? 1 : 0,
                transition: "opacity 0.25s ease",
              }}
            >
              {/* Logo */}
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="flex items-center gap-0 cursor-pointer shrink-0 focus:outline-none"
              >
                <img className="h-12 w-12 sm:h-[54px] sm:w-[54px] object-contain" alt="Codeedex Logo" src="/Group 1.svg" />
                <img
                  className="block h-[26px] w-auto object-contain"
                  alt="Codeedex"
                  src="/logoname.svg"
                />
              </button>

              {/* Desktop Nav links — centered */}
              <nav className="hidden md:flex items-center gap-8 mx-auto">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => handleNavClick(item.path)}
                    className="text-[15px] font-medium text-gray-500 hover:text-gray-900 transition-colors duration-200 cursor-pointer whitespace-nowrap tracking-wide"
                    style={{ fontFamily: "'Gilroy-Medium', Helvetica, sans-serif" }}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>

              {/* Mobile Hamburger Toggle */}
              <button
                className="md:hidden flex flex-col justify-center items-center w-8 h-8 focus:outline-none ml-auto mr-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle menu"
              >
                <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`}></span>
                <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`bg-gray-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${mobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`}></span>
              </button>

              {/* CTA button (Desktop) */}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const footer = document.getElementById("footer-area");
                  footer
                    ? footer.scrollIntoView({ behavior: "smooth" })
                    : window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }}
                className="hidden sm:block shrink-0 rounded-full bg-gray-800 hover:bg-gray-900 transition-colors duration-200 cursor-pointer focus:outline-none px-6 py-2.5"
              >
                <span
                  className="text-[14px] font-medium tracking-wide text-white whitespace-nowrap"
                  style={{ fontFamily: "'Gilroy-Medium', Helvetica, sans-serif" }}
                >
                  Let's Connect
                </span>
              </button>
            </div>

            {/* Mobile Dropdown Menu */}
            <div
              className={`md:hidden flex flex-col items-center w-full px-4 gap-4 overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'opacity-100 mt-2' : 'opacity-0'}`}
            >
              {navItems.map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => handleNavClick(item.path)}
                  className="text-[16px] font-medium text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                  style={{ fontFamily: "'Gilroy-Medium', Helvetica, sans-serif" }}
                >
                  {item.label}
                </button>
              ))}
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  const footer = document.getElementById("footer-area");
                  footer
                    ? footer.scrollIntoView({ behavior: "smooth" })
                    : window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
                }}
                className="w-full rounded-full bg-gray-800 hover:bg-gray-900 text-white py-2.5 mt-1 transition-colors"
              >
                <span style={{ fontFamily: "'Gilroy-Medium', Helvetica, sans-serif" }}>
                  Let's Connect
                </span>
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
