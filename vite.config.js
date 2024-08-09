import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            find: './runtimeConfig',
            replacement: './runtimeConfig.browser', // ensures browser compatible version of AWS JS SDK is used
        },
    }
});
