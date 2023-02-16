//import
const uuid = require('../middlewarehelpers/uuid');
const fb = require('express').Router();
const { readFromFile, readAndAppend, readAndDelete } = require('../middlewarehelpers/fsUtils');

// get all notes
fb.get('/', (req, res) =>
readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data))));

//POST for new note with random ID generator
fb.post('/', (req, res) => {
    const { title, text } = req.body;
    if (title && text) {
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };
        readAndAppend(newNote, './db/db.json');
        const response = {
            status: 'success',
            nody: newNote,
        };
        res.json(response);
    } else{
        res.json('Error in posting note');
    }
});

//POST for deleting
fb.delete('/:note_id', (req, res) => {
    if(req.params.note_id) {
        const noteId = req.params.note_id
        readAndDelete(req.params.note_id)
        res.send(`Note ${noteId} has been deleted`);
            } else {
                res.status(404).send("Can't find this note ID");
            }
        });

module.exports = fb;