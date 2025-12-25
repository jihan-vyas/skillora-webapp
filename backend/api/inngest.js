import { serve } from "inngest/express";
import { inngest } from "../inngest/client.js";

export default serve({
  client: inngest,
  functions: [],
});