import { ListItem, ListItemButton, ListItemText, SxProps } from "@mui/material"
import { Link } from "react-router-dom";

type MenuListItemProps = {
  folderName: string,
  pageName: string,
  sx?: SxProps
}

type MenuListItemSimpleProps = {
  pageName: string,
  sx?: SxProps
}

const MenuListItemSimple = (props: MenuListItemSimpleProps) => {
  return (
    <ListItem component={Link} to={`/${props.pageName}`} sx={props.sx}>
      <ListItemButton>
        <ListItemText primary={props.pageName} />
      </ListItemButton>
    </ListItem>
  )
}

const MenuListItem = (props: MenuListItemProps) => {
  return (
    <ListItem component={Link} to={`/${props.folderName}/${props.pageName}`} sx={props.sx}>
      <ListItemText
        primary={props.pageName}
      />
    </ListItem>
  )
}

export { MenuListItemSimple }

export default MenuListItem