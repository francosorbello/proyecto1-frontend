import { DashboardOutlined } from '@mui/icons-material'
import { Icon, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@mui/material'
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link, useHistory } from 'react-router-dom'

/** Boton que redirecciona a un route cuando es clickeado 
 * @icon icono del boton
 * @title nombre del boton
 * @path route al que redireccionar
*/
const NavBarItem = ({ icon, title, path }) => {

  const handleClick = () => {
    history.replace(path)
    // TODO: esto es para recargar la pag cuando clickeas el icono pero es ineficiente
    // Buscar una mejor manera
    history.go(0)
  }

  const history = useHistory()

  return (
    <div>
      <ListItem button onClick={handleClick} >
        <ListItemIcon>
          <>
            {icon}
          </>
        </ListItemIcon>
        <ListItemText primary={title} onClick={handleClick} />
      </ListItem>
    </div>
  )
}

export default NavBarItem
