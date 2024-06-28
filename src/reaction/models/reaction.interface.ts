import { BlogEntry } from "src/blog/model/blog-entry.interface";
import { User } from "src/user/models/user.interface";

export interface Reaction {
    id?: number;
    type?: string;
    createdAt?: Date;
    reactedBlog?: BlogEntry;
    reactionAuthor?: User;
}