import { IncomingMessage, ServerResponse } from 'http';
import { users } from '..';
import { bodyParser, checkUuid } from '../utils';

export const UpdateUserService = async (req: IncomingMessage, res: ServerResponse) => {
    let body = await bodyParser(req);

    req.on('end', () => {
        let statusCode = 200;

        const responseObject = {
            message: 'Selected user here!',
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
                users[indexOfObj].age = body.age;
                users[indexOfObj].hobbies = body.hobbies;
                users[indexOfObj].username = body.username;
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
    });
}