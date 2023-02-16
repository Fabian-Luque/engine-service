import { Module } from '@nestjs/common';
import { pbkdf2Sync } from 'crypto';

export interface PasswordGenerator {
  generateKey: (secret: string) => string;
}

class PasswordGeneratorImplement implements PasswordGenerator {
  generateKey(secret: string): string {
    // implement cifrado de contraseña
    return secret;
    return pbkdf2Sync(secret, 'salt', 100000, 256, 'sha512').toString();
  }
}

export const PASSWORD_GENERATOR = 'PasswordGenerator';

@Module({
  providers: [
    {
      provide: PASSWORD_GENERATOR,
      useClass: PasswordGeneratorImplement,
    },
  ],
  exports: [PASSWORD_GENERATOR],
})
export class PasswordModule {}
