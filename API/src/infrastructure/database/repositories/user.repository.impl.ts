import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { AppDataSource } from "../../env/config";
import { UserRepository } from "../../../domain/repositories/user.respository";


export class UserRepositoryImpl implements UserRepository {
    private repository: Repository<UserEntity> = AppDataSource.getRepository(UserEntity);

    async createUser(user: Partial<UserEntity>): Promise<UserEntity> {
        const newUser = this.repository.create(user);
        return await this.repository.save(newUser);
    }

    async findByUsername(username: string): Promise<UserEntity | null> {
        return await this.repository.findOneBy({ username }) || null;
    }

    async findUserById(userId: string): Promise<UserEntity | null> {
        return await this.repository.findOneBy({ id: userId}) || null;
    }

    async deactivateUser(userId: string): Promise<void> {
        const user = await this.findUserById(userId);
        if (user) {
            user.isActive = false;
            await this.repository.update(user.id, user);
            await this.repository.save(user);
        }
    }
    
}
