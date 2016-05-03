module.exports = {
  request: function reqAPI(method, url) {
    var newPromise = new Promise(function (resolve, reject) {
      var req = new XMLHttpRequest();
      req.open(method, url);
      req.onload = function statusCheck() {
        if (this.status >= 200 && this.status < 300) {
          resolve(req.response);
        } else {
          reject({
            status: this.status,
            statusText: req.statusText
          });
        }
      };
      req.onerror = function() {
        reject({
          status: this.status,
          statusText: req.statusText
        });
      };
      req.send();
    });
    return newPromise;
  }
};
