import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  // 1. SOLUCIÓN AL ERROR DE TURBOPACK:
  // Esto le dice a Next.js que maneje estas librerías como externas
  serverExternalPackages: ["import-in-the-middle", "require-in-the-middle"],

  async redirects() {
    return [
      {
        source: "/",
        destination: "/workflows",
        permanent: false,
      },
    ];
  },
  reactCompiler: true,
};

export default withSentryConfig(nextConfig, {
  org: "cloudvision",
  project: "nodebase",

  silent: !process.env.CI,
  widenClientFileUpload: true,
  tunnelRoute: "/monitoring",

  // 2. SOLUCIÓN A LAS ADVERTENCIAS (DEPRECATION WARNINGS):
  // Las opciones directas 'disableLogger' y 'automaticVercelMonitors'
  // están obsoletas en las versiones más recientes de Sentry.
  // Se recomienda moverlas dentro de 'webpackConfig' o usar los nuevos flags:

  // En lugar de disableLogger: true, Sentry ahora prefiere:
  bundleSizeOptimizations: {
    excludeDebugStatements: true,
  },
});
