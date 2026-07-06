function nearest15th(date: Date): Date {
  const y = date.getFullYear()
  const m = date.getMonth()
  const candidates = [
    new Date(y, m - 1, 15),
    new Date(y, m, 15),
    new Date(y, m + 1, 15),
  ]
  return candidates.reduce((closest, c) =>
    Math.abs(c.getTime() - date.getTime()) < Math.abs(closest.getTime() - date.getTime())
      ? c
      : closest
  )
}

interface PenalidadParams {
  fechaReservacion: Date
  fechaEvento: Date
  fechaCancelacion: Date
  presupuestoTotal: number
}

export interface PenalidadResult {
  total: number
  porcentajeAplicado: number
  hitos: {
    etapa: string
    porcentajeAcumulado: number
    fechaLimite: Date
  }[]
}

export function calcularPenalidad(params: PenalidadParams): PenalidadResult {
  const { fechaReservacion, fechaEvento, fechaCancelacion, presupuestoTotal } = params

  const duracionTotal = fechaEvento.getTime() - fechaReservacion.getTime()

  const fechaHito25 = new Date(fechaReservacion.getTime() + duracionTotal * 0.25)
  const fechaHito50 = new Date(fechaReservacion.getTime() + duracionTotal * 0.5)

  const pago25 = nearest15th(fechaHito25)
  const pago50 = nearest15th(fechaHito50)

  let porcentajeAplicado: number
  if (fechaCancelacion >= pago50) {
    porcentajeAplicado = 1
  } else if (fechaCancelacion >= pago25) {
    porcentajeAplicado = 0.75
  } else {
    porcentajeAplicado = 0.5
  }

  return {
    total: Math.round(presupuestoTotal * porcentajeAplicado * 100) / 100,
    porcentajeAplicado,
    hitos: [
      { etapa: 'Reservación (50%)', porcentajeAcumulado: 0.5, fechaLimite: fechaReservacion },
      { etapa: '25% del tiempo (75%)', porcentajeAcumulado: 0.75, fechaLimite: pago25 },
      { etapa: '50% del tiempo (100%)', porcentajeAcumulado: 1, fechaLimite: pago50 },
    ],
  }
}
