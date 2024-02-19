import Category from "./Category";

interface Note {
    id: number;
    title: string;
    content: string | null;
    UserId: number | null;
    archived: boolean;
    createdAt: Date | null;
    updatedAt: Date | null;
    Categories: Category[];
};

export default Note;