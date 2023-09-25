import type { Profile } from "../profile";

export interface Content {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: Profile;
}
