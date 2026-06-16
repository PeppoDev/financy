import bcrypt from "bcryptjs";

export class CryptHelper {
  static async hash(plain: string) {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(plain, salt);
  }

  static async compare(plain: string, hashed: string) {
    return bcrypt.compare(plain, hashed);
  }
}
