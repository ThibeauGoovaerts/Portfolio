import { createClient } from "@sanity/client";

// Configuration required to retrieve data from Sanity.io
// We create a new client
export default createClient({
  projectId: "zk9p4t5n",
  dataset: "production",
  apiVersion: "2023-05-03",
  useCdn: false,
});
