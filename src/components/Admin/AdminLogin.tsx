import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

type Mode = "login" | "setup";

export const AdminLogin = ({ onLoginSuccess }: AdminLoginProps) => {
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("codeedex@gmail.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (!signInError) {
      onLoginSuccess();
      setLoading(false);
      return;
    }

    // Account doesn't exist yet — offer to create it
    if (
      signInError.message.toLowerCase().includes("invalid login") ||
      signInError.message.toLowerCase().includes("invalid credentials") ||
      signInError.message.toLowerCase().includes("user not found")
    ) {
      setError(null);
      setInfo("No admin account found. Use the setup below to create it.");
      setMode("setup");
    } else if (signInError.message.toLowerCase().includes("email not confirmed")) {
      setError(
        "Email not confirmed. Check your inbox, or go to Supabase → Authentication → Users and confirm the user manually."
      );
    } else {
      setError(signInError.message);
    }

    setLoading(false);
  };

  const handleSetup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setInfo(null);

    const { data, error: signUpError } = await supabase.auth.signUp({ email, password });

    if (signUpError) {
      // User already exists but maybe unconfirmed
      if (signUpError.message.toLowerCase().includes("already registered")) {
        setError(
          "Account exists but isn't confirmed. Go to Supabase dashboard → Authentication → Users, find this user and confirm them manually."
        );
      } else {
        setError(signUpError.message);
      }
      setLoading(false);
      return;
    }

    // If session returned immediately, email confirmation is off — auto-login
    if (data.session) {
      onLoginSuccess();
      setLoading(false);
      return;
    }

    // Email confirmation is on
    setInfo(
      "Account created! To skip email confirmation: go to Supabase dashboard → Authentication → Providers → Email → disable \"Confirm email\", then come back and log in. Or confirm via the email sent to " +
        email
    );
    setMode("login");
    setLoading(false);
  };

  return (
    <div className="min-h-screen w-full bg-slate-950 flex flex-col items-center justify-center p-6 font-sans relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))]" />
      <div className="absolute -top-[40%] -left-[20%] w-[80%] h-[80%] rounded-full bg-blue-500/10 blur-[120px]" />
      <div className="absolute -bottom-[40%] -right-[20%] w-[80%] h-[80%] rounded-full bg-purple-500/10 blur-[120px]" />

      <div className="w-full max-w-md bg-slate-900/60 border border-slate-800/80 rounded-3xl p-8 md:p-10 backdrop-blur-2xl shadow-2xl relative z-10 flex flex-col gap-6">
        <div className="flex flex-col gap-2 text-center">
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Codeedex Portal
          </h1>
          <p className="text-sm text-slate-400">
            {mode === "login"
              ? "Sign in to manage projects and case studies"
              : "First time? Create your admin account"}
          </p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm px-4 py-3 rounded-2xl leading-relaxed">
            {error}
          </div>
        )}

        {info && (
          <div className="bg-blue-500/10 border border-blue-500/20 text-blue-200 text-sm px-4 py-3 rounded-2xl leading-relaxed">
            {info}
          </div>
        )}

        <form onSubmit={mode === "login" ? handleLogin : handleSetup} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase pl-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-slate-500 text-sm rounded-2xl px-4 py-3.5 outline-none transition-all"
              placeholder="codeedex@gmail.com"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-slate-400 tracking-wider uppercase pl-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              className="w-full bg-slate-950/50 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white placeholder-slate-500 text-sm rounded-2xl px-4 py-3.5 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 disabled:cursor-not-allowed text-white font-medium text-sm rounded-2xl py-3.5 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 transition-all flex items-center justify-center gap-2 mt-2"
          >
            {loading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : mode === "login" ? (
              "Sign In"
            ) : (
              "Create Admin Account"
            )}
          </button>
        </form>

        <div className="flex items-center justify-between mt-2">
          <a href="/" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
            ← Back to Home
          </a>
          <button
            type="button"
            onClick={() => {
              setMode(mode === "login" ? "setup" : "login");
              setError(null);
              setInfo(null);
            }}
            className="text-xs text-slate-500 hover:text-slate-400 transition-colors"
          >
            {mode === "login" ? "First time setup →" : "← Back to login"}
          </button>
        </div>
      </div>
    </div>
  );
};
