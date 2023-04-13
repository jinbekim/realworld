import type { LoginUser, User, NewUser, UpdateUser } from "./User";

export interface IUserRepository {
  login(user: LoginUser): Promise<User>;
  register(user: NewUser): Promise<User>;
  getCurrentUser(): Promise<User>;
  updateCurrentUser(user: UpdateUser): Promise<User>;
}
