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

export const login = async (user: LoginUserDto, options: RequestInit = {}): Promise<UserDto>  => {
  const response = await fetcher('users/login', {
    method: 'POST',
    body: JSON.stringify({ user: user }),
    ...options

  });
  return response.user;
}

export const register = async (user: NewUserDto, options: RequestInit = {}): Promise<UserDto> => {
  const response = await fetcher('users', {
    method: 'POST',
    body: JSON.stringify({ user }),
    ...options

  });
  return response.user;
}

export const currentUser = async (options: RequestInit = {}): Promise<UserDto> => {
  const response = await fetcher('user', {
    method: 'GET',
    ...options

  });
  return response.user;
}

