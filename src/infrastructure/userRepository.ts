import type { IUserRepository } from "@/domain/IUserRepository";
import type { LoginUser, User, NewUser, UpdateUser } from "@/domain/User";
import { fetcher } from "./fetcher";
import { RealWorldStorage } from "./storage";

/**
 * TypeScript for constraining the static side of a class.
 */
export class UserRepository implements IUserRepository {
  async login(user: LoginUser): Promise<User | GenericError> {
    try {
      const response: { user: User } = await fetcher("users/login", {
        method: "POST",
        body: JSON.stringify({ user }),
      });
      return response.user;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
  async register(user: NewUser): Promise<User | GenericError> {
    try {
      const response: { user: User } = await fetcher("users", {
        method: "POST",
        body: JSON.stringify({ user }),
      });
      return response.user;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
  async getCurrentUser(): Promise<User | GenericError> {
    try {
      const response: { user: User } = await fetcher("user", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${RealWorldStorage.get("jwt")}`,
        },
      });
      return response.user;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
  async updateCurrentUser(user: UpdateUser): Promise<User | GenericError> {
    try {
      const response: { user: User } = await fetcher("user", {
        method: "POST",
        body: JSON.stringify({ user }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${RealWorldStorage.get("jwt")}`,
        },
      });
      return response.user;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
}
