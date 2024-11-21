// vite.config.js
import { defineConfig } from "file:///D:/test/StudyNotion/node_modules/vite/dist/node/index.js";
import react from "file:///D:/test/StudyNotion/node_modules/@vitejs/plugin-react/dist/index.mjs";
import autoprefixer from "file:///D:/test/StudyNotion/node_modules/autoprefixer/lib/autoprefixer.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFx0ZXN0XFxcXFN0dWR5Tm90aW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJEOlxcXFx0ZXN0XFxcXFN0dWR5Tm90aW9uXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9EOi90ZXN0L1N0dWR5Tm90aW9uL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSdcclxuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xyXG5pbXBvcnQgYXV0b3ByZWZpeGVyIGZyb20gJ2F1dG9wcmVmaXhlcidcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCldLFxyXG4gIGRlZmluZToge1xyXG4gICAgLy8gU29tZSBsaWJyYXJpZXMgdXNlIHRoZSBnbG9iYWwgb2JqZWN0LCBldmVuIHRob3VnaCBpdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBicm93c2VyLlxyXG4gICAgLy8gQWx0ZXJuYXRpdmVseSwgd2UgY291bGQgYWRkIGA8c2NyaXB0PndpbmRvdy5nbG9iYWwgPSB3aW5kb3c7PC9zY3JpcHQ+YCB0byBpbmRleC5odG1sLlxyXG4gICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL3ZpdGVqcy92aXRlL2Rpc2N1c3Npb25zLzU5MTJcclxuICAgIGdsb2JhbDoge30sXHJcbiAgfSxcclxuICAvLyBjc3M6IHtcclxuICAvLyAgIHBvc3Rjc3M6IHtcclxuICAvLyAgICAgcGx1Z2luczogW1xyXG4gIC8vICAgICAgIGF1dG9wcmVmaXhlciAvLyBhZGQgb3B0aW9ucyBpZiBuZWVkZWRcclxuICAvLyAgICAgXSxcclxuICAvLyAgIH1cclxuICAvLyB9XHJcbn0pXHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBaVAsU0FBUyxvQkFBb0I7QUFDOVEsT0FBTyxXQUFXO0FBQ2xCLE9BQU8sa0JBQWtCO0FBR3pCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVMsQ0FBQyxNQUFNLENBQUM7QUFBQSxFQUNqQixRQUFRO0FBQUE7QUFBQTtBQUFBO0FBQUEsSUFJTixRQUFRLENBQUM7QUFBQSxFQUNYO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFRRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
