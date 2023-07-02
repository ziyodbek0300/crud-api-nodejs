import { IncomingMessage } from "http";

export const bodyParser = async (req: IncomingMessage) => {
    let body = '';
    
    await req.on('data', (chunk) => body += chunk);

    return JSON.parse(body);
}