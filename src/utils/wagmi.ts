import { createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

export const config = createConfig(
  getDefaultConfig({
    appName: "lensclient-example",
    chains: [polygonMumbai],
    autoConnect: true,
    walletConnectProjectId: "",
  })
);

export default config;
