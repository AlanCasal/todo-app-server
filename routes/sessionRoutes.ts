import express, { RequestHandler } from 'express';
import {
	startSession,
	validateSession,
} from '../database/repositories/sessionRepo';
import { requireAuth } from '../middlewares';
import { AuthenticatedRequest } from '../types';

const router = express.Router();

router.post('/start-session', async (req, res) => {
	console.log('[req]', req);
	const token = await startSession();
	res.status(200).json({ token });
});

router.get('/validate-session', requireAuth, (async (req, res) => {
	const authenticatedReq = req as AuthenticatedRequest;
	const isValid = await validateSession(authenticatedReq.token);
	res.status(200).send(isValid);
}) as RequestHandler);

export default router;
