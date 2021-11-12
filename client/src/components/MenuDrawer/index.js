import React from 'react';
import { Drawer, List, Divider, ListItem, ListItemIcon, ListItemText, Typography } from '@material-ui/core';
import { useSelector } from 'react-redux';

import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import StarIcon from '@material-ui/icons/Star';
import VisibilityIcon from '@material-ui/icons/Visibility';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import logo from '../../assets/logo3.png';
import logo2 from '../../assets/logo4.png';
import { NavLink } from 'react-router-dom';
import './style.css'

function MenuDrawer(props) {
  const isUserLoggedIn = useSelector(state => state.auth.isAuthenticated);
  const isUserAdmin = useSelector(state => state.auth.isUserAdmin);

  const list = () => (
    <div
      role="presentation"
    >
      <img alt="logo2" src={logo2} style={{ width: 50, marginLeft: 20 }} />
      <img alt="logo" src={logo} style={{ width: 130, height: 50, marginLeft: 10, marginRight: 15 }} />
      <Divider style={{ height: 2, backgroundColor: 'black', marginTop: 10 }} />
      <List onClick={props.onClose}>
        <ListItem button key="1">
          <ListItemIcon>
            <HomeIcon className="icon" />
          </ListItemIcon>
          <NavLink to='/' style={{ textDecoration: "none", color: "black" }} >
            <ListItemText primary={<Typography variant="subtitle1" style={{ color: 'black', fontWeight: 'bold' }}>Home</Typography>} />
          </NavLink>
        </ListItem>
        <ListItem button key="2">
          <ListItemIcon>
            <InfoIcon className="icon"/>
          </ListItemIcon>
          <p onClick={() => window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          })}
          style={{ marginBottom: 0 }}
          >
            <ListItemText primary={<Typography variant="subtitle1" style={{ color: 'black', fontWeight: 'bold' }}>About</Typography>} />
          </p>
        </ListItem>
        <ListItem button key="3">
          <ListItemIcon>
            <VisibilityIcon className="icon" />
          </ListItemIcon>
          <NavLink to='/games' style={{ textDecoration: "none", color: "black" }}>
            <ListItemText primary={<Typography variant="subtitle1" style={{ color: 'black', fontWeight: 'bold' }}>Games</Typography>} />
          </NavLink>
        </ListItem>
        <ListItem button key="4">
          <ListItemIcon>
            <StarIcon className="icon"
            />
          </ListItemIcon>
          <p onClick={() => window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth'
          })}
          style={{ marginBottom: 0 }}
          >
            <ListItemText primary={<Typography variant="subtitle1" style={{ color: 'black', fontWeight: 'bold' }}>Contact</Typography>} />
          </p>
        </ListItem>
        {(isUserLoggedIn && isUserAdmin) && <ListItem button key="5">
          <ListItemIcon>
            <SupervisorAccountIcon className="icon" />
          </ListItemIcon>
          <NavLink to='/admin' style={{ textDecoration: "none", color: "black" }}>
            <ListItemText primary={<Typography variant="subtitle1" style={{ color: 'black', fontWeight: 'bold' }}>Admin</Typography>} />
          </NavLink>
        </ListItem>}

      </List>
      <Divider style={{ height: 2, backgroundColor: 'black' }} />
      <div style={{ textAlign: 'center', marginLeft: 40, marginTop: 10 }}>
        <h6 style={{ width: 150 }}> MSGames ©2021 Created by General IT and Software Solutions d.o.o. Sarajevo by Mahir Patkovic</h6>
      </div>
    </div>
  );

  return (
    <div>
      <Drawer anchor="left" open={props.visible} onClose={props.onClose}>
        {list()}
      </Drawer>
    </div>
  );
}
export default MenuDrawer;