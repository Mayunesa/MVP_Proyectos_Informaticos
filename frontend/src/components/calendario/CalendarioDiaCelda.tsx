//src/components/calendario/CalendarioDiaCelda.tsx

import type { FC } from 'react';
import { calendarioDiaCeldaStyles } from '../../styles/components/calendario/calendarioDiaCelda_styles';
import type { DiaCalendario } from '../../utils/calendario';

interface CalendarioDiaCeldaProps {
  dia: DiaCalendario;
  cantidadEventos: number;
  seleccionado: boolean;
  onSeleccionar: (fecha: string) => void;
}

const CalendarioDiaCelda: FC<CalendarioDiaCeldaProps> = ({ dia, cantidadEventos, seleccionado, onSeleccionar }) => {
  const tieneEventos = cantidadEventos > 0;

  return (
    <button
      type="button"
      style={{
        ...calendarioDiaCeldaStyles.celda,
        ...(!dia.perteneceAlMes ? calendarioDiaCeldaStyles.fueraDeMes : {}),
        ...(dia.esHoy ? calendarioDiaCeldaStyles.hoy : {}),
        ...(seleccionado ? calendarioDiaCeldaStyles.seleccionada : {}),
      }}
      onClick={() => tieneEventos && onSeleccionar(dia.fecha)}
      disabled={!tieneEventos}
    >
      <span style={calendarioDiaCeldaStyles.numero}>{dia.numeroDia}</span>
      {tieneEventos && <span style={calendarioDiaCeldaStyles.indicador}>{cantidadEventos}</span>}
    </button>
  );
};

export default CalendarioDiaCelda;