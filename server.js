const http = require('http');
const requestListener = (request, response) => {
    response.setHeader('Content-Type', 'text/html')

    response.statusCode = 200;
    //handling request

    const { method } = request

    if (method === 'GET') {
        response.end('<h1>GET RESPONSE</h1>')
    }

    if(method === 'POST') {
        let body = [];
       
        request.on('data', (chunk) => {
          body.push(chunk);
        });
       
        request.on('end', () => {
          body = Buffer.concat(body).toString();
          const { name } = JSON.parse(body);
          response.end(`<h1>Hai, ${name}!</h1>`);
        });
      }
};


const server = http.createServer(requestListener);

const port = 4000;
const host ='localhost'



server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`)

});

// npm run start
// curl -X POST -H "Content-Type: application/json" http://localhost:5000 -d "{\"name\": \"Dicoding\"}"