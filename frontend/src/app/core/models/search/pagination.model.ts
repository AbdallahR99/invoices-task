export class Pagination {
  constructor(
    public PageNumber: number = 1,
    public PageSize: number = 12,
    public SearchBy?: string,

  ) {}
}
