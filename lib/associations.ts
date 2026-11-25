export type Association = {
  id: string;
  name: string;
  logo: string;
};

export type AssociationGroup = {
  id: string;
  title: string;
  featured?: boolean;
  associations: Association[];
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const logo = (id: string) => `${basePath}/logos/${id}.png`;

export const associationGroups: AssociationGroup[] = [
  {
    id: "no-need",
    title: "جمعيات ليس لديها احتياج تقني أساسًا",
    associations: [
      { id: "himam", name: "همم", logo: logo("himam") },
      { id: "fayd", name: "فيض", logo: logo("fayd") },
      { id: "ghiras", name: "غراس", logo: logo("ghiras") },
    ],
  },
  {
    id: "has-tech",
    title: "جمعيات لديها قسم تقني أو تعمل مع تقنيين",
    associations: [
      { id: "ihsan", name: "الإحسان", logo: logo("ihsan") },
      { id: "kayan", name: "كيان", logo: logo("kayan") },
      { id: "tarmeem", name: "ترميم", logo: logo("tarmeem") },
    ],
  },
  {
    id: "no-tech",
    title: "جمعيات ليس لديها تقنيون",
    featured: true,
    associations: [
      { id: "rifaq", name: "رفاق", logo: logo("rifaq") },
      { id: "amal", name: "آمال", logo: logo("amal") },
      { id: "diyaa", name: "ضياء", logo: logo("diyaa") },
      { id: "takatuf", name: "تكاتف", logo: logo("takatuf") },
    ],
  },
];
