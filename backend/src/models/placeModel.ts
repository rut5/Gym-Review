export interface Review {
  id: number;
  author: string;
  rating: number;
  comment?: string;
}

export interface Place {
  id: number;
  name: string;
  location: string;
  description?: string;
  reviews: Review[];
}

export const places: Place[] = [
  {
    id: 1,
    name: "Central Cafe",
    location: "Malmö",
    description: "Cozy coffee place",
    reviews: [], //leaving reviews empty for now
  },
  {
    id: 2,
    name: "Fitness Hub",
    location: "Lund",
    description: "Modern training center",
    reviews: [],
  },
];
