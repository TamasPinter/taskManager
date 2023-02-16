//import and declare helpers
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3001;
const path = require('path');
const fs = require('fs');
const { cLog } = require('./middlewarehelpers/cLog.js');
const { readFromFile } = require('./middlewarehelpers/fsUtils');
const api = require('./routes/index.js');

//all middleware
app.use('/api', api);
app.use(cLog);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//get routes
app.get('/', (req, res) =>
res.sendFile(path.join(__dirname, 'public/index.html')));

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html')));

app.get('/api/notes', api);

//grab single note
app.get('/api/note/:note_id', (req, res) => {
    if(req.params.note_id) {
        const noteId = req.params.note_id
        readFromFile('./db/db.json')
        .then((data) => {
            const parsedData = JSON.parse(data)
            for(let i=0; i < parsedDate.length; i++) {
                const currentNote = parsedData[i]
                if(currentNote.note_id === noteId){
                    res.status(200).json(currentNote);
                    return;
                }
            }
            res.status(404).send("Can't find this note");
        })
        .catch((err) => {
            res.status(500).send(err);
        })
    }
})

//wildcard route
app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/public/404.html'));
})

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`));