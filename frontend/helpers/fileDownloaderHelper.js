var glob = require('glob');
var filePattern = 'frontend/downloads/*.pdf'

function FileDownloaderHelper () {

}

FileDownloaderHelper.prototype.waitForDownload = function(){

    browser.driver.wait(function () {
        var filesArray = glob.sync(filePattern);
        if (typeof filesArray !== 'undefined' && filesArray.length > 0) {
            // this check is necessary because `glob.sync` can return
            // an empty list, which will be considered as a valid output
            // making the wait to end.
            return filesArray;
        }
    }).then(function (filesArray) {
        var filename = filesArray[0];
        console.log(filename);
    });

}



module.exports = FileDownloaderHelper;