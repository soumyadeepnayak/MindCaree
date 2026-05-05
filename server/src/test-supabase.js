import { supabase } from "./supabaseClient.js";

async function test() {
  const { data, error } = await supabase.from("users").select("*").limit(1);
  console.log("Users:", data);
  if (error) console.error("Error:", error);
}

test();
