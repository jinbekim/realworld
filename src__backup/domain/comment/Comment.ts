import { Profile } from "../profile/Profile";

export interface IComment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}

export interface NewComment {
  body: string;
}
