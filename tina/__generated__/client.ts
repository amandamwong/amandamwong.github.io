import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '441271e3b12a865a9d1d9de44e0a1102e3bdbeee', queries,  });
export default client;
  