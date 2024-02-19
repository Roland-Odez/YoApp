/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
            port: '',
            pathname: '/v0/b/yoapp-ad9da.appspot.com/o/**',
            }
        ]
    }
}

module.exports = nextConfig
