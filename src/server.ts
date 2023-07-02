import * as http from 'http';
import 'dotenv/config';
import { USER_PATH } from './constants';
import {
    CreateUserController,
    DeleteUserController,
    GetAllUserController,
    GetSingleUserController,
    UpdateUserController
} from './controllers';

const NonExistUrl = (res: http.ServerResponse) => {
    res.statusCode = 404;
    res.end('non exist url');
}

const ExistUrl = (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.method) {
        case 'POST':
            CreateUserController(req, res);
            break;
        case 'GET':
            GetAllUserController(req, res);
            break;
        default:
            res.end('Method does not exist!');
            break;
    }
}

const SingleUrl = (req: http.IncomingMessage, res: http.ServerResponse) => {
    switch (req.method) {
        case 'PUT':
            UpdateUserController(req, res);
            break;
        case 'GET':
            GetSingleUserController(req, res);
            break;
        case 'DELETE':
            DeleteUserController(req, res);
            break;
        default:
            res.end('Method does not exist!');
            break;
    }
}

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    if (!req.url?.startsWith(USER_PATH))
        NonExistUrl(res);

    if (req.url === USER_PATH)
        ExistUrl(req, res);
    else {
        let singleCheckUrl = req.url?.split('/api/users/') || [];

        if (singleCheckUrl?.length < 3) {
            SingleUrl(req, res);
        } else {
            NonExistUrl(res);
        }
    }
});

export const mainServer = (port: number) => {
    server.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}
