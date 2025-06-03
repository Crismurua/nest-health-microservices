# Documentación de Arquitectura - Sistema de Gestión Médica

## Descripción General

Este proyecto implementa un sistema de gestión médica basado en una **arquitectura de microservicios** utilizando **NestJS**. El sistema está diseñado para manejar pacientes y citas médicas de manera distribuida, proporcionando escalabilidad y separación de responsabilidades.

## Composición de la Aplicación

### Estructura del Proyecto

```
nest-tranporter-api/
├── apps/
│   ├── api-gateway/          # Gateway principal (Puerto 3000)
│   ├── patients/             # Microservicio de Pacientes (Puerto 4001)
│   └── appointments/         # Microservicio de Citas (Puerto 4002)
├── package.json
├── nest-cli.json
└── tsconfig.json
```

### Tecnologías Utilizadas

- **Framework**: NestJS 11.x
- **Lenguaje**: TypeScript
- **Comunicación**: TCP Transport (@nestjs/microservices)
- **Arquitectura**: Monorepo con múltiples aplicaciones
- **Gestión de Dependencias**: npm

## Microservicios

### 1. API Gateway (`apps/api-gateway`)

**Propósito**: Punto de entrada único para todas las peticiones HTTP externas.

**Configuración**:
- **Puerto**: 3000
- **Tipo**: Aplicación HTTP tradicional
- **Protocolo**: HTTP/REST

**Responsabilidades**:
- Recibir peticiones HTTP de clientes externos
- Enrutar peticiones a los microservicios correspondientes
- Actuar como proxy entre el cliente y los microservicios internos

**Endpoints Expuestos**:
- `/patients` - Conectarse con el microservicio de pacientes
- `/appointments` - Conectarse con el microservicio de citas

**Comunicación con Microservicios**:
```typescript
// Configuración del cliente TCP para Patients
{
  name: 'PATIENTS_SERVICE',
  transport: Transport.TCP,
  options: { port: 4001 }
}
```

### 2. Microservicio de Pacientes (`apps/patients`)

**Propósito**: Gestión completa de información de pacientes.

**Configuración**:
- **Puerto**: 4001
- **Tipo**: Microservicio TCP
- **Protocolo**: TCP

**Modelo de Datos**:
```typescript
class PatientDto {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
}
```

**Patrones de Mensaje**:
- `patients.findAll` - Obtener todos los pacientes

**Datos de Ejemplo**:
- John Doe (john.doe@example.com)
- Jane Smith (jane.smith@example.com)
- Jim Beam (jim.beam@example.com)

### 3. Microservicio de Citas (`apps/appointments`)

**Propósito**: Gestión de citas médicas y programación.

**Configuración**:
- **Puerto**: 4002
- **Tipo**: Microservicio TCP
- **Protocolo**: TCP

**Modelo de Datos**:
```typescript
class AppointmentDto {
  id: number;
  patientId: number;
  doctorId: number;
  date: Date;
}
```

**Patrones de Mensaje**:
- `appointments.create` - Crear nueva cita
- `appointments.findAll` - Obtener todas las citas
- `appointments.findOne` - Obtener cita específica
- `appointments.update` - Actualizar cita
- `appointments.remove` - Eliminar cita

## Flujo de Comunicación

### Arquitectura de Comunicación

```
Cliente HTTP → API Gateway (HTTP) → Microservicios (TCP)
```

### Ejemplo de Flujo - Consulta de Pacientes

1. **Cliente** realiza petición: `GET http://localhost:3000/patients`
2. **API Gateway** recibe la petición HTTP
3. **Gateway** envía mensaje TCP: `patients.findAll` al puerto 4001
4. **Microservicio Patients** procesa la petición
5. **Patients** retorna datos via TCP al Gateway
6. **Gateway** convierte respuesta TCP a HTTP y la envía al cliente

### Diagrama de Arquitectura

```
┌─────────────────┐    HTTP     ┌─────────────────┐
│                 │ ◄────────── │                 │
│   Cliente Web   │             │   API Gateway   │
│                 │ ──────────► │   (Puerto 3000) │
└─────────────────┘             └─────────────────┘
                                         │
                                    TCP  │
                                         ▼
                    ┌─────────────────────────────────────┐
                    │                                     │
                    ▼                                     ▼
        ┌─────────────────┐                   ┌─────────────────┐
        │   Patients MS   │                   │ Appointments MS │
        │  (Puerto 4001)  │                   │  (Puerto 4002)  │
        └─────────────────┘                   └─────────────────┘
```

## Reflexión sobre la Arquitectura

### Fortalezas de la Implementación

#### ✅ **Separación de Responsabilidades**
- Cada microservicio tiene una responsabilidad específica y bien definida
- El Gateway actúa como un punto de entrada unificado
- Separación clara entre lógica de presentación (Gateway) y lógica de negocio (Microservicios)

#### ✅ **Escalabilidad Horizontal**
- Cada microservicio puede escalarse independientemente
- Posibilidad de ejecutar múltiples instancias de cada servicio
- Distribución de carga por servicio según demanda

#### ✅ **Tecnología Consistente**
- Uso de NestJS en toda la aplicación garantiza consistencia
- TypeScript proporciona tipado fuerte y mejor mantenibilidad
- Patrones de diseño consistentes (DTOs, Controladores, Servicios)

#### ✅ **Comunicación Eficiente**
- TCP transport es más eficiente que HTTP para comunicación interna
- Message patterns proporcionan un contrato claro entre servicios


## Conclusión

La arquitectura implementada representa una **base sólida** para un sistema de microservicios. La separación de responsabilidades y el uso de tecnologías modernas como NestJS proporcionan una fundación escalable y mantenible.

Sin embargo, para un entorno de producción, será necesario abordar las áreas de mejora identificadas, especialmente en términos de **persistencia de datos**, **manejo de errores** y **observabilidad**.

La arquitectura actual es **ideal para desarrollo y prototipado**, pero requiere evolución para ser **production-ready**.

---