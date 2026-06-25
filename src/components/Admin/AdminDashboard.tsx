import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

interface AdminDashboardProps {
  onSignOut: () => void;
}

interface Project {
  id?: string;
  name: string;
  category: string;
  description: string;
  image_url: string;
  image_height_class: string;
  image_rounded_class: string;
  order_index: number;
}

interface CaseStudy {
  id?: string;
  project_id?: string;
  client: string;
  industry: string;
  services: string;
  timeline: string;
  overview: string;
  challenge: string;
  result: string;
  testimonial_quote: string;
  testimonial_author: string;
  testimonial_role: string;
  highlight1_title: string;
  highlight1_desc: string;
  highlight1_image: string;
  highlight2_title: string;
  highlight2_desc: string;
  highlight2_image: string;
  live_url: string;
}

export const AdminDashboard = ({ onSignOut }: AdminDashboardProps) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [caseStudy, setCaseStudy] = useState<CaseStudy | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dbStatusError, setDbStatusError] = useState(false);

  // Form states for project
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageHeightClass, setImageHeightClass] = useState("h-[309px]");
  const [imageRoundedClass, setImageRoundedClass] = useState("rounded-[26.95px]");
  const [orderIndex, setOrderIndex] = useState(0);

  // Form states for case study
  const [client, setClient] = useState("");
  const [industry, setIndustry] = useState("");
  const [services, setServices] = useState("");
  const [timeline, setTimeline] = useState("");
  const [overview, setOverview] = useState("");
  const [challenge, setChallenge] = useState("");
  const [result, setResult] = useState("");
  const [testimonialQuote, setTestimonialQuote] = useState("");
  const [testimonialAuthor, setTestimonialAuthor] = useState("");
  const [testimonialRole, setTestimonialRole] = useState("");
  const [highlight1Title, setHighlight1Title] = useState("");
  const [highlight1Desc, setHighlight1Desc] = useState("");
  const [highlight1Image, setHighlight1Image] = useState("");
  const [highlight2Title, setHighlight2Title] = useState("");
  const [highlight2Desc, setHighlight2Desc] = useState("");
  const [highlight2Image, setHighlight2Image] = useState("");
  const [liveUrl, setLiveUrl] = useState("");

  const [uploadingImage, setUploadingImage] = useState(false);

  const sqlSetupCode = `-- Copy and paste this in your Supabase SQL Editor:

-- 1. Create projects table
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    category TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    image_height_class TEXT DEFAULT 'h-[309px]',
    image_rounded_class TEXT DEFAULT 'rounded-[26.95px]',
    order_index INT DEFAULT 0
);

-- Enable RLS on projects
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

-- Allow read access to projects
CREATE POLICY "Allow public read access" ON public.projects FOR SELECT TO public USING (true);

-- Allow write access to projects
CREATE POLICY "Allow authenticated user write access" ON public.projects FOR ALL TO authenticated USING (true);

-- 2. Create case_studies table
CREATE TABLE IF NOT EXISTS public.case_studies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE UNIQUE,
    created_at TIMESTAMPTZ DEFAULT now(),
    client TEXT,
    industry TEXT,
    services TEXT,
    timeline TEXT,
    overview TEXT,
    challenge TEXT,
    result TEXT,
    testimonial_quote TEXT,
    testimonial_author TEXT,
    testimonial_role TEXT,
    highlight1_title TEXT,
    highlight1_desc TEXT,
    highlight1_image TEXT,
    highlight2_title TEXT,
    highlight2_desc TEXT,
    highlight2_image TEXT,
    live_url TEXT
);

-- Enable RLS on case_studies
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;

-- Allow read access to case_studies
CREATE POLICY "Allow public read access" ON public.case_studies FOR SELECT TO public USING (true);

-- Allow write access to case_studies
CREATE POLICY "Allow authenticated user write access" ON public.case_studies FOR ALL TO authenticated USING (true);
`;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setDbStatusError(false);
    try {
      const { data, error: fetchErr } = await supabase
        .from("projects")
        .select("*")
        .order("order_index", { ascending: true });

      if (fetchErr) {
        if (fetchErr.message.includes("does not exist")) {
          setDbStatusError(true);
        }
        setError(fetchErr.message);
      } else {
        setProjects(data || []);
      }
    } catch (err: any) {
      setError(err.message || "Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  const handleSelectProject = async (project: Project) => {
    setSelectedProject(project);
    setName(project.name);
    setCategory(project.category);
    setDescription(project.description || "");
    setImageUrl(project.image_url || "");
    setImageHeightClass(project.image_height_class || "h-[309px]");
    setImageRoundedClass(project.image_rounded_class || "rounded-[26.95px]");
    setOrderIndex(project.order_index || 0);

    // Fetch case study
    setCaseStudy(null);
    setClient("");
    setIndustry("");
    setServices("");
    setTimeline("");
    setOverview("");
    setChallenge("");
    setResult("");
    setTestimonialQuote("");
    setTestimonialAuthor("");
    setTestimonialRole("");
    setHighlight1Title("");
    setHighlight1Desc("");
    setHighlight1Image("");
    setHighlight2Title("");
    setHighlight2Desc("");
    setHighlight2Image("");
    setLiveUrl("");

    if (project.id) {
      try {
        const { data } = await supabase
          .from("case_studies")
          .select("*")
          .eq("project_id", project.id)
          .single();

        if (data) {
          setCaseStudy(data);
          setClient(data.client || "");
          setIndustry(data.industry || "");
          setServices(data.services || "");
          setTimeline(data.timeline || "");
          setOverview(data.overview || "");
          setChallenge(data.challenge || "");
          setResult(data.result || "");
          setTestimonialQuote(data.testimonial_quote || "");
          setTestimonialAuthor(data.testimonial_author || "");
          setTestimonialRole(data.testimonial_role || "");
          setHighlight1Title(data.highlight1_title || "");
          setHighlight1Desc(data.highlight1_desc || "");
          setHighlight1Image(data.highlight1_image || "");
          setHighlight2Title(data.highlight2_title || "");
          setHighlight2Desc(data.highlight2_desc || "");
          setHighlight2Image(data.highlight2_image || "");
          setLiveUrl(data.live_url || "");
        }
      } catch (err) {
        console.log("No case study details found or error:", err);
      }
    }
  };

  const handleCreateNewClick = () => {
    setSelectedProject({
      name: "",
      category: "",
      description: "",
      image_url: "",
      image_height_class: "h-[309px]",
      image_rounded_class: "rounded-[26.95px]",
      order_index: projects.length,
    });
    setCaseStudy(null);
    setName("");
    setCategory("");
    setDescription("");
    setImageUrl("");
    setImageHeightClass("h-[309px]");
    setImageRoundedClass("rounded-[26.95px]");
    setOrderIndex(projects.length);

    setClient("");
    setIndustry("");
    setServices("");
    setTimeline("");
    setOverview("");
    setChallenge("");
    setResult("");
    setTestimonialQuote("");
    setTestimonialAuthor("");
    setTestimonialRole("");
    setHighlight1Title("");
    setHighlight1Desc("");
    setHighlight1Image("");
    setHighlight2Title("");
    setHighlight2Desc("");
    setHighlight2Image("");
    setLiveUrl("");
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setUploadingImage(true);
    setError(null);

    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `project-images/${fileName}`;

      // Upload file to the storage bucket "projects"
      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(filePath, file);

      if (uploadError) {
        throw new Error(`Upload failed: ${uploadError.message}. Make sure the bucket 'projects' exists and is public.`);
      }

      // Get public URL
      const { data } = supabase.storage.from("projects").getPublicUrl(filePath);
      setImageUrl(data.publicUrl);
    } catch (err: any) {
      setError(err.message || "Failed to upload image. Make sure storage bucket 'projects' exists.");
    } finally {
      setUploadingImage(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !category) {
      setError("Name and category are required");
      return;
    }

    setSaving(true);
    setError(null);

    try {
      let savedProject: Project;

      if (selectedProject?.id) {
        // Update existing project
        const { data, error: updateErr } = await supabase
          .from("projects")
          .update({
            name,
            category,
            description,
            image_url: imageUrl,
            image_height_class: imageHeightClass,
            image_rounded_class: imageRoundedClass,
            order_index: orderIndex,
          })
          .eq("id", selectedProject.id)
          .select()
          .single();

        if (updateErr) throw updateErr;
        savedProject = data;
      } else {
        // Insert new project
        const { data, error: insertErr } = await supabase
          .from("projects")
          .insert({
            name,
            category,
            description,
            image_url: imageUrl,
            image_height_class: imageHeightClass,
            image_rounded_class: imageRoundedClass,
            order_index: orderIndex,
          })
          .select()
          .single();

        if (insertErr) throw insertErr;
        savedProject = data;
      }

      // Save/Update Case Study
      if (savedProject.id) {
        const payload = {
          project_id: savedProject.id,
          client,
          industry,
          services,
          timeline,
          overview,
          challenge,
          result,
          testimonial_quote: testimonialQuote,
          testimonial_author: testimonialAuthor,
          testimonial_role: testimonialRole,
          highlight1_title: highlight1Title,
          highlight1_desc: highlight1Desc,
          highlight1_image: highlight1Image,
          highlight2_title: highlight2Title,
          highlight2_desc: highlight2Desc,
          highlight2_image: highlight2Image,
          live_url: liveUrl,
        };

        if (caseStudy?.id) {
          const { error: csUpdateErr } = await supabase
            .from("case_studies")
            .update(payload)
            .eq("id", caseStudy.id);

          if (csUpdateErr) throw csUpdateErr;
        } else {
          const { error: csInsertErr } = await supabase
            .from("case_studies")
            .insert(payload);

          if (csInsertErr) throw csInsertErr;
        }
      }

      await fetchProjects();
      setSelectedProject(null);
      setCaseStudy(null);
    } catch (err: any) {
      setError(err.message || "Failed to save project details");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedProject?.id) return;
    if (!window.confirm("Are you sure you want to delete this project? This will also delete the associated case study.")) return;

    setSaving(true);
    setError(null);

    try {
      const { error: deleteErr } = await supabase
        .from("projects")
        .delete()
        .eq("id", selectedProject.id);

      if (deleteErr) throw deleteErr;

      await fetchProjects();
      setSelectedProject(null);
      setCaseStudy(null);
    } catch (err: any) {
      setError(err.message || "Failed to delete project");
    } finally {
      setSaving(false);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    onSignOut();
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Header */}
      <header className="border-b border-slate-900 bg-slate-950/80 backdrop-blur px-8 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-white">Codeedex Admin</span>
          <span className="bg-blue-500/10 text-blue-400 text-xs px-2.5 py-1 rounded-full font-medium border border-blue-500/20">
            Console
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={fetchProjects}
            className="text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors px-3 py-1.5 rounded-lg hover:bg-slate-900 border border-transparent hover:border-slate-800"
          >
            Refresh Data
          </button>
          <button
            onClick={handleSignOut}
            className="bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold px-4 py-2 rounded-xl transition-all border border-slate-800"
          >
            Sign Out
          </button>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-80 border-r border-slate-900 overflow-y-auto p-6 flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm font-semibold tracking-wider uppercase text-slate-400">
              Projects
            </h2>
            <button
              onClick={handleCreateNewClick}
              className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-all"
            >
              + Create New
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <span className="w-6 h-6 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-8 text-xs text-slate-500 border border-dashed border-slate-900 rounded-2xl p-4">
              {dbStatusError ? "Database tables not found." : "No projects found. Click create new."}
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {projects.map((project) => (
                <button
                  key={project.id}
                  onClick={() => handleSelectProject(project)}
                  className={`w-full text-left p-4 rounded-2xl border transition-all ${
                    selectedProject?.id === project.id
                      ? "bg-slate-900 border-blue-500/50 shadow-lg shadow-blue-500/5"
                      : "bg-slate-900/40 border-slate-900 hover:bg-slate-900/60"
                  }`}
                >
                  <div className="font-semibold text-white text-sm truncate">{project.name}</div>
                  <div className="text-xs text-slate-400 mt-1 truncate">{project.category}</div>
                </button>
              ))}
            </div>
          )}

          {/* Database Setup Helper Widget */}
          {dbStatusError && (
            <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 mt-auto">
              <div className="font-bold text-xs text-yellow-300 uppercase tracking-wider">
                Action Required
              </div>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                The database tables do not exist yet. Please paste the setup SQL into the SQL Editor in Supabase.
              </p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(sqlSetupCode);
                  alert("SQL setup code copied to clipboard!");
                }}
                className="w-full mt-3 bg-yellow-600/20 hover:bg-yellow-600/30 text-yellow-300 text-xs font-semibold py-2 rounded-xl transition-all border border-yellow-500/30"
              >
                Copy Setup SQL
              </button>
            </div>
          )}
        </aside>

        {/* Editor Main Section */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-950">
          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm px-6 py-4 rounded-2xl mb-6 flex justify-between items-center">
              <span>{error}</span>
              <button onClick={() => setError(null)} className="text-xs text-red-400 hover:text-red-300">
                Dismiss
              </button>
            </div>
          )}

          {!selectedProject ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-lg mx-auto gap-4">
              <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 font-bold text-lg">
                ℹ
              </div>
              <h3 className="font-semibold text-lg text-white">No Project Selected</h3>
              <p className="text-sm text-slate-400">
                Select a project from the sidebar to edit it, or click "+ Create New" to create a new project.
              </p>
              {dbStatusError && (
                <div className="border border-slate-900 bg-slate-900/30 p-6 rounded-3xl w-full text-left mt-4 flex flex-col gap-3">
                  <span className="font-bold text-xs tracking-wider text-slate-400 uppercase">
                    Supabase Setup SQL
                  </span>
                  <pre className="text-[10px] bg-slate-950 border border-slate-900 p-4 rounded-xl max-h-40 overflow-y-auto text-slate-400 font-mono">
                    {sqlSetupCode}
                  </pre>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(sqlSetupCode);
                      alert("SQL setup code copied to clipboard!");
                    }}
                    className="bg-blue-600/10 hover:bg-blue-600/20 text-blue-400 border border-blue-500/20 text-xs font-semibold py-2.5 rounded-xl transition-all"
                  >
                    Copy SQL Script
                  </button>
                </div>
              )}
            </div>
          ) : (
            <form onSubmit={handleSave} className="max-w-4xl mx-auto flex flex-col gap-8 pb-20">
              <div className="flex justify-between items-center border-b border-slate-900 pb-4">
                <div>
                  <h3 className="font-semibold text-xl text-white">
                    {selectedProject.id ? `Edit Project: ${selectedProject.name}` : "New Project"}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Fill in the project details and the case study design parameters below
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  {selectedProject.id && (
                    <button
                      type="button"
                      onClick={handleDelete}
                      disabled={saving}
                      className="bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                    >
                      Delete
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition-all flex items-center gap-2"
                  >
                    {saving ? (
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Save Details"
                    )}
                  </button>
                </div>
              </div>

              {/* Grid sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basic Card Details */}
                <div className="bg-slate-900/30 border border-slate-900/60 p-6 rounded-3xl flex flex-col gap-5">
                  <h4 className="font-bold text-xs text-blue-400 tracking-wider uppercase">
                    1. Card Settings (Our Works Page)
                  </h4>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Project Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="e.g. Colors Boutique"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Category</label>
                    <input
                      type="text"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      required
                      placeholder="e.g. E-commerce Platform"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Short Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      rows={3}
                      placeholder="Enter card description..."
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Display Order Index</label>
                    <input
                      type="number"
                      value={orderIndex}
                      onChange={(e) => setOrderIndex(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Visual Settings / Image Manager */}
                <div className="bg-slate-900/30 border border-slate-900/60 p-6 rounded-3xl flex flex-col gap-5">
                  <h4 className="font-bold text-xs text-blue-400 tracking-wider uppercase">
                    2. Card Aesthetics
                  </h4>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Upload Project Image</label>
                    <input
                      type="file"
                      onChange={handleImageUpload}
                      accept="image/*"
                      className="text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 file:cursor-pointer"
                    />
                    {uploadingImage && (
                      <span className="text-xs text-blue-400 mt-1 flex items-center gap-1.5 animate-pulse">
                        Uploading to Supabase storage...
                      </span>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">
                      Image URL or CSS background Class (fallback)
                    </label>
                    <input
                      type="text"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="e.g. https://... or bg-[url(/frame-1171275605.png)]"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Image Height Class</label>
                    <input
                      type="text"
                      value={imageHeightClass}
                      onChange={(e) => setImageHeightClass(e.target.value)}
                      placeholder="e.g. h-[309px]"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Image Rounded Class</label>
                    <input
                      type="text"
                      value={imageRoundedClass}
                      onChange={(e) => setImageRoundedClass(e.target.value)}
                      placeholder="e.g. rounded-[26.95px]"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Case Study Details Editor */}
              <div className="bg-slate-900/30 border border-slate-900/60 p-8 rounded-3xl flex flex-col gap-6">
                <h4 className="font-bold text-xs text-purple-400 tracking-wider uppercase border-b border-slate-900 pb-3">
                  3. Case Study Details (Full Template Design Fields)
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Client</label>
                    <input
                      type="text"
                      value={client}
                      onChange={(e) => setClient(e.target.value)}
                      placeholder="e.g. Colors Boutique"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Industry</label>
                    <input
                      type="text"
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      placeholder="e.g. Fashion & Apparel, E-commerce"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Services</label>
                    <input
                      type="text"
                      value={services}
                      onChange={(e) => setServices(e.target.value)}
                      placeholder="e.g. UI/UX Design, Web Design"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Timeline</label>
                    <input
                      type="text"
                      value={timeline}
                      onChange={(e) => setTimeline(e.target.value)}
                      placeholder="e.g. 6 Weeks"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-slate-400">Product Overview Text</label>
                  <textarea
                    value={overview}
                    onChange={(e) => setOverview(e.target.value)}
                    rows={4}
                    placeholder="Enter full overview description..."
                    className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">The Challenge Text</label>
                    <textarea
                      value={challenge}
                      onChange={(e) => setChallenge(e.target.value)}
                      rows={5}
                      placeholder="Describe the challenge..."
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">The Result Text</label>
                    <textarea
                      value={result}
                      onChange={(e) => setResult(e.target.value)}
                      rows={5}
                      placeholder="Describe the result..."
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Testimonial card parameters */}
                <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-900 flex flex-col gap-4">
                  <span className="font-bold text-xs text-slate-400 tracking-wide uppercase">
                    Testimonial Settings
                  </span>

                  <div className="flex flex-col gap-2">
                    <label className="text-xs text-slate-400">Testimonial Quote</label>
                    <textarea
                      value={testimonialQuote}
                      onChange={(e) => setTestimonialQuote(e.target.value)}
                      rows={3}
                      placeholder="Quote..."
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-slate-400">Author Name</label>
                      <input
                        type="text"
                        value={testimonialAuthor}
                        onChange={(e) => setTestimonialAuthor(e.target.value)}
                        placeholder="Marcus Chen"
                        className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-xs text-slate-400">Author Role/Subtitle</label>
                      <input
                        type="text"
                        value={testimonialRole}
                        onChange={(e) => setTestimonialRole(e.target.value)}
                        placeholder="FOUNDER, SWEET LABAN"
                        className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Highlights cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-900 flex flex-col gap-4">
                    <span className="font-bold text-xs text-slate-400 tracking-wide uppercase">
                      Highlight 1
                    </span>
                    <input
                      type="text"
                      value={highlight1Title}
                      onChange={(e) => setHighlight1Title(e.target.value)}
                      placeholder="Title (e.g. User-Centered Design)"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all text-xs"
                    />
                    <textarea
                      value={highlight1Desc}
                      onChange={(e) => setHighlight1Desc(e.target.value)}
                      rows={3}
                      placeholder="Description..."
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all text-xs"
                    />
                    <input
                      type="text"
                      value={highlight1Image}
                      onChange={(e) => setHighlight1Image(e.target.value)}
                      placeholder="Image URL or fallback class"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all text-xs"
                    />
                  </div>

                  <div className="bg-slate-950/40 p-6 rounded-2xl border border-slate-900 flex flex-col gap-4">
                    <span className="font-bold text-xs text-slate-400 tracking-wide uppercase">
                      Highlight 2
                    </span>
                    <input
                      type="text"
                      value={highlight2Title}
                      onChange={(e) => setHighlight2Title(e.target.value)}
                      placeholder="Title (e.g. Responsive Experience)"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all text-xs"
                    />
                    <textarea
                      value={highlight2Desc}
                      onChange={(e) => setHighlight2Desc(e.target.value)}
                      rows={3}
                      placeholder="Description..."
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all text-xs"
                    />
                    <input
                      type="text"
                      value={highlight2Image}
                      onChange={(e) => setHighlight2Image(e.target.value)}
                      placeholder="Image URL or fallback class"
                      className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all text-xs"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs text-slate-400">Live Website URL</label>
                  <input
                    type="text"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    placeholder="e.g. https://coloursboutique.com"
                    className="w-full bg-slate-950/50 border border-slate-800 focus:border-purple-500 text-white text-sm rounded-xl px-4 py-2.5 outline-none transition-all"
                  />
                </div>
              </div>
            </form>
          )}
        </main>
      </div>
    </div>
  );
};
