//src/utils/calendario.ts

export interface DiaCalendario {
  fecha: string;
  numeroDia: number;
  perteneceAlMes: boolean;
  esHoy: boolean;
}

const DIAS_EN_GRID = 42; // 6 semanas x 7 días: grid siempre estable, sin saltos de layout

export function generarDiasDelMes(anio: number, mes: number): DiaCalendario[] {
  const hoyISO = new Date().toISOString().slice(0, 10);
  const primerDiaMes = new Date(anio, mes, 1);
  const inicioGrid = new Date(anio, mes, 1 - primerDiaMes.getDay());

  return Array.from({ length: DIAS_EN_GRID }, (_, i) => {
    const fecha = new Date(inicioGrid);
    fecha.setDate(inicioGrid.getDate() + i);
    const fechaISO = fecha.toISOString().slice(0, 10);
    return {
      fecha: fechaISO,
      numeroDia: fecha.getDate(),
      perteneceAlMes: fecha.getMonth() === mes,
      esHoy: fechaISO === hoyISO,
    };
  });
}

export const NOMBRES_MESES = [
  'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
  'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre',
];

export const NOMBRES_DIAS_CORTOS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];