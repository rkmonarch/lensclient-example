import { LensClient, development } from "@lens-protocol/client";

// Create an instance of the LensClient with the development environment

export const lensClient = new LensClient({
  environment: development,
});
