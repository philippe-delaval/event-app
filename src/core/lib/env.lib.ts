export function getEnvVariable(name: string): string {
  if (!process.env[name]) {
    throw new EnvVariableNotSetError(name);
  }

  return process.env[name]!;
}

export class EnvVariableNotSetError extends Error {
  constructor(name: string) {
    super(`Environment variable ${name} is not set`);
  }
}
