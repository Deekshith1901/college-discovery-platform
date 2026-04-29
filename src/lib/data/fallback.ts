import type { College } from "@/types/college";

export const fallbackColleges: College[] = [
  {
    id: "1",
    name: "National Institute of Technology, Trichy",
    location: "Tamil Nadu",
    fees: 180000,
    rating: 4.6,
    placement_percentage: 92,
    overview: "Premier engineering institute with strong academics and placements.",
    courses: ["B.Tech CSE", "B.Tech ECE", "M.Tech"],
    reviews: [{ user: "A. Sharma", rating: 5, comment: "Excellent campus and faculty." }],
  },
  {
    id: "2",
    name: "Delhi Technological University",
    location: "Delhi",
    fees: 210000,
    rating: 4.4,
    placement_percentage: 88,
    overview: "Top state university known for engineering and innovation.",
    courses: ["B.Tech IT", "B.Tech ME", "MBA"],
    reviews: [{ user: "R. Verma", rating: 4, comment: "Great peer group and opportunities." }],
  },
  {
    id: "3",
    name: "VIT Vellore",
    location: "Tamil Nadu",
    fees: 350000,
    rating: 4.2,
    placement_percentage: 85,
    overview: "Large private university with diverse programs and global exposure.",
    courses: ["B.Tech CSE", "B.Des", "MCA"],
    reviews: [{ user: "P. Singh", rating: 4, comment: "Good infrastructure and coding culture." }],
  },
];
