import express, { Application } from 'express';
import { favoriteRoutes } from './Favorites';

const indexRoutes: Application = express();

indexRoutes.use(favoriteRoutes);

export { indexRoutes };
