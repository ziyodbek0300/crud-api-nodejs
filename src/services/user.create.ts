import { IncomingMessage, ServerResponse } from 'http';
import { users } from '..';
import { postedDataValidator } from '../validators';
import { v4 as uuidv4 } from 'uuid';
import { bodyParser } from '../utils';

export const CreateUserService = async (req: IncomingMessage, res: ServerResponse) => {
    let body = await bodyParser(req);

    req.on('end', () => {
        const resValidator = postedDataValidator(body);
        const responseObject = {
            message: 'User created!',
            data: {}
        };
        let statusCode = 201;


        if (resValidator.isValidate) {
            const readyUser = {
                id: uuidv4(),
                ...body
            };

            users.push(readyUser);
            statusCode = 201;
            responseObject.data = readyUser;
        } else {
            responseObject.message = resValidator.message;
            responseObject.data = {};
            statusCode = 400;
        }

        res.statusCode = statusCode;
        res.setHeader('Content-Type', 'json/*');
        res.end(JSON.stringify(responseObject));
    });
}