import React, { useState } from 'react';
import { Button } from "./ui/button";
import { Input } from './ui/input';
import axios from 'axios';
import { useRouter } from '@/navigation'; // Import correto para o useRouter

const CreateTimelineForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [timelineTitle, setTimelineTitle] = useState('');
  const [timelineDescription, setTimelineDescription] = useState('');
  const [mediaTitle, setMediaTitle] = useState('');
  const [mediaDescription, setMediaDescription] = useState('');
  const [mediaList, setMediaList] = useState<{ id?: number; title: string; description: string }[]>([]);
  const router = useRouter();

  const addMedia = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/media/createMedia', {
        title: mediaTitle,
        description: mediaDescription
      }, {
        withCredentials: true
      });

      const newMedia = response.data;
      setMediaList([...mediaList, newMedia]);
      setMediaTitle('');
      setMediaDescription('');
    } catch (error) {
      console.error('Erro ao criar mídia', error);
    }
  };

  const removeMedia = (index: number) => {
    setMediaList(mediaList.filter((_, i) => i !== index));
  };

  const moveMediaUp = (index: number) => {
    if (index === 0) return;
    const newMediaList = [...mediaList];
    [newMediaList[index], newMediaList[index - 1]] = [newMediaList[index - 1], newMediaList[index]];
    setMediaList(newMediaList);
  };

  const moveMediaDown = (index: number) => {
    if (index === mediaList.length - 1) return;
    const newMediaList = [...mediaList];
    [newMediaList[index], newMediaList[index + 1]] = [newMediaList[index + 1], newMediaList[index]];
    setMediaList(newMediaList);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await axios.post('http://localhost:4000/api/timeline/createTimeline', {
        title: timelineTitle,
        description: timelineDescription,
        media: mediaList.map(media => media.id) // Passando IDs das mídias
      }, {
        withCredentials: true
      });
      onClose();
      router.push('/'); 
    } catch (error) {
      console.error('Erro ao criar timeline', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-100 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Criar Nova Timeline</h2>
      <div className="mb-4">
        <Input 
          placeholder="Título da Timeline" 
          value={timelineTitle} 
          onChange={(e) => setTimelineTitle(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <Input 
          placeholder="Descrição da Timeline" 
          value={timelineDescription} 
          onChange={(e) => setTimelineDescription(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>

      <h2 className="text-2xl font-bold mb-4">Adicionar Novas Mídias</h2>
      <div className="mb-4">
        <Input 
          placeholder="Título da Mídia" 
          value={mediaTitle} 
          onChange={(e) => setMediaTitle(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4">
        <Input 
          placeholder="Descrição ou Detalhes" 
          value={mediaDescription} 
          onChange={(e) => setMediaDescription(e.target.value)} 
          className="w-full p-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-4 text-center">
        <Button type="button" onClick={addMedia} className="bg-green-500 text-white px-4 py-2 rounded-md">Adicionar Mídia</Button>
      </div>

      <ul className="mt-4 space-y-2">
        {mediaList.map((media, index) => (
          <li key={index} className="flex items-center justify-between p-2 border border-gray-300 rounded-md">
            <div>
              <p className="font-bold">{media.title}</p>
              <p className="text-gray-600">{media.description}</p>
            </div>
            <div className="space-x-2">
              <Button type="button" onClick={() => moveMediaUp(index)} className="px-2 py-1">↑</Button>
              <Button type="button" onClick={() => moveMediaDown(index)} className="px-2 py-1">↓</Button>
              <Button type="button" onClick={() => removeMedia(index)} className="bg-red-500 text-white px-2 py-1 rounded-md">Remover</Button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 text-center">
        <Button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">Criar Timeline</Button>
      </div>
    </form>
  );
};

export default CreateTimelineForm;
