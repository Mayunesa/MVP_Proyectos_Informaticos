//src/components/dashboard/estadoEventosChart.tsx

import type { FC } from 'react';
import { estadoEventosChartStyles } from '../../styles/components/estadoEventosChart_styles';

interface BarDatum {
  estado: string;
  cantidad: number;
  etiqueta: string;
  color: string;
}

interface EstadoEventosChartProps {
  datos: BarDatum[];
}

const EstadoEventosChart: FC<EstadoEventosChartProps> = ({ datos }) => {
  const maximo = Math.max(...datos.map((d) => d.cantidad), 1);

  return (
    <div style={estadoEventosChartStyles.card}>
      <h3 style={estadoEventosChartStyles.title}>Eventos por Estado</h3>
      <div style={estadoEventosChartStyles.chartArea}>
        {datos.map((d) => (
          <div key={d.estado} style={estadoEventosChartStyles.barGroup}>
            <span style={estadoEventosChartStyles.barValue}>{d.cantidad}</span>
            <div
              style={{
                ...estadoEventosChartStyles.bar,
                height: `${(d.cantidad / maximo) * 100}%`,
                backgroundColor: d.color,
              }}
            />
            {/* <span style={estadoEventosChartStyles.barLabel}>{d.estado}</span> */}
            <span style={estadoEventosChartStyles.barLabel}>{d.etiqueta}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EstadoEventosChart;