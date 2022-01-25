import { Invoice } from "@models/invoice/invoice.model";

export class User {
  constructor(
    public ID: number = 0,
    public FullName?: string,
    public Username?: string,
    public Email?: string,
    public Phone?: string,
    public IsAdmin?: boolean,
    public CreatedDate?: Date,
    public Password?: string,
    public ConfirmPassword?: string,
    public Invoices?: Invoice[],
  ) {}
}
