var config = {
    development: require('./environments/development')
};

/**
 * set the env variable 'process.env.NODE_ENV' to 'development' for development server.
 * 
 */
module.exports = config[process.env.NODE_ENV || 'development'];