//reading and wrighting files 

//will return a function that will return functions that we can use
//blocking syncronous way
const fs = require('fs');
//this gives us networking capabilities such as building http server

const textIN  = fs.readFileSync('./txt/input.txt','utf-8')

const textOut =`This is what we know about the avocado: ${textIN} ${Date.now()}`
fs.writeFileSync('./txt/output.txt',textOut)

console.log(textOut);

//nonblocking async way
//third param is a callback function
fs.readFile('./txt/start.txt','utf-8', (err1, data1) => { 
   err1 &&  console.log('error')
    fs.readFile(`./txt/${data1}.txt`,'utf-8', (err, data2) => {
  console.log(data2);
      fs.readFile('./txt/append.txt','utf-8', (err, data3) => {
      console.log(data3);
            
            fs.writeFile('./txt/final.txt',`${data2}\n${data3}`,(error) => {
              console.log(`done writtin`)
            })
      } );
    } );
} );

console.log('reading file')