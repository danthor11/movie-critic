export interface User {
  username: string;
  password: string;
  email?: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  password: string;
}

export const registerUser = (user: User) => {
  return fetch("/api/user/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

export const updateEmailById = (userId: string, email: string) => {
  return fetch(`/api/user/${userId}`, {
    method: "PUT",
    body: JSON.stringify({ email }),
  });
};

export const loginUser = (user: User) => {
  return fetch("/api/user/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

export function logoutSession() {
  return fetch("/api/user/logout");
}
