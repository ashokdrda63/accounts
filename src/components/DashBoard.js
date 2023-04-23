// // import * as React from 'react';
// // import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
// // import CssBaseline from '@mui/material/CssBaseline';
// // import MuiDrawer from '@mui/material/Drawer';
// // import Box from '@mui/material/Box';
// // import MuiAppBar from '@mui/material/AppBar';
// // import Toolbar from '@mui/material/Toolbar';
// // import List from '@mui/material/List';
// // import Typography from '@mui/material/Typography';
// // import Divider from '@mui/material/Divider';
// // import IconButton from '@mui/material/IconButton';
// // import Badge from '@mui/material/Badge';
// // import Container from '@mui/material/Container';
// // import Grid from '@mui/material/Grid';
// // import Paper from '@mui/material/Paper';
// // import Link from '@mui/material/Link';
// // import MenuIcon from '@mui/icons-material/Menu';
// // import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
// // import NotificationsIcon from '@mui/icons-material/Notifications';
// // import { mainListItems, secondaryListItems } from './ListItems';

// // function Copyright(props) {
// //   return (
// //     <Typography variant="body2" color="text.secondary" align="center" {...props}>
// //       {'Copyright © '}
// //       <Link color="inherit" href="https://mui.com/">
// //         Your Website
// //       </Link>{' '}
// //       {new Date().getFullYear()}
// //       {'.'}
// //     </Typography>
// //   );
// // }

// // const drawerWidth = 200;

// // const AppBar = styled(MuiAppBar, {
// //   shouldForwardProp: (prop) => prop !== 'open',
// // })(({ theme, open }) => ({
// //   zIndex: theme.zIndex.drawer + 1,
// //   transition: theme.transitions.create(['width', 'margin'], {
// //     easing: theme.transitions.easing.sharp,
// //     duration: theme.transitions.duration.leavingScreen,
// //   }),
// //   ...(open && {
// //     marginLeft: drawerWidth,
// //     width: `calc(100% - ${drawerWidth}px)`,
// //     transition: theme.transitions.create(['width', 'margin'], {
// //       easing: theme.transitions.easing.sharp,
// //       duration: theme.transitions.duration.enteringScreen,
// //     }),
// //   }),
// // }));

// // const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
// //   ({ theme, open }) => ({
// //     '& .MuiDrawer-paper': {
// //       position: 'relative',
// //       whiteSpace: 'nowrap',
// //       width: drawerWidth,
// //       transition: theme.transitions.create('width', {
// //         easing: theme.transitions.easing.sharp,
// //         duration: theme.transitions.duration.enteringScreen,
// //       }),
// //       boxSizing: 'border-box',
// //       ...(!open && {
// //         overflowX: 'hidden',
// //         transition: theme.transitions.create('width', {
// //           easing: theme.transitions.easing.sharp,
// //           duration: theme.transitions.duration.leavingScreen,
// //         }),
// //         width: theme.spacing(7),
// //         [theme.breakpoints.up('sm')]: {
// //           width: theme.spacing(9),
// //         },
// //       }),
// //     },
// //   }),
// // );

// // const mdTheme = createTheme();

// // function DashboardContent() {
// //   const [open, setOpen] = React.useState(true);
// //   const toggleDrawer = () => {
// //     setOpen(!open);
// //   };

// //   return (
// //     <ThemeProvider theme={mdTheme}>
// //       <Box sx={{ display: 'flex' }}>
// //         <CssBaseline />
// //         <AppBar position="absolute" open={open}>
// //           <Toolbar
// //             sx={{
// //               pr: '24px', // keep right padding when drawer closed
// //             }}
// //           >
// //             <IconButton
// //               edge="start"
// //               color="inherit"
// //               aria-label="open drawer"
// //               onClick={toggleDrawer}
// //               sx={{
// //                 marginRight: '36px',
// //                 ...(open && { display: 'none' }),
// //               }}
// //             >
// //               <MenuIcon />
// //             </IconButton>
// //             <Typography
// //               component="h1"
// //               variant="h6"
// //               color="inherit"
// //               noWrap
// //               sx={{ flexGrow: 1 }}
// //             >
// //               Dashboard
// //             </Typography>
// //             <IconButton color="inherit">
// //               <Badge badgeContent={4} color="secondary">
// //                 <NotificationsIcon />
// //               </Badge>
// //             </IconButton>
// //           </Toolbar>
// //         </AppBar>
// //         <Drawer variant="permanent" open={open}>
// //           <Toolbar
// //             sx={{
// //               display: 'flex',
// //               alignItems: 'center',
// //               justifyContent: 'flex-end',
// //               px: [1],
// //             }}
// //           >
// //             <IconButton onClick={toggleDrawer}>
// //               <ChevronLeftIcon />
// //             </IconButton>
// //           </Toolbar>
// //           {/* <Divider /> */}
// //           <List component="nav">
// //             {mainListItems}
// //             <Divider sx={{ my: 1 }} />
// //             {secondaryListItems}
// //           </List>
// //         </Drawer>
    
// //       </Box>
// //     </ThemeProvider>
// //   );
// // }

// // export default function Dashboard() {
// //   return <DashboardContent />;
// // }


// import * as React from 'react';
// import Box from '@mui/material/Box';
// import List from '@mui/material/List';
// import Link, { LinkProps } from '@mui/material/Link';
// import ListItem, { ListItemProps } from '@mui/material/ListItem';
// import Collapse from '@mui/material/Collapse';
// import ListItemText from '@mui/material/ListItemText';
// import Typography from '@mui/material/Typography';
// import ExpandLess from '@mui/icons-material/ExpandLess';
// import ExpandMore from '@mui/icons-material/ExpandMore';
// import Breadcrumbs from '@mui/material/Breadcrumbs';
// import {
//   Link as RouterLink,
//   Route,
//   Routes,
//   MemoryRouter,
//   useLocation,
// } from 'react-router-dom';

// interface ListItemLinkProps extends ListItemProps {
//   to: string;
//   open?: boolean;
// }

// const breadcrumbNameMap: { [key: string]: string } = {
//   '/inbox': 'Inbox',
//   '/inbox/important': 'Important',
//   '/trash': 'Trash',
//   '/spam': 'Spam',
//   '/drafts': 'Drafts',
// };

// function ListItemLink(props: ListItemLinkProps) {
//   const { to, open, ...other } = props;
//   const primary = breadcrumbNameMap[to];

//   let icon = null;
//   if (open != null) {
//     icon = open ? <ExpandLess /> : <ExpandMore />;
//   }

//   return (
//     <li>
//       <ListItem button  to={to} {...other}>
//         <ListItemText primary={primary} />
//         {icon}
//       </ListItem>
//     </li>
//   );
// }

// interface LinkRouterProps extends LinkProps {
//   to: string;
//   replace?: boolean;
// }

// const LinkRouter = (props: LinkRouterProps) => (
//   <Link {...props}  />
// );

// const Page = () => {
//   const location = useLocation();
//   const pathnames = location.pathname.split('/').filter((x) => x);

//   return (
//     <Breadcrumbs aria-label="breadcrumb">
//       <LinkRouter underline="hover" color="inherit" to="/">
//         Home
//       </LinkRouter>
//       {pathnames.map((value, index) => {
//         const last = index === pathnames.length - 1;
//         const to = `/${pathnames.slice(0, index + 1).join('/')}`;

//         return last ? (
//           <Typography color="text.primary" key={to}>
//             {breadcrumbNameMap[to]}
//           </Typography>
//         ) : (
//           <LinkRouter underline="hover" color="inherit" to={to} key={to}>
//             {breadcrumbNameMap[to]}
//           </LinkRouter>
//         );
//       })}
//     </Breadcrumbs>
//   );
// };

// export default function DashBoard() {
//   const [open, setOpen] = React.useState(true);

//   const handleClick = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   return (
//     <MemoryRouter initialEntries={['/inbox']} initialIndex={0}>
//       <Box sx={{ display: 'flex', flexDirection: 'column', width: 360 }}>
//         <Routes>
//           <Route path="*" element={<Page />} />
//         </Routes>
//         <Box
//           sx={{
//             bgcolor: 'background.paper',
//             mt: 1,
//           }}
//           component="nav"
//           aria-label="mailbox folders"
//         >
//           <List>
//             <ListItemLink to="/inbox" open={open} onClick={handleClick} />
//             <Collapse component="li" in={open} timeout="auto" unmountOnExit>
//               <List disablePadding>
//                 <ListItemLink sx={{ pl: 4 }} to="/inbox/important" />
//               </List>
//             </Collapse>
//             <ListItemLink to="/trash" />
//             <ListItemLink to="/spam" />
//           </List>
//         </Box>
//       </Box>
//     </MemoryRouter>
//   );
// }
