const express = require('express');
const cors = require('cors')
const routeBing = require('./components/bing')

const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.send('Home Page')
});

app.get('/about', (req, res) => {
    res.send('About Page')
});

app.get('/bing/image', routeBing);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server running on ${port}, http://localhost:${port}`)
});
