import { Request, Response } from 'express';
import { getAllUsers } from '../domain/repositories/UserRepository';

export const users = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getAllUsers();
    console.log('result');
    console.log(users);
    res.status(200).json({
      status: 'success',
      message: users,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Erreur lors de la récupération des utilisateurs',
    });
  }
};