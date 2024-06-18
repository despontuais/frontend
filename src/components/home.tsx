"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/navbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar } from "@nextui-org/avatar";
import axios from 'axios';
import { useRouter } from '@/navigation';
import Image from 'next/image';
import Modal from './Modal';
import CreateTimelineForm from './CreateTimeLineForm';
import cronologo from "@/app/assets/icon.png";

export const HomePage = () => {
  const router = useRouter();

  interface IUser {
    id: number;
    email: string;
    username: string;
  }

  interface ITimeline {
    id: number;
    title: string;
    description: string;
  }

  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const [timelines, setTimelines] = useState<ITimeline[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/auth/me', {
          withCredentials: true,
        });
        if (res.data) {
          console.log(res.data);
          setUserInfo(res.data);
        }
      } catch (err) {
        console.error('Falha ao buscar informações do usuário', err);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/timeline/', {
          withCredentials: true,
        });
        if (res.data.timelines) {
          setTimelines(res.data.timelines);
          console.log(res.data.timelines);
        }
      } catch (err) {
        console.error('Erro ao buscar timelines', err);
      }
    })();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/logout', {}, {
        withCredentials: true,
      });
      router.push('/signIn');
    } catch (err) {
      console.error('Erro ao fazer logout', err);
    }
  };

  const handleLogin = () => {
    router.push('/signIn');
  };

  const handleCreateTimeline = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showUserInfo = () => {
    console.log("Mostrar informações do usuário");
  };

  const handleSearchTermChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredTimelines = timelines.filter((timeline) =>
    timeline.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div id="Background" className="bg-[#404040] min-h-screen p-0 ">
      <Navbar maxWidth='full' className="mb-[20px]">
        <NavbarBrand>
          <Image src={cronologo} width={100} height={20} alt="Cronolog Logo" />
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4">
          {userInfo && (<Button onClick={handleCreateTimeline}>Criar Timeline</Button>)}
        </NavbarContent>

        <NavbarContent justify='end'>
          <NavbarItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar
                  showFallback
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name=""
                  size="md"
                  src=""
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem onClick={userInfo == null ? handleLogin : showUserInfo}>
                  <p className="font-semibold">{userInfo ? `Signed in as ${userInfo.username}` : "Sign In"}</p>
                </DropdownMenuItem>
                <DropdownMenuGroup>
                  {userInfo &&
                    <>
                      <DropdownMenuItem>
                        <span>Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <span>Settings</span>
                      </DropdownMenuItem>
                    </>
                  }
                </DropdownMenuGroup>
                {userInfo &&
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </>
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <Tabs defaultValue="popular" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="popular">POPULARES</TabsTrigger>
          <TabsTrigger value="search">PESQUISA</TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <div id="Content" className="flex flex-wrap flex-row gap-[20px]">
            {filteredTimelines.map((timeline) => (
              <Card className="flex justify-between flex-col flex-grow-[1] flex-shrink-[1] basis-[calc(25%-20px)] p-[20px]" key={timeline.id}>
                <CardHeader>
                  <CardTitle>{timeline.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{timeline.description}</p>
                </CardContent>
                <Button>Acessar</Button>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="search">
          <div id="Content" className="flex flex-col gap-4 p-4">
            <input
              type="text"
              placeholder="Buscar timelines..."
              value={searchTerm}
              onChange={handleSearchTermChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            {filteredTimelines.length === 0 ? (
              <p>Nenhuma timeline encontrada com o termo "{searchTerm}".</p>
            ) : (
              filteredTimelines.map((timeline) => (
                <Card key={timeline.id}>
                  <CardHeader>
                    <CardTitle>{timeline.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{timeline.description}</p>
                  </CardContent>
                  <Button>Acessar</Button>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateTimelineForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default HomePage;
