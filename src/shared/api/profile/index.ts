import { fetcher } from "../fetcher";

export interface ProfileDto {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export const getProfileByUserName = async (username: Name, options: RequestInit = {}): Promise<ProfileDto> => {
  const response = await fetcher(`profiles/${username}`, {
    method: 'GET',
    ...options
  });
  return response.profile;
}


export const followUserByUsername = async (username: Name, options: RequestInit = {}): Promise<ProfileDto> => {
  const response = await fetcher(`profiles/${username}/follow`, {
    method: 'POST',
    ...options
  });
  return response.profile;
}

export const unfollowUserByUsername = async (username: Name, options: RequestInit = {}): Promise<ProfileDto> => {
  const response = await fetcher(`profiles/${username}/follow`, {
    method: 'DELETE',
    ...options
  });
  return response.profile;
}
