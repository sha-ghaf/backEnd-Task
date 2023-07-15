const {
    notFoundResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const Note = require('../../helpers/schema/noteSchema.js')

const getNoteById = async( req, res, next)=>{
    try{
        const _id = req.params.id
        const note = await Note.findOne({ _id , userId : req.user})
        if(!note){
            return  notFoundResponse(res, 'There is no notes for you with this id')
        }
        // await note.populate('owner')
        return okResponse(res, 'User fetched successfully', {
            title: note.title,
            text: note.text,
            UserName: note.userName ,
            completed: note.completed,
        })
    }
    catch(error){
        internalError
    }
}

module.exports = getNoteById