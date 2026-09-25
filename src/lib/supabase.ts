import { createClient } from "@supabase/supabase-js";
import type { Database } from "../types/database.types";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

// import.meta.env is loosely typed, so a missing or misspelled variable would
// reach createClient as undefined and only surface much later, inside a fetch.
if (!supabaseUrl) {
  throw new Error(
    "Missing VITE_SUPABASE_URL. Add it to .env.local and restart the dev server.",
  );
}
if (!supabasePublishableKey) {
  throw new Error(
    "Missing VITE_SUPABASE_PUBLISHABLE_KEY. Add it to .env.local and restart the dev server.",
  );
}

export const supabase = createClient<Database>(
  supabaseUrl,
  supabasePublishableKey,
);
