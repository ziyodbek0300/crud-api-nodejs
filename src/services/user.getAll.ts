import { IncomingMessage, ServerResponse } from 'http';
import { users } from '..';

export const GetAllUsersService = async (req: IncomingMessage, res: ServerResponse) => {
    let statusCode = 201;
    const responseObject = {
        message: 'All users here!',
        data: users
    };

    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'json/*');
    res.end(JSON.stringify(responseObject));
}