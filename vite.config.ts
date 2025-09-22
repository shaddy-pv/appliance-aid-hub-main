import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  return {
    server: {
      host: true,
      port: 8080,
      proxy: {
        "/health": {
          target: env.VITE_API_BASE_URL || "http://localhost:4000",
          changeOrigin: true,
        },
        "/api": {
          target: env.VITE_API_BASE_URL || "http://localhost:4000",
          changeOrigin: true,
        },
      },
    },
    plugins: [
      react(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      target: 'esnext',
      minify: 'esbuild',
      sourcemap: mode === 'development',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom'],
            router: ['react-router-dom'],
            ui: ['@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu', '@radix-ui/react-toast'],
            query: ['@tanstack/react-query'],
            firebase: ['firebase/app', 'firebase/auth', 'firebase/firestore'],
            gemini: ['@google/generative-ai'],
          },
        },
      },
      chunkSizeWarningLimit: 1000,
      // Optimize for production
      cssCodeSplit: true,
      reportCompressedSize: true,
    },
    preview: {
      port: 8080,
      host: true,
    },
    // Environment variables
    define: {
      __APP_VERSION__: JSON.stringify(process.env.npm_package_version || '1.0.0'),
    },
    // Optimize dependencies
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        'react-router-dom',
        '@tanstack/react-query',
        'firebase/app',
        'firebase/auth',
        'firebase/firestore',
      ],
    },
  };
});
