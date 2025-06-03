import { Inject, Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class AppointmentsService {
  constructor(@Inject('APPOINTMENTS_SERVICE') private appointmentsClient: ClientProxy) {}

  create(createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsClient.send('appointments.create', createAppointmentDto);
  }

  findAll() {
    return this.appointmentsClient.send('appointments.findAll', {});
  }

  findOne(id: string) {
    return this.appointmentsClient.send('appointments.findOne', { id });
  }

  update(id: string, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsClient.send('appointments.update', { id, ...updateAppointmentDto });
  }

  remove(id: string) {
    return this.appointmentsClient.send('appointments.remove', { id });
  }

}
