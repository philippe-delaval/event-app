import { Knex } from "knex";

export type UserRole = "PARTICIPANT" | "ORGANIZER" | "ADMIN";

export interface User {
  id: number;
  email: string;
  password_hash: string;
  role: UserRole;
  created_at: Date;
}

export class AuthRepository {
  constructor(private readonly knex: Knex) {}

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.knex("users").where({ email }).first();
    return user || null;
  }

  async createUser(
    email: string,
    passwordHash: string,
    role: UserRole = "ORGANIZER",
  ): Promise<void> {
    await this.knex("users").insert({
      email,
      password_hash: passwordHash,
      role,
    });
  }

  async findAllUsers(): Promise<User[]> {
    return this.knex("users").select("*").orderBy("created_at", "desc");
  }
}
