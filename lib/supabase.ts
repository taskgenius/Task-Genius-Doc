import { createClient } from "@supabase/supabase-js";

// Environment variable validation
const supabaseUrl = process.env.NEXT_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Missing Supabase environment variables. Please check .env.local file.",
  );
}

/**
 * Supabase client instance
 * Used for interacting with Supabase backend
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false, // No user authentication needed
  },
});

/**
 * Database table type definitions
 */
export interface WaitlistEntry {
  id: string;
  email: string;
  created_at: string;
  metadata?: Record<string, unknown>;
}
