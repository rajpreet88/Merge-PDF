const express = require('express');
const path = require('path');
const multer = require('multer');
const { mergePDFs } = require('./merge')
const upload = multer({ dest: 'uploads/' });
const port = 3300;
const app = express();

app.use('/static', express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "./templates/index.html"))
})

/* install multer with express to easily handle files in server*/

app.post('/merge', upload.array('pdfs', 2), async (req, res, next) => {
    console.log(req.files)
    let d = await mergePDFs(path.join(__dirname, req.files[0].path), path.join(__dirname, req.files[1].path));
    // res.send({data: req.files});
    res.redirect(`http://localhost:${port}/static/${d}.pdf`)
})

app.listen(port, () => {
    console.log(`Server is listening on port http://localhost:${port}`);
})