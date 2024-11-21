import * as bcrypt from 'bcryptjs';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';


export class UserService {
    async createUser(username: string, password: string) {
        const hashedPassword =  await bcrypt.hash(password, 10);
        const user = UserRepository.create({ username, password: hashedPassword, isActive: true });
        return await UserRepository.save(user);
    }

    async deactivateUser(userId: string) {
        const user = await UserRepository.findOneBy({ id: userId });
        if (!user) throw new Error('User not found');

        user.isActive = false;
        return await UserRepository.save(user);
    }

    async authenticateUser(username: string, password: string) {
        const user = await UserRepository.findOneBy({ username });
        if (!user || !user.isActive) throw new Error('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) throw new Error('Invalid credentials');

        return user;
    }
}