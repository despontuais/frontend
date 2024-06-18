// src/components/CreateTimelineForm.tsx
import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from './ui/input';
import axios from 'axios';
import { useRouter } from '@/navigation'; // Import correto para o useRouter

const CreateTimelineForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/media/createMedia', {
        title,
        description
      }, {
        withCredentials: true
      });
      onClose();
      router.push('/'); 
    } catch (error) {
      console.error('Erro ao criar mídia', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Criar Nova Mídia</h2>
      <Input 
        placeholder="Título da Mídia" 
        value={title} 
        onChange={(e) => setTitle(e.target.value)} 
        className="w-full"
      />
      <Input 
        placeholder="Descrição ou Detalhes" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        className="w-full"
      />
      <Button type="submit">Criar</Button>
    </form>
  );
};

export default CreateTimelineForm;
