

module.exports = {
    uploadFile: function (file, url) {
        let fileUploadPath = 'public/';
        return new Promise((resolve, reject) => {
            file.mv(__dirname  + `${fileUploadPath}/${url}`, async function (err) {
                if (err) {
                    reject(false);
                }
                resolve(true);
            });
        });
    }
}