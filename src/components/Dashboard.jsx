import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Campaign as CampaignIcon, Dashboard as DashboardIcon, MarkunreadMailbox, Tag as TagIcon} from '@mui/icons-material';
import NavBarItem from './NavBarItem';
import { BrowserRouter, Route, Switch, useHistory } from 'react-router-dom';
import Campaigns from "./campaigns/Campaigns"
import CampaignContextProvider from '../contexts/CampaignContext';
import DashboardContent from './DashboardContent';
import CampaignForm from './campaigns/CampaignForm';
import TagView from './tags/TagView';
import TagContextProvider from '../contexts/TagContext';
import DonationContextProvider from '../contexts/DonationContext';
import Donations from './donations/Donations';
import AppContextProvider from '../contexts/AppContext';


const drawerWidth = 240;

/** Animación abrir/cerrar AppBar */
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

/** Animación abrir/cerrar Drawer */
const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

const mdTheme = createTheme();

/** Renderiza el appbar que contiene los links para ir a las distintas partes del sistema */
export default function Dashboard() {
  const [open, setOpen] = React.useState(false);
  const history = useHistory()
  const toggleDrawer = () => {
    setOpen(!open);
  };

  React.useEffect(()=>{
    history.push("/dashboard/campañas");
  },[])

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px', // keep right padding when drawer closed
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Dashboard
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List>
              <NavBarItem icon={<CampaignIcon />} path="/dashboard/campañas" title="Campañas"/>
              <NavBarItem icon={<MarkunreadMailbox />} path="/dashboard/donaciones" title="Donaciones"/>
              <NavBarItem icon={<TagIcon />} path="/dashboard/tags" title="Tags"/>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Toolbar />
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
              <Switch>
                <Route path="/dashboard/campañas" exact={true}>
                  <DashboardContent title="Campañas">
                    <CampaignContextProvider>
                      <Campaigns></Campaigns>
                    </CampaignContextProvider>
                  </DashboardContent>
                </Route>
                <Route path="/dashboard/donaciones" exact={true}>
                  <DashboardContent title ="Donaciones">
                    <AppContextProvider>
                      <Donations></Donations>
                    </AppContextProvider>
                  </DashboardContent>
                </Route>
                <Route path="/dashboard/tags" exact={true} >
                  <DashboardContent title="Tags">
                    <TagContextProvider>
                      <TagView></TagView>
                    </TagContextProvider>
                  </DashboardContent>
                </Route>
              </Switch>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}