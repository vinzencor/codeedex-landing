import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://nmoupecvwrcpojxrwvxo.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5tb3VwZWN2d3JjcG9qeHJ3dnhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIzODIyNzIsImV4cCI6MjA5Nzk1ODI3Mn0.fCNOX0Ie1ShuBESy1RB4fnJU0uLTd504Mr4pI-ImLQo";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
