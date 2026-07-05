import type { FC, ReactNode } from 'react';
import { sectionCardStyles, toneColors } from '../../styles/components/sectionCard_styles';
import type { Tono } from '../../types/dashboard.types';

export interface SectionCardItem {
  id: string;
  primaryText: string;
  secondaryText: string;
  tono?: Tono;
}

interface SectionCardProps {
  title: string;
  items: SectionCardItem[];
  emptyText?: string;
  headerAction?: ReactNode;
}

const SectionCard: FC<SectionCardProps> = ({ title, items, emptyText = 'Sin registros por ahora', headerAction }) => {
  return (
    <div style={sectionCardStyles.card}>
      <div style={sectionCardStyles.header}>
        <div style={sectionCardStyles.titleGroup}>
          <h3 style={sectionCardStyles.title}>{title}</h3>
          <span style={sectionCardStyles.badge}>{items.length}</span>
        </div>
        {headerAction}
      </div>
      <ul style={sectionCardStyles.list}>
        {items.length === 0 && <li style={sectionCardStyles.empty}>{emptyText}</li>}
        {items.map((item) => (
          <li key={item.id} style={sectionCardStyles.item}>
            <span style={sectionCardStyles.itemPrimary}>{item.primaryText}</span>
            <span style={{ ...sectionCardStyles.itemSecondary, color: toneColors[item.tono ?? 'info'] }}>
              {item.secondaryText}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionCard;