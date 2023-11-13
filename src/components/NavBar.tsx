import { useState } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import NextLink from 'next/link';
import Link from '@mui/material/Link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import AppBar from '@mui/material/AppBar';

const pages = [
  { title: 'home', path: '/' },
  { title: 'cars', path: '/cars' },
  { title: 'tracks', path: '/tracks' },
  { title: 'submission form', path: '/submission-form' },
];

export default function NavBar() {
  const router = useRouter();
  const [anchorElNav, setAnchorElNav] = useState<HTMLElement | null>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
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
                    <Typography textAlign="center" sx={{ color: 'black' }}>
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
              <Link component={NextLink} key={page.title} href={page.path}>
                <Typography
                  variant="h6"
                  sx={{
                    m: 2,
                    fontSize: '1.15rem',
                    display: 'block',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease-out',
                    color: router.pathname === page.path ? '#fff' : 'text.main',
                    '&:hover': {
                      color: '#fff',
                    },
                  }}
                >
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
