import type { FC } from 'react';
import { kpiCardStyles } from '../../styles/components/kpiCard_styles';

interface KpiCardProps {
  label: string;
  value: string;
  helperText?: string;
}

const KpiCard: FC<KpiCardProps> = ({ label, value, helperText }) => {
  return (
    <div style={kpiCardStyles.card}>
      <span style={kpiCardStyles.label}>{label}</span>
      <span style={kpiCardStyles.value}>{value}</span>
      {helperText && <span style={kpiCardStyles.helper}>{helperText}</span>}
    </div>
  );
};

export default KpiCard;