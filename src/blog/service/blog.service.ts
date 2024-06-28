import { Injectable } from '@nestjs/common';
import { User } from 'src/user/models/user.interface';
import { BlogEntry } from '../model/blog-entry.interface';
import { Observable, find, from, map, of, switchMap } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from 'src/user/service/user.service';
import { BlogEntryEntity } from '../model/blog-entry.entity';
import { IPaginationOptions, Pagination, paginate } from 'nestjs-typeorm-paginate';
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
                id : id
            },
            relations: ['author']   
        }));
    }

    findAll(): Observable<BlogEntry[]> {
        return from(this.blogRepository.find({ relations: ['author'] }));
    }

    paginationAll(options: IPaginationOptions): Observable<Pagination<BlogEntry>> {
        return from(paginate<BlogEntry>(this.blogRepository, options, {
            relations: ['author']
        })).pipe(
            map((blogEntries: Pagination<BlogEntry>) => blogEntries)
        )
    }

    paginationByUser(options: IPaginationOptions, userId: number): Observable<Pagination<BlogEntry>> {
        return from(paginate<BlogEntry>(this.blogRepository, options, {
            relations: ['author'],
            where: [
                { author : { id: userId} }
            ]
        })).pipe(
            map((blogEntries: Pagination<BlogEntry>) => blogEntries)
        )
    }

    findByUser(userId: number): Observable<BlogEntry[]> {
        return from(this.blogRepository.find({
            where: {
                author: { id: userId }
            },
            relations: ['author']
        })).pipe(map((blogEntries: BlogEntry[]) => blogEntries))
    }

    updateOne(id: number, blogEntry: BlogEntry): Observable<BlogEntry> {
        return from(this.blogRepository.update(id, blogEntry)).pipe(
            switchMap(() => this.findOne(id))
        )
    }

    generateSlug(title: string): Observable<string> {
        return of(slugify(title));
    }
}
