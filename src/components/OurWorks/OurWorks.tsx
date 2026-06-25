import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import vector from "./vector.svg";
import { Navbar } from "../Navbar/Navbar";

type Project = {
  id?: string;
  name: string;
  category: string;
  description: string;
  imageClassName: string;
  imageHeightClassName: string;
  imageRoundedClassName: string;
  image_url?: string;
};


const cardPositions = [
  { left: "left-[93px]", top: "top-[400px]" },
  { left: "left-[calc(50.00%_-_205px)]", top: "top-[400px]" },
  { left: "left-[937px]", top: "top-[400px]" },
  { left: "left-[93px]", top: "top-[880px]" },
  { left: "left-[calc(50.00%_-_205px)]", top: "top-[880px]" },
  { left: "left-[937px]", top: "top-[880px]" },
];

const textPositions = [
  {
    titleTop: "top-[711px]",
    categoryTop: "top-[757px]",
    descriptionTop: "top-[785px]",
    titleLeft: "left-[117px]",
    categoryLeft: "left-[117px]",
    descriptionLeft: "left-[117px]",
    titleWidth: "w-[380px]",
    categoryWidth: "w-[380px]",
    descriptionWidth: "w-[380px]",
  },
  {
    titleTop: "top-[734px]",
    categoryTop: "top-[780px]",
    descriptionTop: "top-[808px]",
    titleLeft: "left-[537px]",
    categoryLeft: "left-[537px]",
    descriptionLeft: "left-[537px]",
    titleWidth: "w-[380px]",
    categoryWidth: "w-[380px]",
    descriptionWidth: "w-[380px]",
  },
  {
    titleTop: "top-[734px]",
    categoryTop: "top-[780px]",
    descriptionTop: "top-[808px]",
    titleLeft: "left-[971px]",
    categoryLeft: "left-[971px]",
    descriptionLeft: "left-[971px]",
    titleWidth: "w-[380px]",
    categoryWidth: "w-[380px]",
    descriptionWidth: "w-[380px]",
  },
  {
    titleTop: "top-[1191px]",
    categoryTop: "top-[1237px]",
    descriptionTop: "top-[1265px]",
    titleLeft: "left-[117px]",
    categoryLeft: "left-[117px]",
    descriptionLeft: "left-[117px]",
    titleWidth: "w-[380px]",
    categoryWidth: "w-[380px]",
    descriptionWidth: "w-[380px]",
  },
  {
    titleTop: "top-[1214px]",
    categoryTop: "top-[1260px]",
    descriptionTop: "top-[1288px]",
    titleLeft: "left-[537px]",
    categoryLeft: "left-[537px]",
    descriptionLeft: "left-[537px]",
    titleWidth: "w-[380px]",
    categoryWidth: "w-[380px]",
    descriptionWidth: "w-[380px]",
  },
  {
    titleTop: "top-[1214px]",
    categoryTop: "top-[1260px]",
    descriptionTop: "top-[1288px]",
    titleLeft: "left-[971px]",
    categoryLeft: "left-[971px]",
    descriptionLeft: "left-[971px]",
    titleWidth: "w-[380px]",
    categoryWidth: "w-[380px]",
    descriptionWidth: "w-[380px]",
  },
];



export const Desktop = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDbProjects = async () => {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("order_index", { ascending: true });

        if (error) throw error;

        const mapped = (data || []).map(item => ({
          id: item.id,
          name: item.name,
          category: item.category,
          description: item.description || "",
          imageClassName:
            item.image_url?.startsWith("http") ||
              item.image_url?.startsWith("/") ||
              item.image_url?.startsWith("data:")
              ? ""
              : item.image_url || "",
          imageHeightClassName: item.image_height_class || "h-[309px]",
          imageRoundedClassName: item.image_rounded_class || "rounded-[26.95px]",
          image_url: item.image_url,
        }));
        setProjects(mapped);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDbProjects();
  }, []);

  return (
    <main className="bg-white w-full min-w-[1440px] min-h-[1573px] relative pb-[120px]">
      <Navbar />

      {/* Main Works Grid Content */}
      <section
        aria-labelledby="our-works-heading"
        className="relative w-full max-w-[1440px] mx-auto min-h-[1473px]"
      >
        <div className="absolute w-[calc(100%_-_1325px)] top-[264px] left-[108px] h-10">
          <div className="absolute w-[calc(100%_-_2px)] top-0 left-0 h-10 rounded-[19.64px] border-[0.73px] border-solid border-[#e3e3e3]" />
          <h1
            id="our-works-heading"
            className="absolute w-[calc(100%_-_32px)] top-[3px] left-[23px] h-[34px] flex items-center [font-family:'Poppins-Regular',Helvetica] font-normal text-black text-sm tracking-[0.14px] leading-[33.8px]"
          >
            Our Works
          </h1>
        </div>
        <button
          type="button"
          aria-label="Filter projects"
          className="all-unset box-border absolute top-[269px] left-[1247px] w-[85px] h-[41px] bg-[#1a1a1a] rounded-[18.36px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a1a1a] cursor-pointer"
        >
          <img
            className="absolute top-[15px] left-[13px] w-2.5 h-[11px]"
            alt=""
            aria-hidden="true"
            src={vector}
          />
          <span className="absolute top-[calc(50.00%_-_10px)] left-[calc(50.00%_-_8px)] h-[21px] flex items-center justify-center [font-family:'Inter-SemiBold',Helvetica] font-semibold text-white text-[14.3px] text-center tracking-[0] leading-[20.4px] whitespace-nowrap">
            Filter
          </span>
        </button>
        {loading && (
          <div className="absolute top-[500px] left-0 w-full flex justify-center">
            <span className="w-8 h-8 border-4 border-slate-200 border-t-slate-600 rounded-full animate-spin" />
          </div>
        )}

        {!loading && projects.length === 0 && (
          <div className="absolute top-[450px] left-0 w-full flex flex-col items-center gap-3 text-center">
            <p className="[font-family:'Poppins-Regular',Helvetica] text-[#a4a4a4] text-lg">
              No projects yet.
            </p>
            <a
              href="/admin/login"
              className="text-sm text-slate-500 underline underline-offset-2 hover:text-slate-700 transition-colors"
            >
              Add projects from the admin panel →
            </a>
          </div>
        )}

        <div aria-label="Projects gallery" className="relative">
          {projects.map((project, index) => {
            const cardPosition = cardPositions[index % cardPositions.length];
            const textPosition = textPositions[index % textPositions.length];

            const isHttpUrl =
              project.image_url?.startsWith("http") ||
              project.image_url?.startsWith("/") ||
              project.image_url?.startsWith("data:");

            return (
              <article
                key={project.id || `${project.name}-${index}`}
                className="contents cursor-pointer group"
                onClick={() => {
                  if (project.id) {
                    navigate(`/case-study/${project.id}`);
                  }
                }}
              >
                <div
                  className={`absolute ${cardPosition.top} ${cardPosition.left} w-[380px] ${project.imageHeightClassName} ${project.imageRoundedClassName} ${project.imageClassName} bg-cover bg-[50%_50%] transition-transform duration-300 group-hover:scale-[1.03] cursor-pointer`}
                  style={
                    isHttpUrl
                      ? { backgroundImage: `url(${project.image_url})` }
                      : undefined
                  }
                  role="img"
                  aria-label={project.name}
                />
                <h2
                  className={`absolute ${textPosition.titleWidth} ${textPosition.titleTop} ${textPosition.titleLeft} h-[53px] flex items-center [font-family:'Poppins-SemiBold',Helvetica] font-semibold text-[#151515] text-[22px] tracking-[0] leading-[52.6px] whitespace-nowrap cursor-pointer group-hover:text-neutral-700 transition-colors`}
                >
                  {project.name}
                </h2>
                <div
                  className={`absolute ${textPosition.categoryWidth} ${textPosition.categoryTop} ${textPosition.categoryLeft} h-[22px] flex items-center [font-family:'Poppins-Regular',Helvetica] font-normal text-[#424242] text-sm tracking-[0.14px] leading-[22px] whitespace-nowrap cursor-pointer`}
                >
                  {project.category}
                </div>
                <p
                  className={`absolute ${textPosition.descriptionWidth} ${textPosition.descriptionTop} ${textPosition.descriptionLeft} h-11 flex items-center [font-family:'Poppins-Regular',Helvetica] font-normal text-[#a4a4a4] text-sm tracking-[0.14px] leading-[22px] cursor-pointer`}
                >
                  {project.description}
                </p>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};
