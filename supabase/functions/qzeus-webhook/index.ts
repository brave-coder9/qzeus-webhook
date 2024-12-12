// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "jsr:@supabase/supabase-js@2"

Deno.serve(async (req) => {
  const payload = await req.text()
  if (!payload || typeof payload !== "string") {
    return new Response("No payload", { status: 400 })
  }
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL"),
    Deno.env.get("SUPABASE_ANON_KEY"),
    { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  )
  let newRow, err, stat
  const epoch = new Date().getTime()
  if (payload.includes("long")) {
    const { data, error, status } = await supabase.from("qzeus").update({ epoch }).eq("id", "long").select()
    newRow = data
    err = error
    stat = status
  } else if (payload.includes("short")) {
    const { data, error, status } = await supabase.from("qzeus").update({ epoch }).eq("id", "short").select()
    newRow = data
    err = error
    stat = status
  } else if (payload.includes("close")) {
    const { data, error, status } = await supabase.from("qzeus").update({ epoch }).eq("id", "close").select()
    newRow = data
    err = error
    stat = status
  } else {
    return new Response("Invalid payload", { status: 400 })
  }

  if (err) {
    return new Response(err.message, { status: 500 })
  }

  return new Response(
    newRow ? JSON.stringify(newRow) : JSON.stringify({ message: "Row updated successfully" }),
    { headers: { "Content-Type": "application/json" } },
  )
})
