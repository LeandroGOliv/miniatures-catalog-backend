import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}
  async signIn(username: string, password: string): Promise<any> {
    const adminUser = this.configService.get<string>('ADMIN_USER');
    const adminPasswordHash = this.configService.get<string>(
      'ADMIN_PASSWORD_HASH',
    );

    if (!adminPasswordHash || !adminUser) {
      throw new Error('Variáveis de ambiente não configuradas');
    }

    const isValid = await bcrypt.compare(password, adminPasswordHash);

    if (username !== adminUser || !isValid) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    const payload = { user: username };
    const token = await this.jwtService.signAsync(payload);
    return { user: payload.user, token };
  }
}
