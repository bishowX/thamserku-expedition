import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/dev/vite";
import { amplifyHosting } from "vite-plugin-react-router-amplify-hosting";

function figmaAssetResolver() {
  return {
    name: "figma-asset-resolver",
    resolveId(id: string) {
      if (id.startsWith("figma:asset/")) {
        const filename = id.replace("figma:asset/", "");
        return path.resolve(__dirname, "src/assets", filename);
      }
    },
  };
}

export default defineConfig({
  plugins: [figmaAssetResolver(), reactRouter(), tailwindcss(), amplifyHosting()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    noExternal: ["gsap", "@gsap/react"],
  },
  optimizeDeps: {
    // SanityVisualEditing is lazy-loaded (only mounts in preview mode), so Vite's
    // dep crawler can miss it at cold start and re-optimize it later mid-session
    // in a separate chunk generation from the rest of the app — that gives the
    // page two live React copies and VisualEditing crashes with "Cannot read
    // properties of null (reading 'useMemo')". Force it into the initial scan.
    include: ["@sanity/visual-editing/react-router"],
  },
  assetsInclude: ["**/*.svg", "**/*.csv"],
  server: {
    allowedHosts: true,
  },
});
