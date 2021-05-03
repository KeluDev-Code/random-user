import express, { Application } from 'express';
import cors from 'cors';
import { SERVER } from './config/Config';
import { indexRoutes } from './routes/Index';

const app: Application = express();

/**
 * Parse application/x-www-form-urlencoded and application/json
 */

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

// eslint-disable-next-line @typescript-eslint/no-explicit-any
/* app.use((error: any, req: any, res: any) => {
  res.status(error.status || 500)
    .json({
      error: {
        message: error.message,
      },
    });
});
 */

/**
 * Routes
 */
app.use('/api/', indexRoutes);

app.listen(SERVER,
  // eslint-disable-next-line no-console
  () => console.log('Servidor arrancado: ', `http://${SERVER.hostname}:${SERVER.port}`));
