// // export type User = {
// //   id: UniqueId
// //   name: UserName
// //   email: Email
// //   profile: UserProfile
// //   followers: UniqueId[]
// // }

import { User, UserProfile } from "./type";

// import { describe, expect, it, test } from "vitest";
// import { User, UserProfile } from "./type";

// // export type UserName = string

// // export type UserBio = string

// // export type UserProfile = {
// //   avatarUrl: string
// //   bio: string
// // }

// // user의 profile을 업데이트하는 기능을 테스트합니다.
// // 함수명은 updateProfile로 합니다.
// // 함수의 인자는 아래와 같습니다.

// // type UpdateProfile = (user: User, newProfile: UserProfile) => User

// describe("updateProfile", () => {
//   test("새로운 프로필을 입력하면 기존 프로필을 업데이트합니다.", () => {
//     const user: User = {
//       id: "1",
//       name: "이름",
//       email: "이메일",
//       profile: {
//         avatarUrl: "아바타",
//         bio: "바이오",
//       },
//       followers: [],
//     };
//     const newProfile: UserProfile = {
//       avatarUrl: "새로운 아바타",
//       bio: "새로운 바이오",
//     };
//     const updatedUser = updateProfile(user, newProfile);
//     expect(updatedUser.profile.avatarUrl).toBe("새로운 아바타");
//     expect(updatedUser.profile.bio).toBe("새로운 바이오");
//   });
// });

export const updateProfile = (user: User, newProfile: UserProfile): User => {
  return {
    ...user,
    profile: newProfile,
  };
};
