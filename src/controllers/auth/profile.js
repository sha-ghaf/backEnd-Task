const {
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')
const User = require('../../helpers/schema/userSchema.js')

const profile = async( req, res )=>{
    userId = req.user
    newUser = await User.findOne({ userId })
    return okResponse(res, 'User profile data', {
        username: newUser.username,
        email: newUser.email,
        roles: newUser.roles,
        active: newUser.active
    })
}

module.exports = profile