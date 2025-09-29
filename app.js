const http = require('http')
const fs = require('fs')


const server = http.createServer((req, res) => {
    const url = req.url
    const method = req.method

    if (req.url === '/') {
        res.setHeader('Content-Type', 'text/html')

        res.end(
            `<form action="/message" method="POST">
    <label>Name:</label>
    <input type=text name="username"></input>
    <button type="submit">Add</button>
    </form>`
        )
    }
    else {
        if (req.url == '/message' && method === 'POST') {
            res.setHeader('Content-Type', 'text/html')

            let dataChunks = []
            req.on('data', (chunks) => {
                dataChunks.push(chunks)
            })

            req.on('end', () => {
                let combineBuffer = Buffer.concat(dataChunks)

                let value = combineBuffer.toString().split("=")

                fs.writeFile('formValues.txt', value[1], (err) => {
                    res.statusCode = 302
                    res.setHeader('Location', '/')
                    res.end()
                })
            })
        }
    }

})

server.listen(3000, () => {
    console.log('Server is running')
})