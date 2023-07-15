const {
    notFoundResponse,
	okResponse,
    badRequestResponse
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const Note = require('../../helpers/schema/noteSchema.js')

const updateNote = async ( req, res ) => {
    try {
        const  id  = req.params;
        const userId = req.user
        const { title, text, completed, userName } = req.body
        if (!id || !userName || !title || !text || typeof completed !== 'boolean') {
            return badRequestResponse(res ,'All fields are required' )
        }
        // Find the note by ID and ensure it belongs to the authenticated user
        const note = await Note.findOne( id );
        if (!note) {
            return notFoundResponse(res, 'Note not found' );
        }
        const duplicateNote = await Note.findOne({ title });
        console.log(duplicateNote)
        if (duplicateNote) {
            return conflictResponse(res, 'Duplicate note title') 
        }
        // Update the note
        note.title = title;
        note.text = text;
        note.completed = completed;
        note.userId = userId
        note.userName = userName
        await note.save();
        console.log(note);
        return okResponse(res, 'Note updated successfully', {
            title: note.title,
            text: note.text,
            completed: note.completed
        });
    } catch (error) {
        internalError
    }
};

module.exports = updateNote