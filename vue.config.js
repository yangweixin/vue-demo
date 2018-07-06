module.exports = {
    devServer: {
        port: 10000,
        proxy: {
            '/api': {
                target: 'http://localhost:9006',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    },
    
}