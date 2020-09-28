module.exports = {
    apps: [{
        name: 'yehocehr',
        script: './bin/www',
        args: 'yehocher',
        instances: 1,
        autorestart: true,
        watch: false,
        env: {
            NODE_ENV: 'development'
        },
        env_production: {
            NODE_ENV: 'production',
            PORT: 8888
        }
    }]
};