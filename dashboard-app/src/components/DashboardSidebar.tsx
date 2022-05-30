import { useEffect } from 'react';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/ChartBar';
// import { Cog as CogIcon } from '../icons/Cog';
// import { Lock as LockIcon } from '../icons/Lock';
// import { Selector as SelectorIcon } from '../icons/Selector';
// import { ShoppingBag as ShoppingBagIcon } from '../icons/ShoppingBag';
// import { User as UserIcon } from '../icons/User';
// import { UserAdd as UserAddIcon } from '../icons/UserAdd';
import { Users as UsersIcon } from '../icons/Users';
// import { XCircle as XCircleIcon } from '../icons/XCircle';
import { Logo } from './Logo';
import { NavItem } from './NavItem';
import { Link, useLocation } from 'react-router-dom';
import { auth } from '../services';
import { signOut } from "firebase/auth";

const items = [
  {
    href: '/app',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/app/customers',
    icon: (<UsersIcon fontSize="small" />),
    title: 'Customers'
  },
  // {
  //   href: '/products',
  //   icon: (<ShoppingBagIcon fontSize="small" />),
  //   title: 'Products'
  // },
  // {
  //   href: '/account',
  //   icon: (<UserIcon fontSize="small" />),
  //   title: 'Account'
  // },
  // {
  //   href: '/settings',
  //   icon: (<CogIcon fontSize="small" />),
  //   title: 'Settings'
  // },
  // {
  //   href: '/login',
  //   icon: (<LockIcon fontSize="small" />),
  //   title: 'Login'
  // },
  // {
  //   href: '/register',
  //   icon: (<UserAddIcon fontSize="small" />),
  //   title: 'Register'
  // },
  // {
  //   href: '/404',
  //   icon: (<XCircleIcon fontSize="small" />),
  //   title: 'Error'
  // }
];

function logout() {
  signOut(auth);
}

export const DashboardSidebar = (props: any) => {
  const { open, onClose } = props;
  const location = useLocation();
  const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  useEffect(
    () => {
      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <Link
              to="/app"
            >
              <Logo
                sx={{
                  height: 42,
                  width: 42
                }}
              />
            </Link>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Aseem Gaurav
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  {`Role: SuperAdmin`}
                </Typography>
              </div>
              {/* <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              /> */}
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >

          <Button
            color="error"
            endIcon={(<OpenInNewIcon />)}
            fullWidth
            sx={{ mt: 2 }}
            variant="contained"
            onClick={logout}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 280
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};