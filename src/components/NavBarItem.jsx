import { DashboardOutlined } from '@mui/icons-material'
import { Icon, ListItem, ListItemIcon, ListItemText, SvgIcon } from '@mui/material'
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'

export class NavBarItem extends Component {
    render() {
        return (
            <div>
                <ListItem button>
                  <ListItemIcon>
                    <>
                    {this.props.icon}
                    </>
                  </ListItemIcon>
                  <ListItemText primary={this.props.title} />
                </ListItem>
            </div>
        )
    }
}

NavBarItem.propTypes = {
    icon: PropTypes.instanceOf(SvgIcon),
    title: PropTypes.string
}

export default NavBarItem
