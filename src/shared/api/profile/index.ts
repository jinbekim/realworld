import { fetcher } from "../fetcher";

export interface ProfileDto {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export const getProfileByUserName = async (username: Name): Promise<ProfileDto> => {
  const response = await fetcher(`profiles/${username}`, {
    method: 'GET',
  });
  return response.profile;
}


export const followUserByUsername = async (username: Name): Promise<ProfileDto> => {
  const response = await fetcher(`profiles/${username}/follow`, {
    method: 'POST',
  });
  return response.profile;
}

export const unfollowUserByUsername = async (username: Name): Promise<ProfileDto> => {
  const response = await fetcher(`profiles/${username}/follow`, {
    method: 'DELETE',
  });
  return response.profile;
}
