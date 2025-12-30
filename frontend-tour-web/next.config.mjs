import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'flagcdn.com',
            },
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com'
            }
        ],
    },
};

export default withNextIntl(nextConfig);