import { Injectable } from '@nestjs/common';
import { PatientDto } from 'apps/patients/src/dtos/patients.dto';

@Injectable()
export class PatientsService {
  private patients: PatientDto[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St, Anytown, USA',
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '0987654321',
      address: '456 Oak Ave, Anycity, USA',
    },
    {
      id: 3,
      name: 'Jim Beam',
      email: 'jim.beam@example.com',
      phone: '1122334455',
      address: '789 Pine St, Anyvillage, USA',
    },
  ];
  findAll(): PatientDto[] {
    return this.patients;
  }
}
