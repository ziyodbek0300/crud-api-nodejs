import { IncomingMessage, ServerResponse } from "http";
import {
    CreateUserService,
    GetAllUsersService,
    GetSingleUserService,
    UpdateUserService,
    DeleteUserService
} from "../services";

export const CreateUserController = async (req: IncomingMessage, res: ServerResponse) => {
    const createUserService = await CreateUserService(req, res);
    return createUserService;
}

export const GetAllUserController = async (req: IncomingMessage, res: ServerResponse) => {
    const getAllUsersService = await GetAllUsersService(req, res);
    return getAllUsersService;
}

export const GetSingleUserController = async (req: IncomingMessage, res: ServerResponse) => {
    const getSingleUserService = await GetSingleUserService(req, res);
    return getSingleUserService;
}

export const UpdateUserController = async (req: IncomingMessage, res: ServerResponse) => {
    const updateUserService = await UpdateUserService(req, res);
    return updateUserService;
}

export const DeleteUserController = async (req: IncomingMessage, res: ServerResponse) => {
    const deleteUserService = await DeleteUserService(req, res);
    return deleteUserService;
}