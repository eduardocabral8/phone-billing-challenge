# Sistema de Facturación Telefónica

Este es un sistema de facturación de llamadas telefónicas desarrollado en TypeScript aplicando programación orientada a objetos.

## Cómo ejecutar

Para correr este proyecto en tu computadora, vas a necesitar tener instalado Node.js y un gestor de paquetes como pnpm o npm

1. Abrí una terminal en la carpeta del proyecto e instalá las dependencias:

   pnpm install o npm install

2. Ejecutá el archivo principal usando tsx:

   npx tsx src/main.ts

Esto va a imprimir en la consola una simulación de la factura mensual:
<img width="1917" height="581" alt="imagen" src="https://github.com/user-attachments/assets/2f822afa-d7ae-4a08-9272-cb522989e6b2" />

## Estructura del proyecto

El código está organizado separando las entidades de dominio, la configuración de tarifas y los servicios:

- `src/main.ts`: Es el punto de entrada de la aplicación. Acá escribí los datos simulados en memoria y ejecuto el proceso de facturación para imprimir el resultado.
- `src/models/call.ts`: Es la clase abstracta base que contiene las propiedades comunes (id, fecha de inicio y fin) y la lógica compartida.
- `src/models/local-call.ts`: Extiende de Call. Calcula su costo teniendo en cuenta si es día hábil o fin de semana y separando los minutos que caen en horario pico de los que caen fuera de horario.
- `src/models/national-call.ts`: Extiende de Call. Calcula el costo multiplicando la duración de la llamada por la tarifa específica de la localidad destino.
- `src/models/international-call.ts`: Extiende de Call. Calcula el costo multiplicando la duración de la llamada por la tarifa del país destino.
- `src/models/user.ts`: Representa al cliente. Contiene su información básica y la lista del historial de llamadas que realizó.
- `src/rates/pricing.ts`: Agrupa las clases LocalPricing, NationalPricing e InternationalPricing. Funcionan como configuraciones donde se definen los costos por franja horaria, localidad y país.
- `src/services/billing.ts`: La clase Billing es el servicio que orquesta la facturación. Se encarga de filtrar las llamadas del último mes, sumar los costos por categoría y sumar el costo del abono básico.

## Asunciones tomadas

Al desarrollar esta solución, tomé las siguientes consideraciones:

- El día en el que inicia la llamada es el que determina si se cobra como día hábil o fin de semana para toda su duración.
- Para las llamadas locales en días hábiles que cruzan las franjas horarias (por ejemplo, empiezan en horario pico y terminan fuera de hora), calculo proporcionalmente los minutos que caen en cada franja usando Math.min y Math.max.
- No contemplé el caso de llamadas que cruzan la medianoche entre días distintos. Se asume que las llamadas empiezan y terminan dentro de un mismo día calendario.
- El precio por minuto de las llamadas nacionales e internacionales es fijo y aplica uniformemente a toda la duración de la llamada, sin importar la hora o el día.
- La facturación cubre el último mes calendario midiendo hacia atrás desde la fecha exacta de ejecución del código.
- Todos los datos que procesa el sistema se simulan en memoria dentro de main.ts.
