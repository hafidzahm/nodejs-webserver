const http = require('http');
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html')

    response.statusCode = 200;
    //handling request

    const { url, method } = request

    if ( url === '/') {
        //logika respon bila url bernilai '/'
        if (method === 'GET') {
            //jika client pake get
            response.end('<h1>Ini adalah homepage</h1>')
        } else {
            //jika tidak
            response.end(`<h1>Mohon maaf, halaman ini tidak dapat diakses pakai method ${method} request</h1>`)
        }
    } else if ( url === '/about') {
        //logika respon bila url bernilai '/about'
        if (method === 'GET') {
            //BILA PAKAI GET
            response.end('<h1>Halo! ini adalah halaman about.</h1>')
        } else if (method ==='POST'){
            //BILA PAKAI POST
            let body = [];
 
            request.on('data', (chunk) => {
              body.push(chunk);
            });
    
            request.on('end', () => {
              body = Buffer.concat(body).toString();
              const {name} = JSON.parse(body);
              response.end(`<h1>Halo, ${name}! Ini adalah halaman about</h1>`);
            });
        } else {
            //bila tidak keduanya
            response.end(`<h1>Ups, maaf halaman ini tidak dapat diakses pake ${method} request</h1>`)
        }
            
    } else {
        //logika respon bila url tidak bernilai keduanya
        response.end('<h1>Halaman tidak ditemukan!</h1>')
    }

    // if (method === 'GET') {
    //     response.end('<h1>GET RESPONSE</h1>')
    // }

    // if(method === 'POST') {
    //     let body = [];
       
    //     request.on('data', (chunk) => {
    //       body.push(chunk);
    //     });
       
    //     request.on('end', () => {
    //       body = Buffer.concat(body).toString();
    //       const { name } = JSON.parse(body);
    //       response.end(`<h1>Hai, ${name}!</h1>`);
    //     });
    //   }
};


const server = http.createServer(requestListener);

const port = 4000;
const host ='localhost'



server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`)

});

// npm run start
// curl -X POST -H "Content-Type: application/json" http://localhost:5000 -d "{\"name\": \"Dicoding\"}"