/* eslint-disable @typescript-eslint/no-unused-vars */
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { errorMessage } from '../database/utils';
import { AuthenticatedRequest, CorsMethods, SessionToken } from '../types';

export const corsOptions = {
	// origin: 'http://localhost:8080',
	methods: [
		CorsMethods.GET,
		CorsMethods.POST,
		CorsMethods.PUT,
		CorsMethods.DELETE,
	],
	credentials: true,
};

export const requireAuth: RequestHandler = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		res.status(401).json({ message: 'No token provided' });
		return;
	}

	(req as AuthenticatedRequest).token = token as SessionToken;
	next();
};

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	res.status(500).json({ message: errorMessage(req.method.toLowerCase()) });
};
