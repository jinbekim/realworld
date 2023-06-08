import type { Profile } from "./Profile";

export interface IProfileRepository {
  getProfile(username: string): Promise<Profile | GenericError>;
  followUser(username: string): Promise<Profile | GenericError>;
  unfollowUser(username: string): Promise<Profile | GenericError>;
}
