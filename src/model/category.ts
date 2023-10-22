export interface ICategory {
  id: number;
  name: string;
  isTop: boolean;
  publish: boolean;
  lastModified: string;
  categoryImage: string;
}

export interface CategoryProps {
  category: ICategory;
}

export class Category implements ICategory {
  constructor(
    public id = 0,
    public name = "",
    public isTop = false,
    public publish = true,
    public lastModified = "",
    public categoryImage = ""
  ) {}
}
