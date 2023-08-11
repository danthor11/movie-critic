import { MovieCredits, PersonInfo } from "@/types/crewResponse";

export interface PersonData {
  person_info: PersonInfo;
  movie_credits: MovieCredits;
}
export const getPersonInfor = (id: string): Promise<PersonData> => {
  return fetch(`http://localhost:3000/api/people/${id}`)
    .then((res) => res.json())
    .catch((err) => err);
};
