import { Injectable } from '@nestjs/common';
import { HashServiceInterface } from '../../interfaces/hash-service.interface'
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  async generateHash(value: string, salt?: string): Promise<HashServiceInterface> {
    const saltOrRounds = salt || await bcrypt.genSalt();
    const hash = await bcrypt.hash(value, saltOrRounds);
    return Promise.resolve({ hash, saltOrRounds })
  }
}
