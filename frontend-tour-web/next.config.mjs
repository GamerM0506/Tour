import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512],
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                pathname: '/**',
            }
        ],
        formats: ['image/avif', 'image/webp'],
    },
    
    bundlePagesRouterDependencies: true,
};

export default withNextIntl(nextConfig);