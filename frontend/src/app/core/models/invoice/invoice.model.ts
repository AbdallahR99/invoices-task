import { User } from "@models/user/user.model";

export class Invoice {
  constructor(
    public ID: number = 0,
    public Product?: string,
    public Quantity?: number,
    public Price?: number,
    public UserID?: number,
    public CreatedDate?: Date,
    // TODO: must be just user, change it in the backend
    public Users?: User,
  ) {}
}
