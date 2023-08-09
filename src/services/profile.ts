interface UserGetResponse {
  Profile: {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    location: string;
  } | null;
  id: string;
  username: string;
  email: string;
  password: string;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface ProfilePutResponse {
  user: {
    image: string | null;
    username: string;
    email: string;
  };
  id: string;
  name: string;
  location: string;
  bio: string;
  avatar: string;
  userId: string;
}

export interface ProfileBody {
  name: string;
  location: string;
  bio: string;
  avatar: string;
}

export interface ProfileResponse {
  id: string;
  name: string;
  location: string;
  bio: string;
  avatar: string;
  userId: string;
  user: User;
}

export interface User {
  email: string;
  username: string;
  id: string;
}

export interface ProfileState {
  id: string;
  avatar: string;
  bio: string;
  location: string;
  name: string;
  user: {
    id: string;
    username: string;
    email: string;
    image: string | null;
  };
}

const resToJson = async (res: Response) => {
  return await res.json();
};

const formatingUserResponse = (user: UserGetResponse): ProfileState => {
  if (!user.Profile) throw Error("Profile doesnt exists");
  return {
    id: user.Profile.id,
    avatar: user.Profile.avatar,
    bio: user.Profile.bio,
    location: user.Profile.location,
    name: user.Profile.name,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      image: user.image,
    },
  };
};

const formatingProfileResponse = (
  profile: ProfilePutResponse
): ProfileState => {
  return {
    id: profile.id,
    avatar: profile.avatar,
    bio: profile.bio,
    location: profile.location,
    name: profile.name,
    user: {
      id: profile.userId,
      username: profile.user.username,
      email: profile.user.email,
      image: profile.user.image,
    },
  };
};

export const getProfileById = (id: string) => {
  return fetch(`http://localhost:3000/api/user/${id}`)
    .then(resToJson)
    .then(formatingUserResponse);
};

export const updateProfileById = (id: string, body: ProfileBody) => {
  return fetch(`/api/profile/${id}`, {
    method: "PUT",
    body: JSON.stringify(body),
  })
    .then(resToJson)
    .then(formatingProfileResponse);
};

export const createProfile = (userId: string, body: ProfileBody) => {
  return fetch("/api/profile", {
    method: "POST",
    body: JSON.stringify({ ...body, userId }),
  }).then(resToJson);
};
