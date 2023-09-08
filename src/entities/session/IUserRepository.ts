import type { LoginUser, User, NewUser, UpdateUser } from "./User";

export interface IUserRepository {
  login(user: LoginUser): Promise<User | GenericError>;
  register(user: NewUser): Promise<User | GenericError>;
  getCurrentUser(): Promise<User | GenericError>;
  updateCurrentUser(user: UpdateUser): Promise<User | GenericError>;
}
