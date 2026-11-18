export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  note: string;
  cover: string;
}

export const booksConfig = {
  title: "Books",
  note: "Books I keep coming back to",
};

export const books: Book[] = [
  {
    id: "quran",
    title: "Quran",
    author: "",
    year: 610,
    note: "The book I return to before any of the others.",
    cover: "/books/quran.jpg",
  },
  {
    id: "atomic",
    title: "Atomic Habits",
    author: "James Clear",
    year: 2018,
    note: "Small changes, repeated, become the person you are.",
    cover: "/books/atomic.jpg",
  },
  {
    id: "power",
    title: "The 48 Laws of Power",
    author: "Robert Greene",
    year: 1998,
    note: "A field guide to power, read with your eyes open.",
    cover: "/books/power.jpg",
  },
  {
    id: "shoe",
    title: "Shoe Dog",
    author: "Phil Knight",
    year: 2016,
    note: "The messy years of building Nike, before it looked inevitable.",
    cover: "/books/shoe.jpg",
  },
  {
    id: "elon",
    title: "The Book of Elon",
    author: "Shelf copy",
    year: 2024,
    note: "A spine I keep returning to when the work gets loud.",
    cover: "/books/elon.jpg",
  },
  {
    id: "jobs",
    title: "Steve Jobs",
    author: "Walter Isaacson",
    year: 2011,
    note: "Taste, focus, and the cost of caring about the work.",
    cover: "/books/jobs.jpg",
  },
  {
    id: "subtle",
    title: "The Subtle Art of Not Giving a F*ck",
    author: "Mark Manson",
    year: 2016,
    note: "Choose what deserves your attention, and let the rest go.",
    cover: "/books/subtle.jpg",
  },
  {
    id: "money",
    title: "The Psychology of Money",
    author: "Morgan Housel",
    year: 2020,
    note: "Behavior beats spreadsheets.",
    cover: "/books/money.jpg",
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    year: 2002,
    note: "A private notebook that still reads like advice.",
    cover: "/books/meditations.jpg",
  },
  {
    id: "anyone",
    title: "If Anyone Builds It, Everyone Dies",
    author: "Eliezer Yudkowsky and Nate Soares",
    year: 2025,
    note: "A warning I keep within reach.",
    cover: "/books/anyone.jpg",
  },
  {
    id: "winning",
    title: "The Habit of Winning",
    author: "Prakash Iyer",
    year: 2015,
    note: "Stories about showing up again.",
    cover: "/books/winning.jpg",
  },
];
