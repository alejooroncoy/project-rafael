export class User {
  constructor(
    public readonly uid: string,
    public email: string,
    public name: string,
    public role: string,
    public createdAt: Date,
    public updatedAt: Date
  ) {}
} 