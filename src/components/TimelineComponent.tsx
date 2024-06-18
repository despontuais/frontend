// components/TimelineComponent.tsx
"use client"
import { usePathname, useRouter } from '@/navigation';
import React, { useEffect, useState} from 'react';

interface ITimeline {
  id: number;
  title: string;
  description: string;
}

type TimelineComponentProps = {
  timeline: any;
};

const TimelineComponent = () => {
  const PATHNAME = usePathname()
  const router = useRouter();
  const [timelines, setTimelines] = useState<ITimeline[]>([]);
  useEffect(() => {
    (async () => {
      try {
      console.log(PATHNAME)
          
        

        
      } catch (err) {
        console.error('Falha ao buscar informações do usuário', err);
      }
    })();
  }, []);

  if (!timelines) {
    return <p>No timeline data available.</p>;
  }

  return (
    <div>
      <h1>{timelines.title || 'No Title'}</h1>
      <p>{timelines.description || 'No Description'}</p>
      {/* add outros dados da tl */}
    </div>
  );
};

export default TimelineComponent;
