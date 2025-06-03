import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { UpdateAppointmentDto } from './dto/update-appointment.dto';

@Controller()
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @MessagePattern('appointments.create')
  create(@Payload() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @MessagePattern('appointments.findAll')
  findAll() {
    return this.appointmentsService.findAll();
  }

  @MessagePattern('appointments.findOne')
  findOne(@Payload() id: number) {
    return this.appointmentsService.findOne(id);
  }

  @MessagePattern('appointments.update')
  update(@Payload() updateAppointmentDto: UpdateAppointmentDto) {
    return this.appointmentsService.update(updateAppointmentDto.id, updateAppointmentDto);
  }

  @MessagePattern('appointments.remove')
  remove(@Payload() id: number) {
    return this.appointmentsService.remove(id);
  }
}
