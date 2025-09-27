// vite.config.ts
import { defineConfig } from "file:///C:/projects/pet-search-platform/pet-search-platform/node_modules/vite/dist/node/index.js";
import react from "file:///C:/projects/pet-search-platform/pet-search-platform/node_modules/@vitejs/plugin-react-swc/index.js";
import path from "path";
import { fileURLToPath } from "url";
import svgr from "file:///C:/projects/pet-search-platform/node_modules/vite-plugin-svgr/dist/index.js";
var __vite_injected_original_import_meta_url = "file:///C:/projects/pet-search-platform/pet-search-platform/vite.config.ts";
var __filename = fileURLToPath(__vite_injected_original_import_meta_url);
var __dirname = path.dirname(__filename);
var vite_config_default = defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
      "@ui": path.resolve(__dirname, "./src/ui"),
      "@components": path.resolve(__dirname, "./src/ui/components"),
      "@layouts": path.resolve(__dirname, "./src/ui/layouts"),
      "@features": path.resolve(__dirname, "./src/features"),
      "@state": path.resolve(__dirname, "./src/state"),
      "@data": path.resolve(__dirname, "./src/data"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@icons": path.resolve(__dirname, "./assets/icons"),
      "@entities": path.resolve(__dirname, "./src/entities")
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxwcm9qZWN0c1xcXFxwZXQtc2VhcmNoLXBsYXRmb3JtXFxcXHBldC1zZWFyY2gtcGxhdGZvcm1cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXHByb2plY3RzXFxcXHBldC1zZWFyY2gtcGxhdGZvcm1cXFxccGV0LXNlYXJjaC1wbGF0Zm9ybVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovcHJvamVjdHMvcGV0LXNlYXJjaC1wbGF0Zm9ybS9wZXQtc2VhcmNoLXBsYXRmb3JtL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdC1zd2MnXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xuaW1wb3J0IHsgZmlsZVVSTFRvUGF0aCB9IGZyb20gJ3VybCdcbmltcG9ydCBzdmdyIGZyb20gXCJ2aXRlLXBsdWdpbi1zdmdyXCI7XG5cbmNvbnN0IF9fZmlsZW5hbWUgPSBmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybClcbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShfX2ZpbGVuYW1lKVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKSwgc3ZncigpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQGFwcCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9hcHAnKSxcbiAgICAgICdAdWknOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdWknKSxcbiAgICAgICdAY29tcG9uZW50cyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy91aS9jb21wb25lbnRzJyksXG4gICAgICAnQGxheW91dHMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvdWkvbGF5b3V0cycpLFxuICAgICAgJ0BmZWF0dXJlcyc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9mZWF0dXJlcycpLFxuICAgICAgJ0BzdGF0ZSc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYy9zdGF0ZScpLFxuICAgICAgJ0BkYXRhJzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjL2RhdGEnKSxcbiAgICAgICdAcGFnZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvcGFnZXMnKSxcbiAgICAgICdAaWNvbnMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9hc3NldHMvaWNvbnMnKSxcbiAgICAgICdAZW50aXRpZXMnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvZW50aXRpZXMnKSxcbiAgICB9LFxuICB9LFxufSkiXSwKICAibWFwcGluZ3MiOiAiO0FBQW1WLFNBQVMsb0JBQW9CO0FBQ2hYLE9BQU8sV0FBVztBQUNsQixPQUFPLFVBQVU7QUFDakIsU0FBUyxxQkFBcUI7QUFDOUIsT0FBTyxVQUFVO0FBSm9NLElBQU0sMkNBQTJDO0FBTXRRLElBQU0sYUFBYSxjQUFjLHdDQUFlO0FBQ2hELElBQU0sWUFBWSxLQUFLLFFBQVEsVUFBVTtBQUV6QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztBQUFBLEVBQ3pCLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLFFBQVEsS0FBSyxRQUFRLFdBQVcsV0FBVztBQUFBLE1BQzNDLE9BQU8sS0FBSyxRQUFRLFdBQVcsVUFBVTtBQUFBLE1BQ3pDLGVBQWUsS0FBSyxRQUFRLFdBQVcscUJBQXFCO0FBQUEsTUFDNUQsWUFBWSxLQUFLLFFBQVEsV0FBVyxrQkFBa0I7QUFBQSxNQUN0RCxhQUFhLEtBQUssUUFBUSxXQUFXLGdCQUFnQjtBQUFBLE1BQ3JELFVBQVUsS0FBSyxRQUFRLFdBQVcsYUFBYTtBQUFBLE1BQy9DLFNBQVMsS0FBSyxRQUFRLFdBQVcsWUFBWTtBQUFBLE1BQzdDLFVBQVUsS0FBSyxRQUFRLFdBQVcsYUFBYTtBQUFBLE1BQy9DLFVBQVUsS0FBSyxRQUFRLFdBQVcsZ0JBQWdCO0FBQUEsTUFDbEQsYUFBYSxLQUFLLFFBQVEsV0FBVyxnQkFBZ0I7QUFBQSxJQUN2RDtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
