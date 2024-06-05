const express = require('express')
const fs= require('fs')
const path = require('path')



function findFilePath(name){
    const filepath = path.join(__dirname,`../notes/${name}`)
    return filepath
}

function setFilePath(name){
    const filepath = path.join(__dirname,`../notes/${name}`)
    return filepath

}
const dirpath = path.join(__dirname,`../notes`)



const router = express.Router();
router.use(express.json()); // Parse JSON bodies


//to read the all notes
router.get('/', (req,res)=>{
    fs.readdir(dirpath, 'utf8', (err, files)=>{
        if(err){
            return res.status(500).send("error finding the notes")
        }
        
        const textFiles = files.filter(file => file.endsWith('.txt'));

        //const notes = data
        res.send( { title: 'Notes', textFiles });

        
    })
    

})

//to read one notes
router.get('/:notename', (req,res)=>{
    const name=req.params.notename;
    fs.readFile(findFilePath(name), 'utf8', (err, data)=>{
        if(err){
            return res.status(500).send("error finding the notes")
        }
        const note = data;
        res.send({title: name, note})
    })
})

//to create the notes
router.post('/newnote/:filename', (req, res) => {
    const filename= req.body.filename;
    const newnote = req.body.note;
    if (!newnote) {
        return res.status(400).send("Note content is required");
    }

    fs.writeFile(setFilePath(`${filename}.txt`), newnote, 'utf8', (err) => {
        if (err) {
            return res.status(500).send("Error creating the new note");
        }
        res.status(200).send("New note created successfully");
    });
});


//to update the notes
router.put('/:notename', (req,res)=>{
    const notename = req.params.notename;
    const updatecontent = req.body.updatenote;
    const filetobeupdated = findFilePath(notename)


    fs.writeFile(filetobeupdated,updatecontent, 'utf8', (err)=>{
        if (err) {
            return res.status(500).send("Error updating the new note");
        }
        res.status(200).send(" note successfully updated");
    })
    
})

//to delete the notes
router.delete('/:notename', (req,res)=>{
    const notename = req.params.notename;
    const filetobedeleted = findFilePath(notename)
    fs.unlink(filetobedeleted, (err)=>{
        if(err){
            return res.status(500).send("Error deleting the note");

        }
    })
    res.send("file is deleted")
    
})

module.exports = router;


