const express = require('express');
const app = express();
const cors = require('cors');
const got = require('got');
const FileType = require('file-type');

app.use(express.json());
app.use(cors());

var port = 3000
//chrome exp handle
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,Content-Type, Accept");
    next();
})

// PORT LISTENER
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});

// a list of unwanted file extensions
unwantedFileTypes = ['cfb', 'exe', 'dll', 'ACTION', 'APK', 'APP', 'BAT', 'BIN', 'CMD', 'COM', 'COMMAND', 'CPL', 'CSH', 'EXE', 'GADGET', 'INF1', 'INS', 'INX',
    'IPA', 'ISU', 'JOB', 'JSE', 'KSH', 'LNK', 'MSC', 'MSI', 'MSP', 'MST', 'OSX', 'OUT', 'PAF', 'PIF', 'PRG', 'PS1', 'REG', 'RGS', 'RUN', 'SCR', 'SCT', 'SHB',
    'SHS', 'U3P', 'VB', 'VBE', 'VBS', 'VBSCRIPT', 'WORKFLOW', 'WS', 'WSF', 'WSH']

// post request to check what is the file in question extension and if its an exe retuen 'not_safe'
app.post('/checkFile', function (req, res) {
    const url = "https://nodejs.org/dist/v12.19.0/node-v12.19.0-x64.msi";

    (async () => {
        const stream = got.stream(req.body.url);
        // console.log(stream);
        let extension = await FileType.fromStream(stream);
        console.log(extension);
        if (extension) {
            let ans = unwantedFileTypes.indexOf(extension.ext) > -1
            console.log(ans);
            if (ans) {
                res.status(200).send('not_safe');
            }
            else
                res.status(200).send('safe');

        }
        else
            res.status(200).send('not_recognized');
    })();


});

function isUnwantedFile(mimeType) {

}