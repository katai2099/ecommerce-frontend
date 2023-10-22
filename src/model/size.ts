export interface ISize {
  id: number;
  name: string;
  publish: boolean;
  lastModified: string;
}

export class Size implements ISize {
  constructor(
    public id = 0,
    public name = "",
    public publish = true,
    public lastModified = ""
  ) {}
}
