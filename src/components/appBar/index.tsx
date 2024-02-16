import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import CookieIcon from '@mui/icons-material/Cookie';
import { Link, Link as RouterLink } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';


interface IAppBar{
    title: string,
    campo1: string,
    campo2: string,
    campo3: string,
    campo4: string,
    link1: string,
    link2:string,
    link3:string,
    link4: string
}
function AppBarMenu(props: IAppBar) {
    const pages = [{campo1: props.campo1, link1: props.link1}, {campo1: props.campo2, link1: props.link2}, {campo1: props.campo3, link1: props.link3}, {campo1: props.campo4, link1: props.link4}];
    
    const settings = ['Perfil', 'Conta', 'Carrinho', 'Sair'];
    

    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const [cartItemCount, setCartItemCount] = React.useState(0);

    React.useEffect(() => {
        // Recupera a quantidade de itens do carrinho do localStorage
        const cartItems = JSON.parse(localStorage.getItem('carrinho') || '[]');
        // Atualiza o estado com a quantidade de itens
        setCartItemCount(cartItems.length);
        
        
    }, []);

    return (
        <AppBar position="static" sx={{margin:'none', padding:'none'}}>
            <Container maxWidth="xl" sx={{backgroundColor: '#d81b60', margin: 'none'}}>
                <Toolbar disableGutters >
                    <Typography
                        variant="h4"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'initial',
                            fontWeight: 700,
                            color: 'inherit',
                            textDecoration: 'none',
                            whiteSpace: 'nowrap',
                        }}
                    >
                        <CookieIcon href="/" sx={{ fontSize:'6vh', display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                        <RouterLink style={{textDecoration:'none', color: 'inherit'}} to={'/'}>{props.title}</RouterLink>
                        
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
                                <MenuItem key={page.campo1} onClick={handleCloseNavMenu}>
                                    <Typography textAlign="center"><RouterLink style={{textDecoration:'none', color: 'inherit'}} to={page.link1}>{page.campo1}</RouterLink></Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'inherit',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                    <RouterLink style={{textDecoration:'none', color: 'inherit'}} to={'/Home'}>{props.title}</RouterLink>
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page) => (
                            <Button
                                key={page.campo1}
                                onClick={handleCloseNavMenu}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                            <RouterLink style={{textDecoration:'none', color: 'inherit'}} to={page.link1}>{page.campo1}</RouterLink>
                                
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                    <Typography textAlign="center">{setting}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Link to={'/carrinho'} style={{ color: 'inherit', textDecoration: 'none' }}>
                    <ShoppingCartIcon/>
                    {cartItemCount > 0 && (
                        <span style={{
                        position: 'absolute',
                        top: '2px',
                        right: '-8px',
                        backgroundColor: 'black',
                        color: 'white',
                        borderRadius: '50%',
                        padding: '4px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        }}>
                        {cartItemCount}
                        </span>
                    )}
                    </Link>
                    
                </Toolbar>
            </Container>
        </AppBar>
    );
}
export default AppBarMenu;
