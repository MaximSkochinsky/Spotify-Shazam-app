const express = require('express')

var exec = require('child_process').exec;
var child;
const cors = require('cors')


const app = express()
app.use(cors())


app.get('/record', (req, res) => {
    
        child = exec("./audio-fingerprint-identifying-python/run_recognize.sh",
        function (error, stdout, stderr) {
            console.log(stdout);
            res.send(stdout)
        });
})


app.listen(5000, ()=> {
    console.log('Listen on port number 5000')
})