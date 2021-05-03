import { Request, Response } from 'express';
import { Favorite } from '../types/Favorite';
import { User } from '../types/User';

const favorites:Favorite[] = [];

const GetFavorites = (request: Request, response: Response) => {
  response.status(200).json({ favorites });
};

const CreateFavorite = (request: Request, response: Response) => {
  const { nickName, users } = request.body;

  const favoriteIndex = favorites.findIndex((x) => x.nickName === nickName);
  if (favoriteIndex === -1) {
    favorites.push({ nickName, users });

    response.sendStatus(204);
  } else {
    response.status(400).json({ message: 'NickName already exist' });
  }
};

const UpdateFavorites = (request: Request, response: Response) => {
  const { nickName, users } = request.body;

  const favoriteIndex = favorites.findIndex((x) => x.nickName === nickName);
  if (favoriteIndex > -1) {
    const favorite = favorites[favoriteIndex];
    favorite.users = [...favorite.users, ...users]
      .filter((value, i, array) => array.findIndex((x: User) => (x.email === value.email)) === i);

    response.status(200)
      .json({ favorite });
  } else {
    response.sendStatus(404);
  }
};

const DeleteFavorite = (request: Request, response: Response) => {
  const { nickName, users } = request.body;

  const favoriteIndex = favorites.findIndex((x) => x.nickName === nickName);

  if (favoriteIndex > -1) {
    favorites[favoriteIndex].users = favorites[favoriteIndex].users
      .filter((value) => users.findIndex((x: User) => (x.email === value.email)));

    if (!favorites[favoriteIndex].users.length) {
      favorites.splice(favoriteIndex, 1);
    }
    response.sendStatus(200);
  } else {
    response.sendStatus(404);
  }
};

export default {
  GetFavorites,
  CreateFavorite,
  UpdateFavorites,
  DeleteFavorite,
};
