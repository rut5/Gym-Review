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
  imageUrl?: string;
  reviews: Review[];
}

export const gyms: Gym[] = [
  {
    id: 1,
    name: "CrossFit Paradise",
    location: "Malmö",
    description: "Det största CrossFit gymmet i Skåne med toppmoderna faciliteter",
    imageUrl: "/gym-8.webp",
    reviews: [],
  },
  {
    id: 2,
    name: "Fitness Hub",
    location: "Lund",
    description: "Ett modernt träningscenter med fokus på gruppträning",
    imageUrl: "/gym-10.webp",
    reviews: [],
  },
  {
    id: 3,
    name: "Träningscentralen",
    location: "Stockholm",
    description: "Klassiskt gym i hjärtat av Stockholm med allt du behöver",
    imageUrl: "/gym-2.jpg",
    reviews: [],
  },
];
