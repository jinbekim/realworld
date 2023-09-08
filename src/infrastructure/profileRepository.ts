import type { IProfileRepository } from '@/entities/profile/IProfileRepository';
import type { Profile } from '@/entities/profile/Profile';
import { fetcher } from '@/shared/api/fetcher';
import { RealWorldStorage } from './storage';

export class ProfileRepository implements IProfileRepository {
  async getProfile(username: string): Promise<Profile | GenericError> {
    try {
      const response = await fetcher(`profiles/${username}`, {
        method: 'GET',
      });
      return response.profile;
    } catch (error: any) {
      return error;
    }
  }
  async followUser(username: string): Promise<Profile | GenericError> {
    try {
      const response = await fetcher(`profiles/${username}/follow`, {
        method: 'POST',
      });
      return response.profile;
    } catch (error: any) {
      return error;
    }
  }
  async unfollowUser(username: string): Promise<Profile | GenericError> {
    try {
      const response = await fetcher(`profiles/${username}/follow`, {
        method: 'DELETE',
      });
      return response.profile;
    } catch (error: any) {
      return error;
    }
  }
}
