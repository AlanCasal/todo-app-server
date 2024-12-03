import { SessionToken } from './index';

declare global {
	namespace Express {
		interface Request {
			token?: SessionToken;
		}
	}
}

// This is important - makes this a module
export {};
