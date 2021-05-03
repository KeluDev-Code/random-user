import express from 'express';
import controller from '../controllers/FavoriteController';

const favoriteRoutes = express.Router();

favoriteRoutes.get('/favorite', controller.GetFavorites);
favoriteRoutes.post('/favorite', controller.CreateFavorite);
favoriteRoutes.put('/favorite/:id', controller.UpdateFavorites);
favoriteRoutes.delete('/favorite/:id', controller.DeleteFavorite);

export { favoriteRoutes };
