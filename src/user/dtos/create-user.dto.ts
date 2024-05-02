export class CreateUserDto {
  username: string;
  password: string;
  changePasswordAt?: Date;
  createToken: () => string;
  createGuestToken: () => string;
  comparePassword: (password: string) => boolean;
  verificationCode: string | undefined;
  passwordResetExpires: Date | undefined;
  passwordResetVerified: boolean | undefined;
}
