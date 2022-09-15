import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Link from '../../Link';
import { useRouter } from 'next/router';
import Image from 'next/image';
const pages = [
  { title: 'home', path: '/' },
  { title: 'cars', path: '/cars' },
  { title: 'tracks', path: '/tracks' },
  { title: 'submission form', path: '/submission-form' },
];

export default function NavBar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              my: 1,
              display: { sm: 'block' },
            }}
          >
            <Image
              src="/images/logo.png"
              width={400}
              height={50}
              objectFit="contain"
            />
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'right',
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={handleCloseNavMenu}>
                  <Link
                    underline="none"
                    color="text.main"
                    key={page.title}
                    href={page.path}
                  >
                    <Typography textAlign="center">
                      {page.title.toUpperCase()}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box
            sx={{
              flexGrow: 1.5,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'end',
            }}
          >
            {pages.map((page) => (
              <Link
                key={page.title}
                href={page.path}
                sx={{
                  m: 2,
                  display: 'block',
                  textDecoration: 'none',
                  color: router.pathname === page.path ? '#fff' : 'text.main',
                  '&:hover': {
                    color: '#fff',
                  },
                }}
              >
                <Typography variant="h6" sx={{ fontSize: '1.15rem' }}>
                  {page.title.toUpperCase()}
                </Typography>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
