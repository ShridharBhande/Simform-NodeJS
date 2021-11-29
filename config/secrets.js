
// This file will contain secrets related to various third-party services.

module.exports = {
    jwtSecret: 'test-token',
    // Access control configuration for client
    allowedOrigins: '*',
    allowedMethods: 'GET, POST, PUT, DELETE, OPTIONS',
    allowedHeaders: 'Cache-Control, Content-Type, Accept, token',
    exposedHeaders: 'Cache-Control, Content-Type, Accept, token',
};
