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
    author: "The Quran",
    year: 610,
    note: "The book I return to before any of the others.",
    cover: "/books/quran.jpg",
  },
  {
    id: "alchemist",
    title: "The Alchemist",
    author: "Paulo Coelho",
    year: 1988,
    note: "A shepherd follows a dream, and the journey becomes the point.",
    cover: "/books/alchemist.jpg",
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
    id: "richdad",
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    year: 1997,
    note: "Two ways of thinking about money, told as a lesson.",
    cover: "/books/richdad.jpg",
  },
  {
    id: "thinking",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: 2011,
    note: "The quick mind and the careful mind, and when each one misleads you.",
    cover: "/books/thinking.jpg",
  },
  {
    id: "meaning",
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    year: 1946,
    note: "A psychologist's account of what people live for when everything else is gone.",
    cover: "/books/meaning.jpg",
  },
];
