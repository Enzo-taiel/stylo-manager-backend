import { createClient } from "@supabase/supabase-js";
import { SUPABASE } from "./../config/variables"

const supabaseUrl = SUPABASE.SUPABASE_URL
const serviceRole = SUPABASE.SUPABASE_SERVICE_ROLE_KEY
export const supabase = createClient(supabaseUrl, serviceRole);
