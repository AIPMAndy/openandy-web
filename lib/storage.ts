export interface UserProfile {
  name: string;
  avatar: string;
  isLoggedIn: boolean;
}

const STORAGE_KEYS = {
  USER_PROFILE: "openandy_user_profile",
};

function isClient(): boolean {
  return typeof window !== "undefined";
}

export function getUserProfile(): UserProfile {
  if (!isClient()) return { name: "User", avatar: "👤", isLoggedIn: false };
  const data = localStorage.getItem(STORAGE_KEYS.USER_PROFILE);
  return data ? JSON.parse(data) : { name: "User", avatar: "👤", isLoggedIn: false };
}

export function saveUserProfile(profile: UserProfile): void {
  if (!isClient()) return;
  localStorage.setItem(STORAGE_KEYS.USER_PROFILE, JSON.stringify(profile));
}

export function isLoggedIn(): boolean {
  return getUserProfile().isLoggedIn;
}
