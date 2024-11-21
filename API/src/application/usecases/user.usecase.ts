import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserRepository } from "../../domain/repositories/user.respository";
import { User } from "../../domain/entities/user.entity";
import { ERROR_MESSAGES } from "../../shared/constants/error-messages";

export class UserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async createUser(username: string, password: string): Promise<User> {
    const existingUser = await this.userRepository.findByUsername(username);
    if (existingUser) {
      throw new Error(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User();
    user.username = username;
    user.password = hashedPassword;
    user.isActive = true;

    return await this.userRepository.createUser(user);
  }

  async deactivateUser(userId: string): Promise<void> {
    await this.userRepository.deactivateUser(userId);
  }

  async authenticateUser(username: string, password: string): Promise<string> {
    const user = await this.userRepository.findByUsername(username);
    if (!user || !user.isActive) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });
  }
}
