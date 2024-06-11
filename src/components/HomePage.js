import React, { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';
import cronologo from '../../public/CronoLogo.png';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { styled } from '@mui/system'; // Importação do sistema de estilo


const Background = styled('div')({
  backgroundColor: '#404040',
  minHeight: '100vh',
  padding: '20px',
});

const AppBarStyled = styled(AppBar)({
  backgroundColor: '#2A2A2A',
  marginBottom: '20px',
});

const TabsStyled = styled(Tabs)({
  marginBottom: '20px',
  backgroundColor: '#2A2A2A',
  color: '#fff',
});

const TabStyled = styled(Tab)({
  minWidth: '50%',
  color: '#fff',
});

const Content = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '20px',
  fontFamily: 'Roboto, sans-serif',
});

const Card = styled('div')({
  backgroundColor: '#2A2A2A',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  flex: '1 1 calc(25% - 20px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  color: '#fff',
  fontFamily: 'Roboto, sans-serif',
});

const Popup = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.1)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontFamily: 'Roboto, sans-serif',
});

const PopupContent = styled('div')({
  backgroundColor: '#2A2A2A',
  padding: '50px',
  borderRadius: '8px',
  width: '300px',
  position: 'relative',
  color: '#fff',
});

const CloseBtn = styled('span')({
  position: 'absolute',
  top: '10px',
  right: '10px',
  cursor: 'pointer',
  backgroundColor: 'transparent',
  border: 'none',
  color: '#red',
  fontSize: '18px',
});

const HomePage = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axios.get('http://localhost:3000/api/user', {
          withCredentials: true,
        });
        if (res.data.user) {
          setUserInfo(res.data.user);
        }
      } catch (err) {
        console.error('Falha ao buscar informações do usuário', err);
      }
    };

    fetchUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      sessionStorage.removeItem('authToken');
      await axios.post('http://localhost:3000/api/logout', {}, { withCredentials: true });
      router.push('/login');
    } catch (err) {
      console.error('Erro ao fazer logout', err);
    }
  };

  const togglePopup = () => {
    setIsPopupOpen(!isPopupOpen);
  };

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  if (!userInfo) {
    return <div>Loading...</div>;
  }

  return (
    <Background>
      <AppBarStyled position="static">
        <Toolbar>
          <Image src={cronologo} alt="Cronolog Logo" className={styles.logo} />
          <div className={styles.userInfo}>
            <Avatar alt="User Image" src="https://avatars.dicebear.com/api/human/default.svg" className={styles.userImage} />
            <div className={styles.userMenu}>
              <Button sx={{ borderColor: 'green', color: 'green' }} variant="outlined" onClick={togglePopup}>Perfil</Button><br /><br />
              <Button sx={{ borderColor: 'green', color: 'green' }} variant="outlined">Configurações</Button><br /><br />
              <Button sx={{ borderColor: 'green', color: 'green' }} variant="outlined" onClick={handleLogout}>Logout</Button>
            </div>
          </div>
        </Toolbar>
      </AppBarStyled>

      <TabsStyled value={selectedTab} onChange={handleTabChange}>
        <TabStyled label="Populares" />
        <TabStyled label="Pesquisa" />
      </TabsStyled>

      <Content>
        {["Star Wars", "Zelda", "Doctor WHO", "Digimon", "Teste", "Buti é gay"].map((item, index) => (
          <Card key={index}>
            <div>
              <h3>{item}</h3>
              <p>Aqui você pode criar ou visualizar as timelines feitas por outros usuários do site sobre o universo de {item}</p>
            </div>
            <Button sx={{ backgroundColor: 'green', color: '#fff' }} variant="contained">Acessar</Button>
          </Card>
        ))}
      </Content>

      {isPopupOpen && (
        <Popup>
          <PopupContent>
            <CloseBtn onClick={togglePopup}>&times;</CloseBtn>
            <h2>Informações do Usuário</h2>
            <p>Nome: {userInfo.username}</p>
            <p>Email: {userInfo.email}</p>
            <p>Data de Nascimento: {new Date(userInfo.birthDate).toLocaleDateString()}</p>
          </PopupContent>
        </Popup>
      )}
    </Background>
  );
};

export default HomePage;
