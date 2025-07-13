/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    // Habilita o polling para que o hot-reload funcione corretamente no Docker
    config.watchOptions = {
      poll: 1000, // Verifica por alterações a cada 1 segundo
      aggregateTimeout: 300, // Agrupa múltiplas alterações em uma única reconstrução
    };
    return config;
  },
};

export default nextConfig;