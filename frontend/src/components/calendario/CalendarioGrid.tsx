//src/components/calendario/CalendarioGrid.tsx

import type { FC } from 'react';
import { calendarioGridStyles } from '../../styles/components/calendario/calendarioGrid_styles';
import { NOMBRES_DIAS_CORTOS } from '../../utils/calendario';
import type { DiaCalendario } from '../../utils/calendario';
import CalendarioDiaCelda from './CalendarioDiaCelda';
import type { EventoCalendario } from '../../types/calendario.types';

interface CalendarioGridProps {
  dias: DiaCalendario[];
  eventosPorFecha: Map<string, EventoCalendario[]>;
  fechaSeleccionada: string | null;
  onSeleccionarFecha: (fecha: string) => void;
}

const CalendarioGrid: FC<CalendarioGridProps> = ({ dias, eventosPorFecha, fechaSeleccionada, onSeleccionarFecha }) => (
  <div style={calendarioGridStyles.wrapper}>
    <div style={calendarioGridStyles.filaEncabezado}>
      {NOMBRES_DIAS_CORTOS.map((nombre) => (
        <span key={nombre} style={calendarioGridStyles.encabezadoDia}>{nombre}</span>
      ))}
    </div>
    <div style={calendarioGridStyles.grid}>
      {dias.map((dia) => (
        <CalendarioDiaCelda
          key={dia.fecha}
          dia={dia}
          cantidadEventos={eventosPorFecha.get(dia.fecha)?.length ?? 0}
          seleccionado={dia.fecha === fechaSeleccionada}
          onSeleccionar={onSeleccionarFecha}
        />
      ))}
    </div>
  </div>
);

export default CalendarioGrid;