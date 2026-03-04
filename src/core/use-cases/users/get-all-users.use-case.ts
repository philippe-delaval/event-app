import { AuthRepository, User } from "../../repositories/auth.repository";

export async function getAllUsersUseCase(dependencies: {
  authRepository: AuthRepository;
}): Promise<User[]> {
  return dependencies.authRepository.findAllUsers();
}
