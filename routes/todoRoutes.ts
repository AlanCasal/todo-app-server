import express, { Response } from 'express';
import {
	createTodo,
	deleteTodo,
	getTodos,
	updateTodo,
} from '../database/repositories/todoRepo';
import { successMessage } from '../database/utils';
import { requireAuth } from '../middlewares';
import { AuthenticatedRequest, TodoUpdates } from '../types';

const router = express.Router();

const asyncHandler = (
	fn: (
		req: AuthenticatedRequest,
		res: Response,
		next: express.NextFunction
	) => Promise<void | Response>
) => {
	return (req: express.Request, res: Response, next: express.NextFunction) => {
		Promise.resolve(fn(req as AuthenticatedRequest, res, next)).catch(next);
	};
};

const validateTodoInput = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction
) => {
	const { title } = req.body;

	if (!title || typeof title !== 'string' || title.trim().length === 0) {
		res.status(400).json({ message: 'Valid title is required' });
		return;
	}
	next();
};

router.get(
	'/todos',
	requireAuth,
	asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
		const todos = await getTodos(req.token);

		if (todos === false)
			res.status(401).json({ message: 'Invalid or expired session token' });
		else res.status(200).send(todos);
	})
);

// Create todo
router.post(
	'/todos',
	requireAuth,
	validateTodoInput,
	asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
		const { title } = req.body;
		const id = await createTodo(req.token, title);
		res.status(201).send({ id });
	})
);

// delete todo
router.delete(
	'/todos/:id',
	requireAuth,
	asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
		const id = parseInt(req.params.id);
		await deleteTodo(req.token, id);
		res.status(200).json({ message: successMessage('Todo deleted') });
	})
);

// Toggle completed
router.put(
	'/todos/:id',
	requireAuth,
	asyncHandler(async (req: AuthenticatedRequest, res: Response) => {
		const { title, completed } = req.body;
		const id = parseInt(req.params.id);

		const updates: TodoUpdates = {};
		if (title !== undefined) updates.title = title;
		if (completed !== undefined) updates.completed = completed;

		const success = await updateTodo(req.token, id, updates);
		if (!success) {
			res.status(404).json({ message: 'Todo not found' });
			return;
		}
		res.status(200).json({ message: successMessage('Todo updated') });
	})
);

export default router;
