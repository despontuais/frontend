import createNextIntlPlugin from 'next-intl/plugin';
const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */

const nextConfig = {
    reactStrictMode: true,
    headers: async () => {
        return[
            {
                source: '/api/:path*',
                headers: [
                    {key: 'Acess-Control-Allow-Origin', value: '*'}
                ]
            }
        ]
    }
};

export default withNextIntl(nextConfig);
