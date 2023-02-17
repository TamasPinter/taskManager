//import and declare helpers
const express = require('express');
const app = express();
const fs = require('fs');
const PORT = process.env.PORT || 3001;
const path = require('path');
//const { cLog } = require('./middlewarehelpers/cLog.js');
//const { readFromFile } = require('./middlewarehelpers/fsUtils.js');
//const api = require('./routes/index.js');

//all middleware
//app.use('/api', api);
//app.use(cLog);
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//get routes
app.get('*', (req, res) =>
res.sendFile(path.join(__dirname, '/public/index.html')));

app.get('/api/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/db/db.json')));

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteLength = (noteList.length).toString();
    newNote.id = noteLength;
    noteList.push(newNote);
    fs.writeFileSync('./db/db,json', JSON.stringify(noteList));
    res.json(noteList);
})
//app.get('/api/notes', api);

app.delete('/api/notes:id', (req, res) => {
    let noteList = JSON.parse(fs.readFileSync('./db/db.json', 'utf8'));
    let noteId = (req.params.id).toString();
    noteList = noteList.filter(selected =>{
        return selected.id != noteId;
    })
    fs.writeFileSync('./db/db.json', JSON.stringify(noteList));
    res.json(noteList);
})
//grab single note
/*app.get('/api/note/:note_id', (req, res) => {
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
/*app.use('*', (req, res) => {
    res.status(404).sendFile(path.join(__dirname, '/public/404.html'));
})*/

app.listen(PORT, () =>
console.log(`App listening at http://localhost:${PORT}`));