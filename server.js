const http = require('http');
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'application/json')
    response.setHeader('Powered-By', 'Node.js')

    //handling request

    const { url, method } = request

    if ( url === '/') {
        //logika respon bila url bernilai '/'
        if (method === 'GET') {
            //jika client pake get
            response.statusCode = 200
            response.end(JSON.stringify({
                message: 'Ini adalah homepage'
            }));
        } else {
            //jika tidak
            response.statusCode = 400
            response.end(JSON.stringify({
                message: `Mohon maaf, halaman ini tidak dapat diakses pakai method ${method} request</h1>`
            }));
        }
    } else if ( url === '/about') {
        //logika respon bila url bernilai '/about'
        if (method === 'GET') {
            //BILA PAKAI GET
            response.statusCode = 200
            response.end(JSON.stringify({
                message: 'Halo! ini adalah halaman about.'
            }));
        } else if (method ==='POST'){
            //BILA PAKAI POST
            let body = [];
 
            request.on('data', (chunk) => {
              body.push(chunk);
            });
    
            request.on('end', () => {
              body = Buffer.concat(body).toString();
              const {name} = JSON.parse(body);
              response.statusCode = 200
              response.end(JSON.stringify({
                message: `Halo, ${name}! Ini adalah halaman about`
              }))
            });
        } else {
            //bila tidak keduanya
            response.statusCode = 400
            response.end(JSON.stringify({
              message: `Ups, maaf halaman ini tidak dapat diakses pake ${method} request` 
            }))
        }
            
    } else {
        //logika respon bila url tidak bernilai keduanya
        response.statusCode = 404
        response.end(JSON.stringify({
            message: 'Halaman tidak ditemukan!'
        }))
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