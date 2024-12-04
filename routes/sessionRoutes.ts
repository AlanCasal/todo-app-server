import express, { RequestHandler } from 'express';
import {
	startSession,
	validateSession,
} from '../database/repositories/sessionRepo';
import { requireAuth } from '../middlewares';
import { AuthenticatedRequest } from '../types';

const router = express.Router();

// eslint-disable-next-line @typescript-eslint/naming-convention
router.post('/start-session', async (_, res) => {
	const token = await startSession();

	if (!token) res.status(500).json({ message: 'Failed to start session' });
	else res.status(200).json({ token });
});

router.get('/validate-session', requireAuth, (async (req, res) => {
	const authenticatedReq = req as AuthenticatedRequest;
	const isValid = await validateSession(authenticatedReq.token);

	if (!isValid)
		res.status(401).json({ message: 'Invalid or expired session token' });
	else res.status(200).send(isValid);
}) as RequestHandler);

export default router;
