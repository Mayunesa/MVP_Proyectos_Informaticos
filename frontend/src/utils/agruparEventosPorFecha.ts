//src/utils/agruparEventosPorFecha.ts

import type { EventoCalendario } from '../types/calendario.types';

export function agruparEventosPorFecha(eventos: EventoCalendario[]): Map<string, EventoCalendario[]> {
  const mapa = new Map<string, EventoCalendario[]>();
  eventos.forEach((evento) => {
    const lista = mapa.get(evento.fechaEvento) ?? [];
    lista.push(evento);
    mapa.set(evento.fechaEvento, lista);
  });
  mapa.forEach((lista) => lista.sort((a, b) => a.horaEvento.localeCompare(b.horaEvento)));
  return mapa;
}