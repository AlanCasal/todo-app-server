/* eslint-disable no-console */
import cors from 'cors';
import express from 'express';
import { corsOptions, errorHandler } from './middlewares';
import routes from './routes';

const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use('/', routes); // Use the routes
app.use(errorHandler); // Error handling middleware, Add it after all routes

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
