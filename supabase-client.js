const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();
const { exec } = require("child_process");

const openUrl = (url) => {
  const platform = process.platform;

  let command;

  if (platform === "win32") {
    command = `start ${url}`;
  } else if (platform === "darwin") {
    command = `open ${url}`;
  } else {
    command = `xdg-open ${url}`;
  }

  exec(command, (error) => {
    if (error) {
      console.error(`Error opening browser: ${error}`);
    } else {
      console.log("Browser opened successfully");
    }
  });
};

const openSpecificUrl = (type) => {
  if (type === "long") {
    openUrl(
      "https://trigger.keyboardmaestro.com/t/C272AE09-7B99-4117-AE8E-8F381FC35C4E/8E5B3149-0312-4B69-B6FC-9D3A02522FFD?TriggerValue"
    );
  } else if (type === "short") {
    openUrl(
      "https://trigger.keyboardmaestro.com/t/C272AE09-7B99-4117-AE8E-8F381FC35C4E/C9978B9D-8002-47A1-BAF7-EC830FCEC41E?TriggerValue"
    );
  } else if (type === "close") {
    openUrl(
      "https://trigger.keyboardmaestro.com/t/C272AE09-7B99-4117-AE8E-8F381FC35C4E/D5EE2796-E9FC-4979-B789-2238D96D77C3?TriggerValue"
    );
  } else {
    console.log("Invalid type: type must be one of [long, short, close]");
  }
};

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

const subscription = supabase
  .channel("public:qzeus")
  .on(
    "postgres_changes",
    {
      event: "*",
      schema: "public",
      table: "qzeus",
    },
    (payload) => {
      console.log(`id = ${payload.new.id}, epoch = ${payload.new.epoch}`);
      openSpecificUrl(payload.new.id);
    }
  )
  .subscribe();

subscription.on("SUBSCRIBED", () => {
  console.log("Subscribed to qzeus channel");
});

subscription.on("ERROR", (error) => {
  console.error("Error subscribing to qzeus channel:", error);
});

process.stdin.resume();
