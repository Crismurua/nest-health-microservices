export class PatientDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export class CreatePatientDto {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export class UpdatePatientDto {
  name?: string;
  email?: string;
  phone?: string;
  address?: string;
}