// components/Header.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import { Link } from 'react-scroll';
import { useMediaQuery, useTheme } from '@mui/material';

const Header = () => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { label: 'Informações', target: 'about' },
    { label: 'Cardápio', target: 'custom-carousel' },
    { label: 'Localização', target: 'contact' },
  ];

  const drawer = (
    <div>
      <List>
        {menuItems.map((item, index) => (
          <Link
            key={index}
            to={item.target}
            spy={true}
            smooth={true}
            offset={-70}
            duration={500}
            color="inherit"
            underline="none"
          >
            <ListItem button>
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment>
      <AppBar position="fixed" sx={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} />
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ display: { xs: 'block', sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {!isMobile &&
            <nav sx={{ display: { xs: 'none', sm: 'block' } }}>
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.target}
                  spy={true}
                  smooth={true}
                  offset={-70}
                  duration={500}
                  color="inherit"
                  underline="none"
                >
                  <Button color="inherit">{item.label}</Button>
                </Link>
              ))}
            </nav>
          }
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="top"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: '240px' },
          display: { xs: 'block', sm: 'none' }, // Adicionado para ocultar o drawer em telas maiores
        }}
      >
        {drawer}
      </Drawer>
    </React.Fragment>
  );
};

export default Header;
