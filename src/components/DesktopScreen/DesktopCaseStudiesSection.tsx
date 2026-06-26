import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";

type Project = {
  id?: string;
  name: string;
  category: string;
  description: string;
  image_url?: string;
};

export const Box = () => {
  const label = "CaseStudies";

  return (
    <div className="relative h-10 w-[113px] mb-8">
      <div
        aria-label={label}
        className="relative h-10 w-full"
      >
        <span className="absolute left-0 top-0 h-10 w-[calc(100%_-_2px)] rounded-[19.64px] border-[0.73px] border-solid border-[#e3e3e3]" />
        <span className="absolute left-3 top-[3px] flex h-[34px] w-[calc(100%_-_26px)] items-center [font-family:'Gilroy-Regular',Helvetica] text-sm font-normal leading-[33.8px] tracking-[0.14px] text-black">
          {label}
        </span>
      </div>
    </div>
  );
};

export const DesktopCaseStudiesSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchDbProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order_index", { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchDbProjects();
  }, []);

  return (
    <section aria-label="Featured works intro" className="absolute left-[calc(50.00%_-_720px)] top-[3817px] w-[1440px] pointer-events-auto">
      <div className="flex flex-col pl-[79px] pr-[79px]">
        {/* Header Row */}
        <div className="flex items-end justify-between w-full mb-16 relative">
          <div className="flex flex-col">
            <Box />
            
            <p className="absolute left-[703px] top-[-17px] w-[570px] [font-family:'Gilroy-Regular',Helvetica] font-normal text-[#7f7f7f] text-sm tracking-[0.14px] leading-[22px]">
              Explore the digital products, websites, and applications we've crafted to help businesses grow and innovate.
            </p>

            <h2 className="[font-family:'Gilroy-Light-☞',Helvetica] font-normal text-black text-5xl tracking-[0.96px] leading-[52.6px] whitespace-nowrap">
              Our Featured Works
            </h2>
          </div>
          
          <div className="flex items-center pb-2">
            <a
              href="/our-works"
              className="flex items-center gap-2 [font-family:'Gilroy-Regular',Helvetica] font-normal text-black text-sm tracking-[0.14px] leading-[22px] hover:text-blue-600 transition-colors"
            >
              All Works
              <img className="w-[13.5px]" alt="" src="/image.svg" />
            </a>
          </div>
        </div>

        {/* Scroller Row */}
        <div 
          ref={scrollContainerRef}
          className="w-[1440px] ml-[-79px] pl-[79px] overflow-x-auto flex gap-10 pb-16 snap-x snap-mandatory mt-6" 
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {/* Hide Webkit Scrollbar via inline style override in index.css but since we are here we just use tailwind hide-scroll trick if possible or just standard css */}
          <style>{`
            .overflow-x-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          {projects.map((project, idx) => (
            <Link 
              key={project.id || idx} 
              to={`/case-study/${project.id || project.name.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex-none w-[75%] flex flex-col gap-6 group cursor-pointer snap-start"
            >
              <div className="w-full h-[600px] rounded-[32px] overflow-hidden bg-[#f8f9fa] relative shadow-[0_4px_24px_rgba(0,0,0,0.04)] transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:-translate-y-3 group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]">
                {project.image_url && (
                  <img src={project.image_url} alt={project.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                )}
                {!project.image_url && (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">No Image</div>
                )}
              </div>
              <div className="flex flex-col gap-2.5 px-2">
                <span className="text-[13px] font-semibold text-gray-500 uppercase tracking-[2px] [font-family:'Gilroy-Medium',Helvetica]">
                  {project.category}
                </span>
                <h3 className="text-[28px] font-medium text-black leading-tight [font-family:'Gilroy-Medium',Helvetica]">
                  {project.name}
                </h3>
                <p className="text-[#7f7f7f] text-[15px] line-clamp-2 leading-[26px] [font-family:'Gilroy-Regular',Helvetica]">
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
          {/* Spacer to allow scrolling past the last item symmetrically */}
          <div className="flex-none w-[39px]"></div>
        </div>

      </div>
    </section>
  );
};
