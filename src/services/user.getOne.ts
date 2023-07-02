import { IncomingMessage, ServerResponse } from 'http';
import { users } from '..';
import { checkUuid } from '../utils';

export const GetSingleUserService = async (req: IncomingMessage, res: ServerResponse) => {
    let statusCode = 200;

    const responseObject = {
        message: 'Selected user here!',
        data: {}
    };

    const userId = req.url?.split('/api/users/')[1];

    if (checkUuid(userId!)) {
        const fUser = users.filter(user => user.id === userId)[0];
        if (fUser) {
            responseObject.data = fUser;
            statusCode = 200;
        } else {
            responseObject.data = {};
            responseObject.message = 'User does not exist!'
            statusCode = 404;
        }
    } else {
        statusCode = 400;
        responseObject.data = {}
        responseObject.message = 'Id should be uuid format!'
    }


    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'json/*');
    res.end(JSON.stringify(responseObject));
}