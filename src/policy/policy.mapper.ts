import { PolicyDTO } from './dto/policy.dto';

export function toPolicyDTO(data: any): PolicyDTO {
  return {
    id: data.id,
    amountInsured: data.amountInsured,
    email: data.email,
    inceptionDate: data.inceptionDate,
    installmentPayment: data.installmentPayment
  };
}

export function toPolicyListDTO(data:any[]): PolicyDTO[] {
  return data.map(toPolicyDTO);
}