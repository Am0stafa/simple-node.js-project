//server

//npm core modules
const http = require('http');
const url = require('url');
const fs = require('fs');
//thired party modules after npm installing them
const slugify = require('slugify');
//my own module
const replaceTemplate = require('./modules/replaceTemplate') 

//reading files up which is only executed once
const tempOverview= fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8');
const tempCard= fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8');
const tempProduct= fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8');
  const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
  const productData = JSON.parse(data);


    


//it will accept a callback function that will be fired of each time a new request hits the server
const server = http.createServer((req, res) => {
//HERE IS ANOTHER WAY OF MAKING THE SERVER BY SPLITING IT.
 // const server = http.createServer()
//server.on('request' , (req, res) => {
  // what run on the server
//})

    //rounting
    //gets us the pathName which we can use for routing or use desturcturing like the below one
//  const pathName = req.url;
    
    
   // console.log(url.parse(req.url, true))  
      //   return value  {
      //   protocol: null,
      //   slashes: null,
      //   auth: null,
      //   host: null,
      //   port: null,
      //   hostname: null,
      //   hash: null,
      //   search: '?id=0',
      //   query: { id: '0' },
      //   pathname: '/product',
      //   path: '/product?id=0',
      //   href: '/product?id=0'
      // }
       const {query, pathname} = url.parse(req.url, true)
      
      
      
        
      //overview page
    if (pathname === '/'||pathname === '/overview'){
      res.writeHead(200, {
      'Content-type': 'text/html'
    });
        
        const cardHtml = productData.map((el) => replaceTemplate(tempCard,el)).join('')
        const output = tempOverview.replace(/{%PRODUCT_CARDS%}/,cardHtml);
      
        res.end(output)
    }
      //product page
    else if(pathname === '/product'){
        const product = productData[query.id];
        res.writeHead(200, {
        'Content-type': 'text/html'
        });
      const output =  replaceTemplate(tempProduct,product)
        
      res.end(output)
    }
      //api page
    else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json'
    });
    res.end(data);

  } 
  // Not found
    else{
    //console and network error message
      res.writeHead(404, {
      'Content-Type': 'text/html',
      'custom-header': 'this is a header i made'
      })
      res.end('<h1>page not found!</h1>')
    }
    
    
    
    //this is the responce that we are going to send back
      //res.end('hello from the server!')
});



//port and local host and callback function that will run when the server start listinig
server.listen(8000,'127.0.0.1',() => {
  console.log('listing to requests on port 8000')
});
