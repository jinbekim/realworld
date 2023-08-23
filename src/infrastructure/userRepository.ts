import type { IUserRepository } from '@/domain/IUserRepository';
import type { LoginUser, User, NewUser, UpdateUser } from '@/domain/User';
import { fetcher } from './fetcher';
import { RealWorldStorage } from './storage';

/**
 * TypeScript for constraining the static side of a class.
 */
export class UserRepository implements IUserRepository {
  async login(user: LoginUser): Promise<User | GenericError> {
    try {
      const response: { user: User } = await fetcher('users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: user }),
      });
      return response.user;
    } catch (error: any) {
      return error;
    }
  }

  async register(user: NewUser): Promise<User | GenericError> {
    try {
      const response: { user: User } = await fetcher('users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      });
      return response.user;
    } catch (error: any) {
      return error;
    }
  }
  async getCurrentUser(): Promise<User | GenericError> {
    try {
      const response: { user: User } = await fetcher('user', {
        method: 'GET',
      });
      return response.user;
    } catch (error: any) {
      return error;
    }
  }
  async updateCurrentUser(user: UpdateUser): Promise<User | GenericError> {
    try {
      const response: { user: User } = await fetcher('user', {
        method: 'PUT',
        body: JSON.stringify({ user }),
      });
      return response.user;
    } catch (error: any) {
      return error;
    }
  }
}
