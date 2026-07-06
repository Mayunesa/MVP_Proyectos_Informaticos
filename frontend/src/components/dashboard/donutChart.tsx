//src/components/dashboard/donutChart.tsx

import type { FC } from 'react';
import { donutChartStyles } from '../../styles/components/donutChart_styles';
import type { DonutSegment } from '../../types/dashboard.types';

interface DonutChartProps {
  segmentos: DonutSegment[];
}

const DonutChart: FC<DonutChartProps> = ({ segmentos }) => {
  const total = segmentos.reduce((suma, s) => suma + s.value, 0) || 1;
  let acumulado = 0;
  const gradiente = segmentos
    .map((s) => {
      const inicio = (acumulado / total) * 360;
      acumulado += s.value;
      const fin = (acumulado / total) * 360;
      return `${s.color} ${inicio}deg ${fin}deg`;
    })
    .join(', ');

  return (
    <div style={donutChartStyles.wrapper}>
      <div style={{ ...donutChartStyles.ring, background: `conic-gradient(${gradiente})` }}>
        <div style={donutChartStyles.hole}>
          <span style={donutChartStyles.total}>{total}</span>
        </div>
      </div>
    </div>
  );
};

export default DonutChart;