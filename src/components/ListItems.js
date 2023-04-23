import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Typography,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItem
} from "@material-ui/core";
// import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
// import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     panelSummary: {
//       flexDirection: "row-reverse",
//       paddingLeft: "0px"
//     },
//     heading: {
//       fontSize: theme.typography.pxToRem(15),
//       fontWeight: theme.typography.fontWeightRegular
//     },
//     innerMenuItem: {
//       paddingLeft: "32px"
//     },
//     expanded: {
//       padding: "0px"
//     }
//   })
// );


export const mainListItems = (
  
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Orders" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Customers" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Integrations" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        {/* <AssignmentIcon /> */}
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        {/* <AssignmentIcon /> */}
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        {/* <AssignmentIcon /> */}
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);