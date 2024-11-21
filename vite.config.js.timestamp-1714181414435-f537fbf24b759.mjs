// vite.config.js
import { defineConfig } from "file:///D:/Web%20Development/MERN/project/MegaProject/client/node_modules/vite/dist/node/index.js";
import react from "file:///D:/Web%20Development/MERN/project/MegaProject/client/node_modules/@vitejs/plugin-react/dist/index.mjs";
import autoprefixer from "file:///D:/Web%20Development/MERN/project/MegaProject/client/node_modules/autoprefixer/lib/autoprefixer.js";
var vite_config_default = defineConfig({
  plugins: [react()],
  define: {
    // Some libraries use the global object, even though it doesn't exist in the browser.
    // Alternatively, we could add `<script>window.global = window;</script>` to index.html.
    // https://github.com/vitejs/vite/discussions/5912
    global: {}
  }
  // css: {
  //   postcss: {
  //     plugins: [
  //       autoprefixer // add options if needed
  //     ],
  //   }
  // }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxXZWIgRGV2ZWxvcG1lbnRcXFxcTUVSTlxcXFxwcm9qZWN0XFxcXE1lZ2FQcm9qZWN0XFxcXGNsaWVudFwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRDpcXFxcV2ViIERldmVsb3BtZW50XFxcXE1FUk5cXFxccHJvamVjdFxcXFxNZWdhUHJvamVjdFxcXFxjbGllbnRcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0Q6L1dlYiUyMERldmVsb3BtZW50L01FUk4vcHJvamVjdC9NZWdhUHJvamVjdC9jbGllbnQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IGF1dG9wcmVmaXhlciBmcm9tICdhdXRvcHJlZml4ZXInXG5cbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbcmVhY3QoKV0sXG4gIGRlZmluZToge1xuICAgIC8vIFNvbWUgbGlicmFyaWVzIHVzZSB0aGUgZ2xvYmFsIG9iamVjdCwgZXZlbiB0aG91Z2ggaXQgZG9lc24ndCBleGlzdCBpbiB0aGUgYnJvd3Nlci5cbiAgICAvLyBBbHRlcm5hdGl2ZWx5LCB3ZSBjb3VsZCBhZGQgYDxzY3JpcHQ+d2luZG93Lmdsb2JhbCA9IHdpbmRvdzs8L3NjcmlwdD5gIHRvIGluZGV4Lmh0bWwuXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2Rpc2N1c3Npb25zLzU5MTJcbiAgICBnbG9iYWw6IHt9LFxuICB9LFxuICAvLyBjc3M6IHtcbiAgLy8gICBwb3N0Y3NzOiB7XG4gIC8vICAgICBwbHVnaW5zOiBbXG4gIC8vICAgICAgIGF1dG9wcmVmaXhlciAvLyBhZGQgb3B0aW9ucyBpZiBuZWVkZWRcbiAgLy8gICAgIF0sXG4gIC8vICAgfVxuICAvLyB9XG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzVixTQUFTLG9CQUFvQjtBQUNuWCxPQUFPLFdBQVc7QUFDbEIsT0FBTyxrQkFBa0I7QUFHekIsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLE1BQU0sQ0FBQztBQUFBLEVBQ2pCLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFBQSxJQUlOLFFBQVEsQ0FBQztBQUFBLEVBQ1g7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
