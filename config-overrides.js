module.exports = function override(config) {
    config.resolve.fallback = {
        path: false,
        crypto: false,
        fs: false
    };

    return config;
};



