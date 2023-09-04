import { Circle, ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  Collapse,
  IconProps,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

interface TitleAndLink {
  title: string;
  link: string;
}

interface SideMenuProps {
  headerTitle: string;
  icon: React.ReactElement<IconProps>;
  sublist: TitleAndLink[];
}

export const SideMenu = ({ icon, sublist, headerTitle }: SideMenuProps) => {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={headerTitle} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {sublist.map((list) => (
            <ListItemButton
              sx={{ pl: 4 }}
              onClick={() => {
                navigate(list.link);
              }}
            >
              <ListItemIcon>
                <Circle fontSize="small" />
              </ListItemIcon>
              <ListItemText primary={list.title} />
            </ListItemButton>
          ))}
        </List>
      </Collapse>
    </div>
  );
};
