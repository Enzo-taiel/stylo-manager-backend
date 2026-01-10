import { createClient } from "@supabase/supabase-js";
import { ENV } from "../../config/env"

const supabaseUrl = ENV.SUPABASE.URL
const serviceRole = ENV.SUPABASE.SERVICE_ROLE_KEY
export const supabase = createClient(supabaseUrl, serviceRole);
