import * as http from 'http';
import 'dotenv/config';
import { USER_PATH } from './constants';
import { IUser } from './types';

const users: IUser[] = [];

const server = http.createServer((req, res) => {
    if (!req.url?.startsWith(USER_PATH)) {
        res.statusCode = 404;
        res.end('non exist url');
    } else if (req.url === USER_PATH) {
        switch (req.method) {
            case 'POST':
                let body = '';

                req.on('data', (chunk) => {
                    body += chunk;
                });

                req.on('end', () => {
                    console.log(body);
                    users.push(JSON.parse(body));

                    const responseObject = {
                        message: 'User created!',
                        data: JSON.parse(body),
                    };

                    const responseJSON = JSON.stringify(responseObject);

                    res.statusCode = 201;
                    res.setHeader('Content-Type', 'json/*');
                    res.end(responseJSON);
                });
                break;
            case 'GET':
                res.end(`Get url!`);
                break;
            default:
                res.end('Method does not exist!');
                break;
        }
    }
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
    console.log(`Server running on port ${port}`);
});