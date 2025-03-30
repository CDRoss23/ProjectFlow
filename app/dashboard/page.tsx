"use client";

import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomCard from "../components/Cards/CustomCards";
import CardTop from "../components/Cards/CardTop";
import DataTable from "../components/Tables/TableTask";
import IconBreadcrumbs from "../components/Breadcrumbs/Breadcrumb";
import ZoomControlled from "../components/Charts/Charts1";
import '../resources/style.css';
import {
  Card,
  CardActions,
  CardContent,
  Button,
  Typography,
  ThemeProvider
} from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {
  UploadFileOutlined,
  Add,
  Tune,
  SettingsSuggest,
  KeyboardArrowDown,
  FilterAlt,
  Cached,
  Settings,
  AccessTime,
  Delete
} from '@mui/icons-material';
import {
  AiOutlineProject,
  AiOutlineTeam,
  AiOutlineSetting,
  AiOutlineUser,
  AiOutlineDashboard,
  AiOutlineLogout,
} from "react-icons/ai";

// Constantes para datos estáticos
const MENU_ITEMS = {
  admin: [
    { href: "/dashboard", icon: <AiOutlineDashboard size={24} />, label: "Dashboard" },
    { href: "/admin/gestionar-usuarios", icon: <AiOutlineUser size={24} />, label: "Gestionar Usuarios" },
    { href: "/admin/confi-roles", icon: <AiOutlineTeam size={24} />, label: "Configurar Permisos" },
    { href: "/admin/actividad", icon: <AiOutlineUser size={24} />, label: "Supervisar Actividad" },
    { href: "/admin/mantenimiento", icon: <AiOutlineSetting size={24} />, label: "Mantenimiento" },
  ],
  gerente: [
    { href: "/dashboard", icon: <AiOutlineDashboard size={24} />, label: "Dashboard" },
    { href: "/gerente/gestionar-proyectos", icon: <AiOutlineProject size={24} />, label: "Gestionar Proyectos" },
    { href: "/gerente/proceso", icon: <AiOutlineTeam size={24} />, label: "Supervisar Proyecto" },
    { href: "/gerente/comunicacion", icon: <AiOutlineTeam size={24} />, label: "Comunicación" },
  ],
  miembro: [
    { href: "/dashboard", icon: <AiOutlineDashboard size={24} />, label: "Dashboard" },
    { href: "/miembro/proyectos", icon: <AiOutlineProject size={24} />, label: "Proyectos" },
  ],
};

const ROLE_TEXT = {
  admin: "Administrador",
  gerente: "Gerencia",
  miembro: "Miembro",
};

const CUSTOM_CARDS_DATA = [
  {
    title: "Recents",
    description: "Lizards are a widespread group of squamate reptiles...",
    buttonText: "Learn More",
    onButtonClick: () => alert("Clicked!")
  },
  {
    title: "Docs",
    description: "The Bengal tiger is a population of the Panthera tigris...",
    buttonText: "Read More",
    onButtonClick: () => alert("Tiger Clicked!")
  },
  {
    title: "Bookmarks",
    description: "The Bengal tiger is a population of the Panthera tigris...",
    buttonText: "Read More",
    onButtonClick: () => alert("Tiger Clicked!")
  }
];

const theme = createTheme({
  palette: {
    primary: { main: grey[900] },
    secondary: { main: '#EF6C00' },
  },
});

const Sidebar = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [currentRole, setCurrentRole] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem("user") || "null");
    if (!storedUser?.rol) {
      router.push("/login");
    } else {
      setCurrentRole(storedUser.rol);
    }
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    router.push("/login");
  };

  const currentMenuItems = useMemo(() => 
    currentRole ? MENU_ITEMS[currentRole as keyof typeof MENU_ITEMS] : []
  , [currentRole]);

  if (!currentRole || !currentMenuItems) return null;

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`bg-sidebar text-white h-screen transition-all duration-300 ${isOpen ? "w-64" : "w-20"} fixed left-0 top-0`}>
        <div className="p-4">
          <div className="flex items-center justify-between p-4 border-b border-gray-600">
            {isOpen && (
              <Link href="/" className="flex items-center cursor-pointer">
                <h1 className="text-2xl font-bold text-white">ProjectFlow</h1>
              </Link>
            )}
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="p-2 rounded-lg hover:bg-gray-700"
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
          </div>

          {isOpen && currentRole && (
            <div className="mt-4 text-center border-b border-gray-500 pb-4">
              <p className="text-white text-lg font-semibold">
                {ROLE_TEXT[currentRole as keyof typeof ROLE_TEXT]}
              </p>
            </div>
          )}

          <nav className="mt-8">
            <ul className="space-y-4">
              {currentMenuItems.map((item, index) => (
                <li key={`${item.href}-${index}`}>
                  <Link 
                    href={item.href} 
                    className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-700"
                  >
                    {item.icon}
                    {isOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-4 left-0 w-full">
            <button 
              onClick={handleLogout} 
              className="flex items-center gap-4 p-2 w-full text-left hover:bg-red-600 rounded-lg"
            >
              <AiOutlineLogout size={24} />
              {isOpen && <span>Cerrar Sesión</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <div className={`flex-1 ml-${isOpen ? "64" : "20"} transition-all duration-300 p-6`}>
        <div className="top-card">
          <CardTop title="Bienvenido: user" />
        </div>
        
        <div className="listBreadcrumbs">
          <IconBreadcrumbs/>
        </div>

        <div className="components-flex">
          {CUSTOM_CARDS_DATA.map((card, index) => (
            <CustomCard key={index} {...card} />
          ))}
        </div>
        
        <div className="tableContente">
          <div className="listButtons">
            <button className="confButton">
              Settings <Tune style={{ fontSize: 20, marginLeft: '3px' }} />
            </button>
            <button className="hideButton">
              Customize <SettingsSuggest style={{ fontSize: 20, marginLeft: '3px' }} />
            </button>
            <button className="addButton">
              Add project <Add style={{ fontSize: 20, color: 'white' }} />
            </button>
            <button className="downButton">
              <KeyboardArrowDown style={{ fontSize: 20}} fontSize="inherit" />
            </button>
          </div>
          <DataTable/>
        </div>

        <div className="bottomCards">
          <div className="cardSide">
            <div className="newCharts">
              <button className="addChart">
                <Delete style={{ fontSize: 20, marginRight: '3px' }} /> Delete
              </button>
              <span className="separator">|</span>
              <button className="confhart">
                <Settings style={{ fontSize: 20 }} />
              </button>
            </div>
            <ThemeProvider theme={theme}>
              <Card 
                sx={{ 
                  width: "100%", 
                  maxWidth: "80vw", 
                  minWidth: 300,
                  height: 400,
                  backgroundColor: theme.palette.primary.main, 
                  color: 'white' 
                }}
                className='bottomCard'
              >
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Resources
                  </Typography>
                  <div className="items">
                    <p className="upload">
                      Upload files more than 1GB <UploadFileOutlined style={{ fontSize: 20, color: 'white' }} />
                    </p>
                  </div>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </ThemeProvider>
          </div>
          
          <div className="cardSide">
            <div className="newChartsSide">
              <button className="addChart">
                Filter <FilterAlt style={{ fontSize: 20, marginLeft: '3px'}} />
              </button>
              <span className="separator">|</span>
              <button className="confhart">
                <Settings style={{ fontSize: 20 }} />
              </button>
              <button className="checkChart">
                Last refresh 2 hours ago... <Cached style={{ fontSize: 20 }} />
              </button>
              <button className="checkUpdate">
                <AccessTime style={{ fontSize: 20 }} /> Auto refresh: On
              </button>
            </div>
            <ThemeProvider theme={theme}>
              <Card 
                sx={{ 
                  width: "100%", 
                  maxWidth: "80vw", 
                  minWidth: 300,
                  height: 400,
                  backgroundColor: theme.palette.primary.main, 
                  color: 'white' 
                }}
                className='bottomCard'
              >
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    Tasks
                  </Typography>
                  <div className="charts">
                    <ZoomControlled/>
                  </div>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card>
            </ThemeProvider>
          </div>
        </div>

        <div className="bottom-card">
          <CardTop title="Derechos reservados" />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;