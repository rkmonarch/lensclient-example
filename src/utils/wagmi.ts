import { createConfig } from "wagmi";
import { polygonMumbai } from "wagmi/chains";
import { getDefaultConfig } from "connectkit";

// Create the config object for the application
export const config = createConfig(
    getDefaultConfig({
      appName: "lensclient-example", // Specify the name of the application
      chains: [polygonMumbai], // Specify the supported chains, in this case, Polygon Mumbai
      autoConnect: true, // Enable auto connection to the wallet
      walletConnectProjectId: "", // Specify the WalletConnect project ID
    })
  );

export default config;
