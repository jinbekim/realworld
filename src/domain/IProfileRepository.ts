import type { Profile } from "./Profile";

export interface IProfileRepository {
  getProfile(username: string): Promise<Profile>;
  followUser(username: string): Promise<Profile>;
  unfollowUser(username: string): Promise<Profile>;
}
