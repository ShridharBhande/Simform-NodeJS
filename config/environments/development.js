// All the app configuration values should be added here.

module.exports = {
    apiVersion: 'v1',
    server: 'dev',
    host: 'http://localhost', // Add the domain name or domain ip once this code will be on server.
    dev: {
        host: 'http://localhost',
        port: 3001
    },

    database: {
        host: 'localhost',
        port: '27017',
        dbName: 'simform-db',
        username: 'simform-db',
        password: 's1mf0rM'
    },

    excludedRoutes: [
        '/users/login',
        '/users/signup'
    ]
};
