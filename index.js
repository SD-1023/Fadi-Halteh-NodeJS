const {readFile} = require('fs/promises');
const path = require('path');

async function readtofile(){
    try{
        let data =  JSON.parse(await readFile("config.json","utf8"))
        for(file of data["files"]){
            filename = path.basename(file);
                if(isValid(filename)){
                    let newFile=await readFile(file,"utf8")
                    let numWords= newFile.trim().split("/\s+/").filter(word => word!=="" );
                    console.log(`"${filename}":${numWords.length} words`);
                }
                else{
                    console.log(`"${filename}" invalid file name`);
                }
                    }
    }
   catch(error){
    console.log(error);
   }
}

function isValid(fname){
    let rg1=/^[^\\/:\*\?"<>\|]+$/; 
    let rg2=/^[^\.]*\.?[^\.]*$/
    let rg3=/^(nul|prn|con|lpt[0-9]|com[0-9])(\.|$)/; 
    return rg1.test(fname)&&rg2.test(fname)&&!rg3.test(fname)&&fname.length<260;
    };

readtofile()

