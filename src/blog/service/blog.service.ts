import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/user.interface';
import { BlogEntry } from '../model/blog-entry.interface';
import { Observable, find, from, map, of, switchMap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';
import { BlogEntryEntity } from '../model/blog-entry.entity';
const slugify = require('slugify');

@Injectable()
export class BlogService {

    constructor(
        @InjectRepository(BlogEntryEntity) private readonly blogRepository: Repository<BlogEntry>,
        private userService: UserService
    ) { }

    create(user: User, blogEntry: BlogEntry): Observable<BlogEntry> {
        blogEntry.author = user;
        return this.generateSlug(blogEntry.title).pipe(
            switchMap((slug: string) => {
                blogEntry.slug = slug;
                return from(this.blogRepository.save(blogEntry));
            })
        )
    }

    findOne(id: number): Observable<BlogEntry> {
        return from(this.blogRepository.findOne({
            where: {
                author: { id: id }
            },
            relations: ['author']
        }));
    }

    findAll(): Observable<BlogEntry[]> {
        return from(this.blogRepository.find({ relations: ['author'] }));
    }

    findByUser(userId: number): Observable<BlogEntry[]> {
        return from(this.blogRepository.find({
            where: {
                author: { id: userId }
            },
            relations: ['author']
        })).pipe(map((blogEntries: BlogEntry[]) => blogEntries))
    }

    generateSlug(title: string): Observable<string> {
        return of(slugify(title));
    }
}
