import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation'; // Importa o hook useParams corretamente
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ITimeline {
  id: number;
  title: string;
  description: string;
}

const TimelineDetailPage: React.FC = () => {
  const params = useParams<{ id: string }>(); // Use useParams para obter o id
  const id = params?.id;
  const [timeline, setTimeline] = useState<ITimeline | null>(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const res = await axios.get(`http://localhost:4001/api/timeline/${id}`, {
            withCredentials: true,
          });
          if (res.data) {
            setTimeline(res.data);
          }
        } catch (err) {
          console.error('Erro ao buscar detalhes da timeline', err);
        }
      })();
    }
  }, [id]);

  if (!timeline) {
    return <p>Carregando...</p>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{timeline.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{timeline.description}</p>
      </CardContent>
    </Card>
  );
};

export default TimelineDetailPage;
