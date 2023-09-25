import { fetcher } from "../fetcher";

export interface UserDto {
  email: Email;
  token: Token;
  username: Name;
  bio: Text;
  image: Url;
}

export type UpdateUser = RequiredAtLeastOne<{
  email: string;
  password: string;
  username: string;
  bio: string;
  image: string;
}>;

export interface NewUserDto {
  username: string;
  email: string;
  password: string;
}

export interface LoginUserDto {
  email: string;
  password: string;
}

export const login = async (user:LoginUserDto): Promise<UserDto>  => {
  const response = await fetcher('users/login', {
    method: 'POST',
    body: JSON.stringify({ user: user }),
  });
  return response.user;
}

export const register = async (user: NewUserDto): Promise<UserDto> => {
  const response = await fetcher('users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ user }),
  });
  return response.user;
}

export const currentUser = async (): Promise<UserDto> => {
  const response = await fetcher('user', {
    method: 'GET',
  });
  return response.user;
}

export const updateCurrentUser = async (user: UpdateUser):Promise<UserDto> => {
  const response = await fetcher('user', {
    method: 'PUT',
    body: JSON.stringify({ user }),
  });
  return response.user;
}
