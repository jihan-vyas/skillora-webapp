import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "skillora-server",
  signingKey: process.env.INNGEST_SIGNING_KEY,
});