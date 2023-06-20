var exec = require('child_process').exec;
var child;

child = exec("./run_recognize.sh",
   function (error, stdout, stderr) {
      console.log(stdout);
      if (error !== null) {
          console.log('exec error: ' + error);
      }
   });