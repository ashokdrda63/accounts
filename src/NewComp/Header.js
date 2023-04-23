import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import { Menu, MenuItem, List, ListItem } from '@material-ui/core'
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from "react-router-dom";
import VoucherEntry from './../components/VoucherEntry';

function Header() {
  const [anchorElEntry, setAnchorElEntry] = React.useState(null);
  const [anchorElTwo, setAnchorElTwo] = React.useState(null);
  const [anchorElThree, setAnchorElThree] = React.useState(null);
  const [anchorElFour, setAnchorElFour] = React.useState(null);


  const open = Boolean(anchorElEntry);
  const openTwo = Boolean(anchorElTwo);
  const openThree = Boolean(anchorElThree);
  const openFour = Boolean(anchorElFour);




  console.log("open", open)

  const handleClick = (event) => {
    setAnchorElEntry(event.currentTarget);
  };

  const handleClickTwo = (event) => {
    setAnchorElTwo(event.currentTarget);
  };

  const handleClickThree = (event) => {
    setAnchorElThree(event.currentTarget);
  };

  const handleClickFour = (event) => {
    setAnchorElFour(event.currentTarget);
  };


  const handleClose = () => {
    setAnchorElEntry(null);
    setAnchorElTwo(null);
    setAnchorElThree(null);
    setAnchorElFour(null);
  };
  return (
    <div>
      {/* <Box sx={{ flexGrow: 1 ,}}> */}
      <AppBar position="static" sx={{}}>
        <Toolbar >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, cursor: "pointer" }}>
            ACCOUNT Plus
          </Typography>
          <List
            style={{
              display: "inline-flex",
            }}
          >
            <ListItem  >
              <Typography aria-controls='basic-entry' aria-haspopup="true" aria-expanded="false" variant="button" onClick={handleClick} sx={{ mx: 2, cursor: "pointer" }}>
                Standard Swift
              </Typography>
            </ListItem>
            <Box>
              <Menu
                sx={{}}
                id="basic-entry"
                anchorEl={anchorElEntry}
                open={open}
                onClose={handleClose}
                keepMounted
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem component={Link} to="/Scheme-Entries" onClick={handleClose}>Scheme Entey</MenuItem>
                <MenuItem component={Link} to="/Bud-Acc-Entries" onClick={handleClose}>Account Entey</MenuItem>
                <MenuItem component={Link} to="/OBmaster-Entries" onClick={handleClose}>OBmaster Entey</MenuItem>
              </Menu>
            </Box>
            <ListItem>
              <Typography variant="button" aria-controls='basic-entry' aria-haspopup="true" aria-expanded="false" variant="button" onClick={handleClickTwo} sx={{ mx: 2, cursor: "pointer" }} >
                Normal Swift
              </Typography>
            </ListItem>
            <Box>
              <Menu
                sx={{}}
                id="basic-entry"
                anchorEl={anchorElTwo}
                open={openTwo}
                onClose={handleClose}
                keepMounted
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem component={Link} to="/Voucher-Entry" onClick={handleClose}>Voucher Entry</MenuItem>
                <MenuItem component={Link} to="/2-2" onClick={handleClose}>voucher Edit</MenuItem>
                <MenuItem component={Link} to="/2-3" onClick={handleClose}>Voucher Query</MenuItem>
              </Menu>
            </Box>
            <ListItem>
              <Typography variant="button" aria-controls='basic-entry' aria-haspopup="true" aria-expanded="false" onClick={handleClickThree}  sx={{ mx: 2, cursor: "pointer" }} >
                Print Swift
              </Typography>
            </ListItem>
            <Box>
              <Menu
                sx={{}}
                id="basic-entry"
                anchorEl={anchorElThree}
                open={openThree}
                onClose={handleClose}
                keepMounted
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem component={Link} to="/3-1" onClick={handleClose}>Trial Balance</MenuItem>
                <MenuItem component={Link} to="/DayBook" onClick={handleClose}>Day Book</MenuItem>
                <MenuItem component={Link} to="/3-3" onClick={handleClose}>Account Book</MenuItem>
                <MenuItem component={Link} to="/3-4" onClick={handleClose}>Consolidate trial Balance</MenuItem>

              </Menu>
            </Box>
            <ListItem>
              <Typography variant="button" variant="button" aria-controls='basic-entry' aria-haspopup="true" aria-expanded="false" onClick={handleClickFour} sx={{ mx: 2, cursor: "pointer" }} >
                Query Swift
              </Typography>
            </ListItem>
            <Box>
              <Menu
                sx={{}}
                id="basic-entry"
                anchorEl={anchorElFour}
                open={openFour}
                onClose={handleClose}
                keepMounted
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <MenuItem component={Link} to="/Account-Entries" onClick={handleClose}>Day Book Close</MenuItem>
                <MenuItem component={Link} to="/Scheme-Entries" onClick={handleClose}>Financial Year Close</MenuItem>
              </Menu>
            </Box>
          </List>
        </Toolbar>

      </AppBar>
      {/* </Box> */}
    </div >
  )
}

export default Header