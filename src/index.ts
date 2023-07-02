import 'dotenv/config';
import { IUser } from './types';
import { mainServer } from './server';

export const users: IUser[] = [];

const port = Number(process.env.PORT) || 3001;

export default mainServer(port);