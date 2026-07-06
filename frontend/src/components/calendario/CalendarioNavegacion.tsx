//src/components/calendario/CalendarioNavegacion.tsx

import type { FC } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { calendarioNavegacionStyles } from '../../styles/components/calendario/calendarioNavegacion_styles';
import { NOMBRES_MESES } from '../../utils/calendario';

interface CalendarioNavegacionProps {
  anio: number;
  mes: number;
  onMesAnterior: () => void;
  onMesSiguiente: () => void;
}

const CalendarioNavegacion: FC<CalendarioNavegacionProps> = ({ anio, mes, onMesAnterior, onMesSiguiente }) => (
  <div style={calendarioNavegacionStyles.container}>
    <button type="button" style={calendarioNavegacionStyles.boton} onClick={onMesAnterior} aria-label="Mes anterior">
      <ChevronLeft size={20} />
    </button>
    <h2 style={calendarioNavegacionStyles.titulo}>{NOMBRES_MESES[mes]} {anio}</h2>
    <button type="button" style={calendarioNavegacionStyles.boton} onClick={onMesSiguiente} aria-label="Mes siguiente">
      <ChevronRight size={20} />
    </button>
  </div>
);

export default CalendarioNavegacion;