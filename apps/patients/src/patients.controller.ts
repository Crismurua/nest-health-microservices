import { Controller } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { MessagePattern } from '@nestjs/microservices';
import { PatientDto } from 'apps/patients/src/dtos/patients.dto';

@Controller()
export class PatientsController {
  constructor(private readonly patientsService: PatientsService) {}

  @MessagePattern("patients.findAll")
  findAll() {
    return this.patientsService.findAll();
  }
}
