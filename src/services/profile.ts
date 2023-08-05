export const getProfileById = (id: number) => {
  return fetch(`/api/profile/${id}`);
};
