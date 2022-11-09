const request = require('request');
const { httpConstants } = require('../common/constants');

class HTTPService {
  /**
   * execute Http request
   */
  static async executeHTTPRequest (method, hostname, path, data, headers) {
    return await new Promise(function (fulfill, reject) {
      request({
        url: hostname + path,
        method: method,
        headers: headers,
        json: data
      }, function (error, response, body) {
        // console.log('body:-', body);
        if (error) {
          lhtWebLog('executeHTTPRequest', error.message, error, 'AyushK', httpConstants.LOG_LEVEL_TYPE.ERROR);
          reject(error)
        } else {
          fulfill(body)
        }
      })
    })
  }
}

module.exports = HTTPService
