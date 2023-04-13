import type { IProfileRepository } from "@/domain/IProfileRepository";
import type { Profile } from "@/domain/Profile";
import { fetcher } from "./fetcher";
import { RealWorldStorage } from "./storage";

export class ProfileRepository implements IProfileRepository {
  async getProfile(username: string): Promise<Profile | GenericError> {
    try {
      const response = await fetcher(`profiles/${username}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("jwt")}`,
        },
      });
      return response.profile;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
  async followUser(username: string): Promise<Profile | GenericError> {
    try {
      const response = await fetcher(`profiles/${username}/follow`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("jwt")}`,
        },
      });
      return response.profile;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
  async unfollowUser(username: string): Promise<Profile | GenericError> {
    try {
      const response = await fetcher(`profiles/${username}/follow`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          authorization: `Token ${RealWorldStorage.get("jwt")}`,
        },
      });
      return response.profile;
    } catch (error: any) {
      return {
        errors: {
          body: [error.message],
        },
      };
    }
  }
}
