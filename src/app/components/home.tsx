// src/app/home.tsx
"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import axios from 'axios';
import Image from 'next/image';
import IPage from '@/IPage';
import { useRouter } from '@/navigation';  // alterado aqui
import cronologo from "@/app/assets/icon.png";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, RadioGroup, Radio } from "@nextui-org/react";
import ModalT from '@/components/Modal';
import CreateTimeLineForm from '@/components/CreateTimeLineForm';
import 'moment/locale/es'
import { ModeToggle } from '@/app/components/mode-switcher';
import {
  LogOut,
  Settings,
  User
} from "lucide-react"
import { useFormatter, useTranslations } from 'next-intl';
import { LanguageToggle } from './language-switcher';

export const HomePage = ({ params: { locale } }: IPage) => {
  //unstable_setRequestLocale(locale)
  const router = useRouter();
  const formatter = useFormatter();
  const t = useTranslations();

  interface IUser {
    id: number;
    email: string;
    username: string;
    birthDate: string;
  }

  interface ITimeline {
    id: number;
    title: string;
    description: string;
  }

  const [userInfo, setUserInfo] = useState<IUser | null>(null);
  const modalProfile = useDisclosure();
  // const modalSettings = useDisclosure();
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

<<<<<<< Updated upstream
=======
  const handleAccessTimeline = (id: number) => {
    console.log('Acessando timeline com id:', id);
    router.push(`/timeline/${id}`);
  };
>>>>>>> Stashed changes

  return (
    <div id="Background" className="bg-[#404040] min-h-screen p-0 ">
      <Navbar maxWidth='full' className="mb-[20px]">
        <NavbarBrand>
          <Image src={cronologo} width={100} height={20} alt="Cronolog Logo" />
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4">
          {userInfo && (<Button onClick={handleCreateTimeline}>{t("Home.createTimeline")}</Button>)}
        </NavbarContent>

        <NavbarContent justify='end'>
          <NavbarItem>
            <LanguageToggle></LanguageToggle>
          </NavbarItem>
          <NavbarItem>
            <ModeToggle></ModeToggle>
          </NavbarItem>
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
                  <p className="font-semibold">{userInfo ? `${t("Home.signedAs")} ${userInfo.username}` : t("Home.SignIn")}</p>
                </DropdownMenuItem>
                <DropdownMenuGroup>
                  {userInfo &&
                    <>
                      <DropdownMenuItem onClick={modalProfile.onOpen}>
                        <User className="mr-2 h-4 w-4" />
                        <span>{t("Home.profile")}</span>

                      </DropdownMenuItem>
                      <DropdownMenuItem >
                        <Settings className="mr-2 h-4 w-4" />
                        <span>{t("Home.settings")}</span>
                      </DropdownMenuItem>
                    </>
                  }
                </DropdownMenuGroup>
                {userInfo &&
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>{t("Home.logout")}</span>
                    </DropdownMenuItem>
                  </>
                }
              </DropdownMenuContent>
            </DropdownMenu>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <Modal
        size='xs'
        isOpen={modalProfile.isOpen}
        placement={'center'}
        onOpenChange={modalProfile.onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">{t("Home.userInfo")}</ModalHeader>
              <ModalBody>
                <p>
                  {t("Form.usernameLabel")}: {userInfo?.username}
                </p>
                <p>
                  {t("Form.emailLabel")}: {userInfo?.email}
                </p>
                <p>
                  {t("Form.dateLabel")}: {formatter.dateTime(new Date(userInfo?.birthDate as string), 'short')}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button variant="destructive" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      { /*     <Modal
        size='xs'
        isOpen={modalSettings.isOpen}
        placement={'center'}
        onOpenChange={modalSettings.onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">{"Configurações do Usuário"}</ModalHeader>
              <ModalBody>
                <span className='font-bold'>Theme: </span><ModeToggle />
                <span className='font-bold'>Language: </span><LanguageToggle />

              </ModalBody>
              <ModalFooter>
                <Button variant="destructive" onClick={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>*/}



      <Tabs defaultValue="popular" className="">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="popular">{t("Home.popular")}</TabsTrigger>
          <TabsTrigger value="search">{t("Home.search")}</TabsTrigger>
        </TabsList>
        <TabsContent value="popular">
          <div id="Content" className="flex flex-wrap flex-row gap-[20px]">
            {filteredTimelines.map((timeline, index) => (
              <Card className="flex justify-between flex-col flex-grow-[1] flex-shrink-[1] basis-[calc(25%-20px)] p-[20px]" key={index}>
                <CardHeader>
                  <CardTitle>{timeline.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{timeline.description}</p>
                </CardContent>
<<<<<<< Updated upstream
                <Button>{t("Home.access")}</Button>
=======
                <Button onClick={() => handleAccessTimeline(timeline.id)}>Acessar</Button>
>>>>>>> Stashed changes
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="search">
          <div id="Content" className="flex flex-col gap-4 p-4">
            <input
              type="text"
              placeholder={t("Home.searchPlaceholder")}
              value={searchTerm}
              onChange={handleSearchTermChange}
              className="p-2 border border-gray-300 rounded-md w-full"
            />
            {filteredTimelines.length === 0 ? (
              <p>{t("Home.noTimeline")} {`"${searchTerm}"`}.</p>
            ) : (
              filteredTimelines.map((timeline, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle>{timeline.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{timeline.description}</p>
                  </CardContent>
<<<<<<< Updated upstream
                  <Button>{t("Home.access")}</Button>
=======
                  <Button onClick={() => handleAccessTimeline(timeline.id)}>Acessar</Button>
>>>>>>> Stashed changes
                </Card>
              ))
            )}
          </div>
        </TabsContent>
      </Tabs>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <CreateTimeLineForm onClose={closeModal} />
      </Modal>
    </div>
  );
};

export default HomePage;
