export interface Answer {
  id : string,
  content: string,
  createdAt : string,
  updatedAt : string,
  questionId :string
  userId: string;
}

export interface Question {
  id: string;
  content: string;
  userId?: string;
  createdAt?: string;
  updatedAt? : string
  answers?: Answer[];
}
