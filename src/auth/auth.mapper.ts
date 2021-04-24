import { LoginDTO } from './dto/request/login.dto';
import { AuthResponseDTO } from './dto/auth.dto';

export function toOAuthDTO(dto: LoginDTO) {
  return {
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_id: dto.username,
    // eslint-disable-next-line @typescript-eslint/camelcase
    client_secret: dto.password
  };
}

export function toAuthResponseDTO(data:any): AuthResponseDTO {
  return {
    token: data.token,
    type: data.type,
    // eslint-disable-next-line @typescript-eslint/camelcase
    expires_in: data.expiresIn
  };
}