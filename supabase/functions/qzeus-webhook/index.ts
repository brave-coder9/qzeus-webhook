// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
// import { createClient } from "jsr:@supabase/supabase-js@2"

const openUrl = async (type) => {
  let response
  if (type === "long") {
    response = await fetch("https://trigger.keyboardmaestro.com/t/C272AE09-7B99-4117-AE8E-8F381FC35C4E/8E5B3149-0312-4B69-B6FC-9D3A02522FFD?TriggerValue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
  } else if (type === "short") {
    response = await fetch("https://trigger.keyboardmaestro.com/t/C272AE09-7B99-4117-AE8E-8F381FC35C4E/C9978B9D-8002-47A1-BAF7-EC830FCEC41E?TriggerValue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
  } else if (type === "close") {
    response = await fetch("https://trigger.keyboardmaestro.com/t/C272AE09-7B99-4117-AE8E-8F381FC35C4E/D5EE2796-E9FC-4979-B789-2238D96D77C3?TriggerValue", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
  } else {
    console.log("Invalid type: type must be one of [long, short, close]");
  }
  return response
}

Deno.serve(async (req) => {
  const payload = await req.text()
  if (!payload || typeof payload !== "string") {
    console.log({ bad: payload })
    return new Response("No payload", { status: 400 })
  }
  console.log({ good: payload })
  // const supabase = createClient(
  //   Deno.env.get("SUPABASE_URL"),
  //   Deno.env.get("SUPABASE_ANON_KEY"),
  //   { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
  // )
  // let newRow, err, stat
  // const epoch = new Date().getTime()
  if (payload.includes("long")) {
    openUrl("long")
    // const { data, error, status } = await supabase.from("qzeus").update({ epoch }).eq("id", "long").select()
    // newRow = data
    // err = error
    // stat = status
  } else if (payload.includes("short")) {
    openUrl("short")
    // const { data, error, status } = await supabase.from("qzeus").update({ epoch }).eq("id", "short").select()
    // newRow = data
    // err = error
    // stat = status
  } else if (payload.includes("close")) {
    openUrl("close")
    // const { data, error, status } = await supabase.from("qzeus").update({ epoch }).eq("id", "close").select()
    // newRow = data
    // err = error
    // stat = status
  } else {
    console.log(`Invalid payload: ${payload}`)
    return new Response("Invalid payload", { status: 400 })
  }

  // if (err) {
  //   return new Response(err.message, { status: 500 })
  // }

  return new Response(
    "success",
    { headers: { "Content-Type": "application/json" } },
  )
})
