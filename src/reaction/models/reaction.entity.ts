import { BlogEntryEntity } from "src/blog/model/blog-entry.entity";
import { UserEntity } from "src/user/models/user.entity";
import { User } from "src/user/models/user.interface";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('blog_reaction')
export class ReactionEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @ManyToOne(type => UserEntity, user => user.reaction)
    reactedUser: User;

    @ManyToOne(type => BlogEntryEntity, blogEntryEntity => blogEntryEntity.reaction)
    reactedBlog: BlogEntryEntity; 
}
