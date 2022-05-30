import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  private readonly _connectionString!: string;
  private readonly _port: number;

  get mongoConnectionString(): string {
    return this._connectionString;
  }

  get port(): number {
    return this._port;
  }

  constructor(private readonly _configService: ConfigService) {
    this._connectionString = this._getConnectionStringFromEnvFile();
    this._port = this._getPort();
  }

  private _getPort(): number {
    const port = this._configService.get<number>('PORT');
    if (!port) {
      throw new Error('No port number present');
    }

    return port;
  }

  private _getConnectionStringFromEnvFile(): string {
    const connectionString = this._configService.get<string>('MONGODB_DB_URI');
    if (!connectionString) {
      throw new Error(
        'No connection string has been provided in the .env file.',
      );
    }

    return connectionString;
  }
}
