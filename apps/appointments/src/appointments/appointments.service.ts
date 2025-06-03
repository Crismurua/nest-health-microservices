import { Injectable } from '@nestjs/common';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';
import { AppointmentDto } from './dto/appointment.dto';

@Injectable()
export class AppointmentsService {
  private appointments: AppointmentDto[] = [
    {
      id: 1,
      patientId: 1,
      doctorId: 1,
      date: new Date('2021-01-01'),
    },
    {
      id: 2,
      patientId: 2,
      doctorId: 2,
      date: new Date('2021-01-02'),
    },
    {
      id: 3,
      patientId: 3,
      doctorId: 3,
      date: new Date('2021-01-03'),
    },
  ];
  create(createAppointmentDto: CreateAppointmentDto) {
    const appointment = {
      id: this.appointments.length + 1,
      ...createAppointmentDto,
    };
    this.appointments.push(appointment);
    return appointment;
  }

  findAll() {
    return this.appointments;
  }

  findOne(id: number) {
    return this.appointments.find((appointment) => appointment.id === id);
  }

  update(id: number, updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointments.find((appointment) => appointment.id === id);
  }

  remove(id: number) {
    return this.appointments.find((appointment) => appointment.id === id);
  }
}
