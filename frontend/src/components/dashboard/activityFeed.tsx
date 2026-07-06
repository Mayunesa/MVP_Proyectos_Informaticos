//src/components/dashboard/activityFeed.tsx

import type { FC } from 'react';
import { activityFeedStyles } from '../../styles/components/activityFeed_styles';
import type { ActividadReciente } from '../../types/dashboard.types';

interface ActivityFeedProps {
  items: ActividadReciente[];
}

const ActivityFeed: FC<ActivityFeedProps> = ({ items }) => {
  return (
    <div style={activityFeedStyles.card}>
      <h3 style={activityFeedStyles.title}>Actividad Reciente</h3>
      <ul style={activityFeedStyles.list}>
        {items.map((item) => (
          <li key={item.id} style={activityFeedStyles.item}>
            <span style={activityFeedStyles.dot} />
            <div style={activityFeedStyles.textGroup}>
              <span style={activityFeedStyles.description}>{item.descripcion}</span>
              <span style={activityFeedStyles.time}>{item.tiempoTranscurrido}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActivityFeed;