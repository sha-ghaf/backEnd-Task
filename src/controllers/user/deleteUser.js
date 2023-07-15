const {
	notFoundResponse,
    badRequestResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const internalError = require('../../helpers/functions/internalError.js')
const User = require('../../helpers/schema/userSchema.js')

const deleteUser = async(req,res)=>{
    try{
        const _id = req.params.id
        const note = await Note.findOne({ userId: id })
        if (note) {
            return badRequestResponse(res, 'User has assigned notes' )
        }
        const user = await User.findOne(_id)
        if(!user){
            return notFoundResponse( res, 'Unable to find user')
        }
        return okResponse(res, "User deleted successfully")
    }
    catch(error){
        internalError
    }
}

module.exports = deleteUser
