import {
  AppBar,
  AppBarProps,
  Drawer,
  TableCell,
  TableHead,
  TableRow,
  styled,
} from "@mui/material";

const drawerWidth: number = 240;

interface MyAppBarProps extends AppBarProps {
  open?: boolean;
}

export const AdminAppBar = styled(AppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<MyAppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const AdminDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

export interface HeadCell {
  label: string;
}

interface EnhancedTableHeadProps {
  headCells: readonly HeadCell[];
}

export const EnhancedTableHead = ({ headCells }: EnhancedTableHeadProps) => {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell, idx) => (
          <TableCell key={idx} align="left" padding="normal">
            {headCell.label}
          </TableCell>
        ))}
        <TableCell size="small" />
      </TableRow>
    </TableHead>
  );
};
