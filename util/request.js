const https = require('https')

/**
 * Do a request with options provided.
 *
 * @param {Object} options
 * @param {Object} data
 * @return {Promise} a promise of request
 */
function request(options, data) {
    return new Promise((resolve, reject) => {
        const req = https.request(options, (res) => {
            res.setEncoding('utf8');
            let resBody = '';

            res.on('data', (chunk) => {
                resBody += chunk;
            });

            res.on('end', () => {
                resolve(JSON.parse(resBody));
            });
        });

        req.on('error', (err) => {
            reject(err);
        });

        if (data) {
            if (typeof data !== 'string') {
                data = JSON.stringify(data)
            }
            req.write(data)
        }
        req.end();
    });
}

module.exports = {
    request,
}