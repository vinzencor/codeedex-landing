import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import { AdminLogin } from "./AdminLogin";
import { AdminDashboard } from "./AdminDashboard";

export const AdminPortal = () => {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const fetchSession = async () => {
    const { data: { session: activeSession } } = await supabase.auth.getSession();
    setSession(activeSession);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: activeSession } }) => {
      setSession(activeSession);
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, activeSession) => {
        setSession(activeSession);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center">
        <span className="w-8 h-8 border-4 border-slate-800 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return <AdminLogin onLoginSuccess={fetchSession} />;
  }

  return <AdminDashboard onSignOut={() => setSession(null)} />;
};

export default AdminPortal;
