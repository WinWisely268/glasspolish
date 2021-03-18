import React, { useState } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import { Link } from 'react-router-dom'
import { Collapse } from '@material-ui/core'
import { Divider } from '@material-ui/core'
import {
  Dashboard as DashboardIcon,
  LocalMall as ProductsIcon,
  People as PeopleIcon,
  BarChart as ReportIcon,
  FiberManualRecord
} from '@material-ui/icons'
import { AllRoutesStr } from '../../routes/constants'

export interface SidebarProps {
  isDrawerOpen: boolean
}

const sidebarMenus = [
  {
    name: 'dashboard',
    link: AllRoutesStr.Dashboard.root,
    hasIcon: true,
    icon: <DashboardIcon />
  },
  {
    name: 'inventori',
    link: '/dashboard/products',
    hasIcon: true,
    icon: <ProductsIcon />,
    items: [
      {
        name: 'kategori',
        link: AllRoutesStr.Dashboard.tags,
        hasIcon: false
      },
      {
        name: 'produk',
        link: AllRoutesStr.Dashboard.products,
        hasIcon: false
      },
      {
        name: 'warehouse',
        link: AllRoutesStr.Dashboard.warehouse,
        hasIcon: false
      }
    ]
  },
  {
    name: 'pengguna',
    link: AllRoutesStr.Dashboard.users,
    hasIcon: true,
    icon: <PeopleIcon />
  },
  {
    name: 'laporan',
    link: '/dashboard/reports',
    hasIcon: true,
    icon: <ReportIcon />
  }
]

interface SubMenuSetting {
  id: string
  isOpen: boolean
}

interface SubMenuOptions {
  settings: SubMenuSetting[]
}

export const SidebarNav: React.FC<SidebarProps> = ({
                                                     isDrawerOpen
                                                   }) => {
  const [subMenuOpen, setSubMenuOpen] = useState<SubMenuOptions>({
    settings: [
      {
        id: 'menus.reports.title',
        isOpen: false
      },
      {
        id: 'menus.products.title',
        isOpen: false
      },
      {
        id: 'menus.attendance.title',
        isOpen: false
      }
    ]
  })
  const handleSubMenuOpen = (id: string) => {
    return () => {
      setSubMenuOpen({
        settings: [
          {
            id: id,
            isOpen: !subMenuOpen.settings.find((sub) => sub.id === id)?.isOpen
          }
        ]
      })
    }
  }
  const itemWithSubmenu = (item: any, index: number) => (
    <React.Fragment key={item.name}>
      <ListItem button onClick={handleSubMenuOpen(item.name)}>
        <ListItemIcon>{item.icon}</ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
      <Collapse
        in={
          subMenuOpen.settings.find((sub) => sub.id === item.name)?.isOpen &&
          isDrawerOpen
        }
        timeout='auto'
        unmountOnExit
      >
        <Divider />
        <List
          component='div'
          disablePadding
          style={{ paddingLeft: 15, overflow: 'auto' }}
        >
          {item.items.map((subItem: any, subIdx: number) => {
            if (Array.isArray(subItem.subItems)) {
              return itemWithSubmenu(subItem, subIdx)
            }
            return itemMenu(subItem, subIdx)
          })}
        </List>
      </Collapse>
    </React.Fragment>
  )

  const itemMenu = (item: any, index: number) => (
    <Link
      to={item.link}
      key={item.name}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      <ListItem button>
        <ListItemIcon>
          {item.hasIcon ? item.icon : <FiberManualRecord />}
        </ListItemIcon>
        <ListItemText primary={item.name} />
      </ListItem>
    </Link>
  )

  return (
    <List>
      {sidebarMenus.map((item, index) => {
        if (Array.isArray(item.items)) {
          return itemWithSubmenu(item, index)
        }
        return itemMenu(item, index)
      })}
    </List>
  )
}
