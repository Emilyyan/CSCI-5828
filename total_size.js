
'use strict';

var dir = "" + process.argv.splice(2);
var fs = require('fs');

console.log('\n' + dir);
console.log("File/Directory Names:");

function getdirsize(dir, cb){
    
    var total = 0;
    
    fs.stat(dir,function(err, stats){
        if(err) 
            return cb(err);
        // if file, err == null
        if(stats.isFile()) 
            return cb(null, stats.size);

        // if dir
        fs.readdir(dir, function(err,files){
            if(err) 
                return cb(err);
            // empty dir
            if(files.length == 0) 
                return cb(null, 0);

            // count the num of files for asyn
            var cnt = files.length;
            for(var i = 0; i < files.length; i++){
                var tem = files[i];
                console.log(tem);
                
                getdirsize(dir + "/" + files[i], function(err, size){
                    if(err) 
                        return cb(err);
                    total += size;
                    cnt -= 1;
                    if(cnt <= 0){
                        cb(null, total);
                    }
                });
            }
        });
    });  
}

getdirsize(dir, function(err, size){
    if(err) 
        console.log(err);
    // Total size: <total_number_of_bytes>
    console.log("Total size: " + size + "\n");
});