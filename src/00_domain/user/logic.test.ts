import { describe, expect, it, test } from "vitest";
import { User, UserProfile } from "./type";
import { updateProfile } from "./logic";

describe("updateProfile", () => {
  test("새로운 프로필을 입력하면 기존 프로필을 업데이트합니다.", () => {
    const user: User = {
      id: "1",
      name: "이름",
      email: "이메일",
      profile: {
        avatarUrl: "아바타",
        bio: "바이오",
      },
      followers: [],
    };
    const newProfile: UserProfile = {
      avatarUrl: "새로운 아바타",
      bio: "새로운 바이오",
    };
    const updatedUser = updateProfile(user, newProfile);
    expect(updatedUser.profile.avatarUrl).toBe("새로운 아바타");
    expect(updatedUser.profile.bio).toBe("새로운 바이오");
  });
});
