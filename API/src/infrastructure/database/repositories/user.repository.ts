import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../../env/config";


export const UserRepository = AppDataSource.getRepository(User);