const {
    conflictResponse,
	okResponse,
} = require('../../helpers/functions/ResponseHandler.js')


const logout = ( req, res ) => {
    req.user.tokens.session.destroy((err) => {
        if (err) {
            return conflictResponse(res, 'Error logging out' ) ;
        }
        return okResponse(res, 'Logout successful');
    });
}

module.exports = logout