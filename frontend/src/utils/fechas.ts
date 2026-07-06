//src/utils/fechas.ts

// export function diasHastaEvento(fechaISO: string): number {
//   const hoy = new Date();
//   const fecha = new Date(fechaISO);
//   const msPorDia = 1000 * 60 * 60 * 24;
//   return Math.ceil((fecha.getTime() - hoy.getTime()) / msPorDia);
// }

export function diasHastaEvento(fechaISO: string): number {
  const [anio, mes, dia] = fechaISO.split('-').map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  return Math.round((fecha.getTime() - hoy.getTime()) / (1000 * 60 * 60 * 24));
}