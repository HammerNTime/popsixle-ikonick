import react from "@vitejs/plugin-react";
import "dotenv/config";

/**
 * @type {import('vite').UserConfig}
 */
export default {
  define: {
    "process.env.SHOPIFY_API_KEY": JSON.stringify(process.env.SHOPIFY_API_KEY),
    "process.env.SHOP": JSON.stringify(process.env.SHOP),
    "process.env.REACT_APP_INSTANCE": JSON.stringify(
      process.env.REACT_APP_INSTANCE
    ),
    "process.env.REACT_APP_SCRIPT": JSON.stringify(
      process.env.REACT_APP_SCRIPT
    ),
  },
  plugins: [react()],
};
