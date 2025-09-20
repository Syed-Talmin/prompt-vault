import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";


export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
    VitePWA({
      manifest: {
        name: "Prompt Vault",
        short_name: "PV",
        description:
          "Unlock the full potential of your creativity with Prompt Vault – your personal hub for saving, organizing, and managing prompts. Whether you’re a writer, designer, developer, or AI enthusiast, Prompt Vault keeps all your best ideas at your fingertips.\n\n✨ Features:\n\nSave and categorize prompts for easy access\n\nOrganize with tags, folders, or collections\n\nQuickly search and retrieve your favorite prompts\n\nShare prompts with your team or community\n\nAccess your vault anytime, anywhere via the web\n\nStop losing track of your best ideas. With Prompt Vault, you’ll always have the right prompt ready when inspiration strikes.",
        theme_color: "#22c55e",
        background_color: "#0a0a0a",
        display: "standalone",
        start_url: ".",
        icons: [
          {
            src: "icons/icon_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon_512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "icons/maskable_192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/maskable_512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      registerType: "autoUpdate",
    }),
  ],
});
