import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import { ClientTestimonialSection } from "./ClientTestimonialSection";
import { FooterSection } from "./FooterSection";
import image1 from "./image-1.jpg";
import { KeyHighlightsSection } from "./KeyHighlightsSection";
import line2 from "./line-2.svg";
import line3 from "./line-3.svg";
import { ReadyToInnovateSection } from "./ReadyToInnovateSection";
import { StrategicExecutionSection } from "./StrategicExecutionSection";
import vector from "./vector.svg";
import vector2 from "./vector-2.svg";
import { Navbar } from "../Navbar/Navbar";
import { useScrollProgress } from "../../hooks/use-scroll-progress";

export const CaseStudy = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const [project, setProject] = useState<any>(null);
  const [dbCaseStudy, setDbCaseStudy] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const selectedProjectId = projectId;
    if (!selectedProjectId) return;

    const fetchCaseStudyData = async () => {
      setLoading(true);
      try {
        // Fetch project basic details
        const { data: projData } = await supabase
          .from("projects")
          .select("*")
          .eq("id", selectedProjectId)
          .single();

        if (projData) {
          setProject(projData);
        }

        // Fetch case study details
        const { data: csData } = await supabase
          .from("case_studies")
          .select("*")
          .eq("project_id", selectedProjectId)
          .single();

        if (csData) {
          setDbCaseStudy(csData);
        }
      } catch (err) {
        console.error("Error loading case study details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCaseStudyData();
  }, []);

  const meta = [
    {
      label: "CLIENT",
      value: dbCaseStudy?.client || "Colors Boutique",
      widthClass: "w-[calc(100%_-_1259px)]",
      heightClass: "h-[52px]",
      top: "top-[1276px]",
      left: "left-[202px]",
      valueClass:
        "[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#0b1c30] text-xl tracking-[0] leading-7",
      valueWidthClass: "self-stretch",
    },
    {
      label: "INDUSTRY",
      value: dbCaseStudy?.industry || "Fashion & Apparel,E-commerce Platform",
      widthClass: "w-[calc(100%_-_1259px)]",
      heightClass: "",
      top: "top-[1272px]",
      left: "left-[519px]",
      valueClass:
        "[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#0b1c30] text-xl tracking-[0] leading-7",
      valueWidthClass: "w-[230px] mr-[-48.80px]",
    },
    {
      label: "SERVICES",
      value: dbCaseStudy?.services || "UI/UX Design, Web Design",
      widthClass: "w-[calc(100%_-_1259px)]",
      heightClass: "h-20",
      top: "top-[1269px]",
      left: "left-[867px]",
      valueClass:
        "[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#0b1c30] text-xl tracking-[0] leading-7",
      valueWidthClass: "self-stretch",
    },
    {
      label: "TIMELINE",
      value: dbCaseStudy?.timeline || "6 Weeks",
      widthClass: "w-[calc(100%_-_1259px)]",
      heightClass: "h-[52px]",
      top: "top-[1274px]",
      left: "left-[1123px]",
      valueClass:
        "[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#0b1c30] text-xl tracking-[0] leading-7",
      valueWidthClass: "self-stretch",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  const isHttpUrl =
    project?.image_url?.startsWith("http") ||
    project?.image_url?.startsWith("/") ||
    project?.image_url?.startsWith("data:");

  const [scale, setScale] = useState(1);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1440) {
        setScale(window.innerWidth / 1440);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full flex justify-center bg-white overflow-hidden" style={{ height: `${6231 * scale}px` }}>
      <Navbar />
      <main 
        className="bg-white overflow-hidden h-[6231px] relative shrink-0"
        style={{ 
          width: scale < 1 ? '1440px' : '100%',
          transform: `scale(${scale})`, 
          transformOrigin: 'top center' 
        }}
      >
        {/* Back button for user experience */}
        <div className="absolute top-[50px] left-[50px] z-50">
          <a
            href="/our-works"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-full font-medium tracking-wide hover:bg-neutral-800 transition-colors shadow-lg cursor-pointer"
          >
            ← Back to Works
          </a>
        </div>

        {meta.map((item) => (
          <section
            key={item.label}
            aria-label={item.label}
            className={`flex flex-col ${item.widthClass} ${item.heightClass} items-start gap-2 absolute ${item.top} ${item.left}`}
          >
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative flex items-center self-stretch mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#adadad] text-xs tracking-[1.20px] leading-4">
                {item.label}
              </div>
            </div>
            <div className="flex flex-col items-start relative self-stretch w-full flex-[0_0_auto]">
              <div
                className={`relative flex items-center ${item.valueWidthClass} mt-[-1.00px] ${item.valueClass}`}
              >
                {item.value}
              </div>
            </div>
          </section>
        ))}

        <section aria-label="Product overview description">
          <p className="absolute top-[1559px] left-[calc(50%_-_605px)] w-[1210px] [font-family:'Poppins-Light',Helvetica] font-light text-[#45464d] text-lg tracking-[0] leading-8 text-center">
            {dbCaseStudy?.overview || (
              <>
                Colors Boutique is a modern online fashion destination offering a
                curated collection of premium ethnic wear, designer suits, kurtis,
                salwar sets, festive collections, and contemporary fashion for women.
                The platform combines traditional craftsmanship with modern shopping
                convenience, allowing customers to discover and purchase high-quality
                clothing from anywhere.
                <br />
                <br />
                The goal of this project was to create a visually appealing and
                user-friendly e-commerce experience that reflects the elegance of the
                brand while making fashion discovery, browsing, and purchasing
                effortless. The platform was designed to provide customers with a
                seamless shopping journey from product exploration to checkout.
              </>
            )}
          </p>
        </section>
        <div className="absolute top-[1477px] left-0 w-full h-[72px] flex items-center justify-center">
          <h2 className="[font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#0b1c30] text-[42px] text-center tracking-[-1.28px] leading-[72px] whitespace-nowrap">
            PRODUCT OVERVIEW
          </h2>
        </div>
      <StrategicExecutionSection />
      <ClientTestimonialSection
        quote={dbCaseStudy?.testimonial_quote}
        name={dbCaseStudy?.testimonial_author}
        role={dbCaseStudy?.testimonial_role}
      />
      <KeyHighlightsSection
        highlight1Title={dbCaseStudy?.highlight1_title}
        highlight1Desc={dbCaseStudy?.highlight1_desc}
        highlight1Image={dbCaseStudy?.highlight1_image}
        highlight2Title={dbCaseStudy?.highlight2_title}
        highlight2Desc={dbCaseStudy?.highlight2_desc}
        highlight2Image={dbCaseStudy?.highlight2_image}
      />
      <ReadyToInnovateSection />
      <FooterSection />
      <img
        className="absolute top-[540px] left-[calc(50.00%_-_544px)] w-[1089px] h-[662px] aspect-[1.65] object-cover rounded-3xl shadow-2xl"
        alt={`${project?.name || "Colours Boutique"} website preview`}
        src={isHttpUrl ? project.image_url : image1}
      />
      <div className="flex flex-col w-[calc(100%_-_520px)] items-center absolute top-[196px] left-[254px]">
        <div className="relative flex items-center justify-center w-[108px] mt-[-1.00px] [font-family:'Poppins-Medium',Helvetica] font-medium text-[#9c9c9c] text-base text-center tracking-[1.20px] leading-4">
          CASE STUDY
        </div>
      </div>
      <header className="flex-col w-[calc(100%_-_520px)] items-center top-[236px] left-[254px] absolute flex">
        <h1 className="relative flex items-center justify-center w-fit mt-[-1.00px] [text-shadow:0px_0px_20px_#565e741a] bg-[linear-gradient(90deg,rgba(2,21,43,1)_0%,rgba(6,70,145,1)_100%)] [-webkit-background-clip:text] bg-clip-text [-webkit-text-fill-color:transparent] [text-fill-color:transparent] [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-transparent text-[80px] text-center tracking-[-4.80px] leading-[110px] whitespace-nowrap">
          {project?.name || "Colour boutique"}
        </h1>
      </header>
      <div className="flex flex-col max-w-2xl w-[calc(100%_-_768px)] items-center absolute top-[346px] left-[378px]">
        <p className="relative flex items-center justify-center w-fit mt-[-1.00px] ml-[-186.00px] mr-[-186.00px] [font-family:'Poppins-Light',Helvetica] font-light text-[#878787] text-[28px] text-center tracking-[-0.32px] leading-10 whitespace-nowrap">
          {project?.description ||
            "Elevating Traditional Fashion Through A Premium Online Shopping Experience"}
        </p>
      </div>
      <a
        href={dbCaseStudy?.live_url || "#"}
        target={dbCaseStudy?.live_url ? "_blank" : undefined}
        rel="noopener noreferrer"
        aria-label="View live website"
        className="flex w-[248px] h-[62px] gap-2 pl-[60px] pr-12 py-6 absolute top-[415px] left-[calc(50.00%_-_130px)] bg-[#1a1c1b] items-center justify-center rounded-full cursor-pointer hover:bg-neutral-800 transition-colors"
      >
        <div className="absolute w-[calc(100%_-_24px)] h-full top-0 left-0 bg-[#ffffff01] rounded-full shadow-[0px_25px_50px_-12px_#00000040]" />
        <div className="relative flex items-center justify-center w-fit mt-[-6.00px] mb-[-4.00px] ml-[-26.31px] mr-[-0.69px] [font-family:'Poppins-Regular',Helvetica] font-normal text-white text-base text-center tracking-[1.60px] leading-6 whitespace-nowrap">
          View Live Website
        </div>
        <div className="inline-flex items-start justify-center relative flex-[0_0_auto] mt-[-5.00px] mb-[-5.00px] mr-[-26.31px]">
          <div className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Liberation_Sans-Regular',Helvetica] font-normal text-white text-base text-center tracking-[1.60px] leading-6 whitespace-nowrap">
            →
          </div>
        </div>
      </a>
      <div className="w-[479px] pt-0 pb-[19.18px] px-0 absolute top-[2092px] left-[875px] flex flex-col max-w-[479.46px] items-start">
        <div className="h-[378px] gap-[27.87px] pl-[45px] pr-[57.54px] pt-[35px] pb-[57.54px] relative w-full bg-[#f0f0f0] rounded-[38.36px] shadow-[0px_1.2px_2.4px_#0000000d] flex flex-col max-w-[479.46px] items-start">
          <p className="relative flex items-center w-[400px] mt-[-1.20px] mb-[-29.34px] mr-[-23.07px] [font-family:'Gilroy-Medium-☞',Helvetica] font-normal text-black text-lg tracking-[0] leading-[35.1px]">
            {dbCaseStudy?.result || (
              <>
                Designed Colors Boutique platform delivers a modern shopping
                experience with improved navigation, organized categories, advanced
                filters, and visually rich product pages. The new design enhances
                product discovery, boosts customer engagement, and provides a
                seamless experience across desktop and mobile, strengthening the
                brand&apos;s digital presence.
              </>
            )}
          </p>
        </div>
      </div>
      <div className="inline-flex flex-col max-w-[479.46px] items-start pt-0 pb-[19.18px] px-0 absolute top-[2007px] left-[108px]">
        <div className="relative max-w-[479.46px] w-full h-[402px] bg-[#f0f0f0] rounded-[38.36px] shadow-[0px_1.2px_2.4px_#0000000d] flex items-center justify-center px-[45px]">
          <p className="text-center [font-family:'Gilroy-Medium-☞',Helvetica] font-normal text-black text-lg tracking-[0] leading-[35.1px]">
            {dbCaseStudy?.challenge || (
              <>
                The redesigned Colors Boutique platform delivers a modern shopping
                experience with improved navigation, organized categories, advanced
                filters, and visually rich product pages. The new design enhances
                product discovery, boosts customer engagement, and provides a
                seamless experience across desktop and mobile, strengthening the
                brand&apos;s digital presence.
              </>
            )}
          </p>
        </div>
      </div>
      <div className="flex max-w-[534.82px] w-[487px] items-center justify-between px-[42.79px] py-[21.39px] absolute top-[2523px] left-[867px] rounded-[25px] bg-[linear-gradient(90deg,rgba(123,153,184,1)_0%,rgba(43,130,201,1)_50%,rgba(30,91,163,1)_100%)]">
        <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
          <div className="mt-[-1.34px] text-white relative flex items-center w-fit [font-family:'Gilroy-Medium-☞',Helvetica] font-normal text-[26.7px] tracking-[0] leading-[37.4px] whitespace-nowrap">
            The Result
          </div>
        </div>
        <div className="inline-flex p-[5.35px] relative flex-[0_0_auto] bg-lime-400 rounded-[10.7px] items-center justify-center">
          <div className="relative w-[26.74px] h-[26.74px]">
            <img
              className="absolute w-[74.29%] h-[69.11%] top-[30.89%] left-[25.71%]"
              alt="Result icon"
              src={vector}
            />
          </div>
        </div>
      </div>
      <div className="inline-flex flex-col items-start pt-0 pb-[19.18px] px-0 absolute top-[1892px] left-28">
        <div className="flex w-[339px] items-center justify-between px-[42.79px] py-[21.39px] relative flex-[0_0_auto] bg-[#eeeeee] rounded-[25px]">
          <div className="inline-flex flex-col items-start relative flex-[0_0_auto]">
            <div className="mt-[-1.20px] text-neutral-950 relative flex items-center w-fit [font-family:'Gilroy-Medium-☞',Helvetica] font-normal text-[26.7px] tracking-[0] leading-[37.4px] whitespace-nowrap">
              The Challenge
            </div>
          </div>
          <div className="flex w-11 h-[43px] p-[4.79px] relative bg-[#ffd500] rounded-[9.59px] items-center justify-center">
            <div className="relative w-[28.29px] h-[17.86px]">
              <img
                className="absolute w-[87.97%] h-[90.77%] top-[9.23%] left-[12.03%]"
                alt="Challenge icon"
                src={vector2}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        className="top-[2364px] left-[855px] absolute w-3.5 h-3.5 bg-[#f0f0f0] rounded-[7px]"
        aria-hidden="true"
      />
      <div
        className="top-[2186px] left-[593px] absolute w-3.5 h-3.5 bg-[#f0f0f0] rounded-[7px]"
        aria-hidden="true"
      />
      <img
        className="absolute top-[2190px] left-[597px] w-[221px] h-[181px]"
        alt=""
        src={line2}
        aria-hidden="true"
      />
      <img
        className="absolute top-[2368px] left-[818px] w-[47px] h-[5px] object-cover"
        alt=""
        src={line3}
        aria-hidden="true"
      />
    </main>
    </div>
  );
};

export default CaseStudy;
