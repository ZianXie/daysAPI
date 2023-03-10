import myEnv from 'dotenv'
myEnv.config()
import express from 'express';
import 'express-async-errors'	//it actually works, verified 

import daysRouter from './routes/days.js';
import authRouter from './routes/auth.js'

import authenticateUser from './middleware/authentication.js'


//security packages
import helmet from 'helmet';
import cors from 'cors'
import xss from 'xss-clean'
import rateLimiter from 'express-rate-limit'


// Swagger
import * as SwaggerUI from 'swagger-ui-express';
import YAML from 'yamljs'
const swaggerDocument = YAML.load("./swagger.yaml");


const app = express();

// error handler
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';

app.use(express.json());


// extra packages
app.set('trust proxy', 1)
app.use(rateLimiter
	(
		{
			windowMs: 15 * 60 * 1000, // 15 minutes
			max: 100,// Limit each IP to 100 requests per `window` (here, per 15 minutes)
		}
	)
) 
app.use(helmet())
app.use(cors())
app.use(xss())






//connectDB
import connectDB from './db/connect.js';


// routes
app.get('/', (req, res) => {
	res.send('days api');
});

app.use('/api/v1/days', authenticateUser, daysRouter)
app.use('/api/v1/auth', authRouter)


app.use("/api-docs", SwaggerUI.serve, SwaggerUI.setup(swaggerDocument));


app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
	try {
		connectDB(process.env.MONGO_URI)
		console.log('Connected to MongoDB');
		app.listen(port, () =>
			console.log(`Server is listening on port ${port}...`)
		);
	} catch (error) {
		console.log(error);
	}
};

start();
