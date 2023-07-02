import { IncomingMessage, ServerResponse } from 'http';
import { users } from '..';
import { checkUuid } from '../utils';

export const DeleteUserService = async (req: IncomingMessage, res: ServerResponse) => {
    let statusCode = 204;

    const responseObject = {
        message: 'User successfully removed!',
        data: {}
    };

    const userId = req.url?.split('/api/users/')[1];

    if (checkUuid(userId!)) {
        let indexOfObj: number = 0;
        const fUser = users.filter((user, index) => {
            if (user.id === userId) {
                indexOfObj = index;
            }
            return user.id === userId;
        })[0];
        if (fUser) {
            responseObject.data = fUser;
            statusCode = 204;
            users.splice(indexOfObj, 1);
            res.end(JSON.stringify(responseObject));
        } else {
            responseObject.data = {};
            responseObject.message = 'User does not exist!'
            statusCode = 404;
        }
    } else {
        statusCode = 400;
        responseObject.data = {}
        responseObject.message = 'id should be uuid format!'
    }

    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'json/*');
    res.end("JSON.stringify(responseObject)");
}