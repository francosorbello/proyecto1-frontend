import { DashboardOutlined } from '@mui/icons-material'
import { Icon, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@mui/material'
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link, useHistory } from 'react-router-dom'

const NavBarItem = ({ icon, title, path }) => {

  const handleClick = () => {
    history.push(path)
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
