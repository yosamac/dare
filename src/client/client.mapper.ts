import { ClientDTO } from './dto/client.dto';
import { PolicyDTO } from '../common/dtos/policy.dto';


export function toPolicyDTO(data: any): PolicyDTO {
  return {
    id: data?.id,
    amountInsured: data?.amountInsured,
    inceptionDate: data?.inceptionDate,
    installmentPayment: data?.installmentPayment,
    email: data?.email
  };
}

export function toPolicyListDTO(data: any[]): PolicyDTO[] {
  return data.map(toPolicyDTO);
}

export function toClientDTO(data: any): ClientDTO {
  return {
    id: data.id,
    name: data.name,
    email: data.email,
    role: data.role,
    policies: toPolicyListDTO(data.policies)
  };
}

export function toClientListDTO(data:any[]): ClientDTO[] {
  return data.map(toClientDTO);
}

