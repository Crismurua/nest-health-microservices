import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreatePatientDto, UpdatePatientDto } from './dtos/patients.dto';

@Injectable()
export class PatientsService {
    constructor(
        @Inject('PATIENTS_SERVICE') private readonly client: ClientProxy,
    ) {}

    findAll() {
        return this.client.send('patients.findAll', {});
    }

    findOne(id: string) {
        return this.client.send('patients.findOne', { id });
    }

    create(createPatientDto: CreatePatientDto) {
        return this.client.send('patients.create', createPatientDto);
    }

    update(id: string, updatePatientDto: UpdatePatientDto) {
        return this.client.send('patients.update', { id, ...updatePatientDto });
    }

    remove(id: string) {
        return this.client.send('patients.remove', { id });
    }
}
