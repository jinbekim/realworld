// import type { IUserRepository } from '@/entities/session/IUserRepository';
// import type { User } from '@/entities/session/model/sessionModel';
// import { RealWorldStorage } from './storage';
// import { fetcher } from '@/shared/api/fetcher';

// /**
//  * TypeScript for constraining the static side of a class.
//  */
// export class UserRepository implements IUserRepository {
//   async login(user: any): Promise<User | GenericError> {
//     try {
//       const response: { user: User } = await fetcher('users/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ user: user }),
//       });
//       return response.user;
//     } catch (error: any) {
//       return error;
//     }
//   }

//   async register(user: any): Promise<User | GenericError> {
//     try {
//       const response: { user: User } = await fetcher('users', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ user }),
//       });
//       return response.user;
//     } catch (error: any) {
//       return error;
//     }
//   }
//   async getCurrentUser(): Promise<User | GenericError> {
//     try {
//       const response: { user: User } = await fetcher('user', {
//         method: 'GET',
//       });
//       return response.user;
//     } catch (error: any) {
//       return error;
//     }
//   }
//   async updateCurrentUser(user: any): Promise<User | GenericError> {
//     try {
//       const response: { user: User } = await fetcher('user', {
//         method: 'PUT',
//         body: JSON.stringify({ user }),
//       });
//       return response.user;
//     } catch (error: any) {
//       return error;
//     }
//   }
// }
