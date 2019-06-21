"use strict";
function Promisefy(f) {
    var params = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        params[_i - 1] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        f.apply(void 0, params.concat([function (err, res) {
                if (err) {
                    return reject(err);
                }
                return resolve(res);
            }]));
    });
}
