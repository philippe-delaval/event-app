import { AuthRepository } from "../../repositories/auth.repository";
import { compare } from "bcryptjs";

interface LoginParams {
  email: string;
  password: string; // Plain text password
}

interface LoginResult {
  success: boolean;
  userId?: string;
  email?: string;
  role?: string;
  error?: string;
}

export async function loginUseCase(
  dependencies: { authRepository: AuthRepository },
  params: LoginParams,
): Promise<LoginResult> {
  const { email, password } = params;

  const user = await dependencies.authRepository.findUserByEmail(email);

  if (!user) {
    return { success: false, error: "Invalid credentials" };
  }

  const isPasswordValid = await compare(password, user.password_hash);

  if (!isPasswordValid) {
    return { success: false, error: "Invalid credentials" };
  }

  return {
    success: true,
    userId: user.id.toString(),
    email: user.email,
    role: user.role,
  };
}
