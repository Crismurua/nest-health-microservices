import { Module } from '@nestjs/common';
import { PatientsService } from './patients.service';
import { PatientsController } from './patients.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [ClientsModule.register([
    {
      name: 'PATIENTS_SERVICE',
      transport: Transport.TCP,
      options: {
        port: 4001,
      },
    },
  ])],
  providers: [PatientsService],
  controllers: [PatientsController]
})
export class PatientsModule {}
