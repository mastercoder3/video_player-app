export class Category {
    constructor(name: string, picture?: string) {
        this.name = name;
        this.picture = picture;
    }

    categoryId: string;
    name: string;
    picture: string;
}
