"use client"
import React, { useEffect, useState } from 'react';
import { Button } from "./ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, NavbarMenu, NavbarMenuItem } from "@nextui-org/navbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarGroup, AvatarIcon } from "@nextui-org/avatar";
import { User } from "@nextui-org/user";
import axios from 'axios';
import { useRouter } from '@/navigation';
import cronologo from "@/app/_assets/CronoLogo.png";
import Image from 'next/image';


export const HomePage = () => {
  const router = useRouter();

  interface IUser {
    id: number
    email: string,
    username: string
  }
  interface ITimeline {
    title : string[]
  }

  let timelines : ITimeline;

  const [userInfo, setUserInfo] = useState<IUser | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:4000/api/auth/me',
          {
            withCredentials: true,
          });
        if (res.data) {
          console.log(res.data)
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
        const res = await axios.get('http://localhost:4000/api/timeline/',
          {
            withCredentials: true,
          });
        if (res.data.timelines) {
            timelines = res.data.timelines;
            console.log(timelines)
        }
      } catch (err) {
        console.error('', err);
      }
    })();
  }, []);
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:4000/api/auth/logout', {
      }, {
        withCredentials: true
      });
      router.push('/signIn');
    } catch (err) {
      console.error('Erro ao fazer logout', err);
    }
  };

  const handleLogin = () => {
    router.push('/signIn')
  }

  const showUserInfo = () => {
    console.log("a")
  }

  return (
    <div id="Background" className="bg-[#404040] min-h-screen p-0 ">
      <Navbar maxWidth='full' className="mb-[20px]">
        <NavbarBrand>
          <Image src={cronologo} width={100} height={20} alt="Cronolog Logo" />
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-4">

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
                <DropdownMenuItem   onClick={userInfo == null ? handleLogin : showUserInfo}>
                  <p
                    className="font-semibold">{userInfo ? `Signed in as ${userInfo.username}` : "Sign In"}
                  </p>
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
                    <DropdownMenuItem  onClick={handleLogout}>
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
            {["Star Wars", "Zelda", "Doctor WHO", "Digimon", "Teste"].map((item, index) => (
              <Card className="flex justify-between flex-col flex-grow-[1] flex-shrink-[1] basis-[calc(25%-20px)] p-[20px]" key={index}>
                <CardHeader>
                  <CardTitle>{item}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>Aqui você pode criar ou visualizar as timelines feitas por outros usuários do site sobre o universo de {item}</p>
                </CardContent>
                <Button>Acessar</Button>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}