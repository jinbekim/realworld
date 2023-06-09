import { User, UserProfile } from "./type";

export const updateProfile = (user: User, newProfile: UserProfile): User => {
  return {
    ...user,
    profile: newProfile,
  };
};
