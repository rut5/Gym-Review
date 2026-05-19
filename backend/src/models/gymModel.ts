export interface Review {
  id: number;
  author: string;
  rating: number;
  comment?: string;
}

export interface Gym {
  id: number;
  name: string;
  location: string;
  description?: string;
  reviews: Review[];
}

export const gyms: Gym[] = [
  {
    id: 1,
    name: "CrossFit Paradise",
    location: "Malmö",
    description: "Det största CrossFit gymmet i Skåne med toppmoderna faciliteter",
    reviews: [],
  },
  {
    id: 2,
    name: "Fitness Hub",
    location: "Lund",
    description: "Ett modernt träningscenter med fokus på gruppträning",
    reviews: [],
  },
];
