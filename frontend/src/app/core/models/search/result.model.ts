
export class Results<T> {
  constructor(
    public Result: T[] = [],
    public TotalCount: number = 0,
  ) {}
}
