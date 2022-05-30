import { Box, Toolbar } from '@mui/material';
import { Logo } from './Logo';

export default function Loading() {

  return (
    <>
      <Toolbar
        disableGutters
        sx={{
          minHeight: 64,
          left: 0,
          px: 2
        }}
      >
        <Box sx={{ p: 3 }}>
          <Logo
            sx={{
              height: 42,
              width: 42
            }}
          />
        </Box>
        {/* <Tooltip title="Search">
            <IconButton sx={{ ml: 1 }}>
              <SearchIcon fontSize="small" />
            </IconButton>
          </Tooltip> */}
        <Box sx={{ flexGrow: 1 }} />
      </Toolbar>
    </>
  );
};
