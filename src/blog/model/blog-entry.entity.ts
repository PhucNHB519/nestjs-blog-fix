import { UserEntity } from "src/user/models/user.entity";
import { BeforeUpdate, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('blog-entry')
export class BlogEntryEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    slug: string;

    @Column({ default: '' })
    description: string;

    @Column({ default: '' })
    body: string;

    @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: 'datetime', default: () => "CURRENT_TIMESTAMP" })
    updatedAt: Date;

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date;
    }

    @Column({ default: 0 })
    likes: number;

    @Column()
    headerImage: string;

    @Column()
    publishedDate: Date;

    @Column()
    isPublished: boolean;

    @ManyToOne(type => UserEntity, user => user.blogEntries)
    author: UserEntity;

}