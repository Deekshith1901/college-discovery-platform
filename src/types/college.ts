export type College = {
  id: string;
  name: string;
  slug?: string;
  location: string;
  fees: number;
  rating: number;
  placement_percentage: number;
  overview: string;
  courses: string[];
  reviews: { user: string; rating: number; comment: string }[];
};

export type CollegeFilters = {
  search?: string;
  location?: string;
  maxFees?: number;
  course?: string;
  page?: number;
  limit?: number;
};
