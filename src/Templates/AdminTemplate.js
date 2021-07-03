import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AccountCircleTwoToneIcon from "@material-ui/icons/AccountCircleTwoTone";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExitToAppOutlinedIcon from "@material-ui/icons/ExitToAppOutlined";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import MenuIcon from "@material-ui/icons/Menu";
import MovieIcon from "@material-ui/icons/Movie";
import PeopleAltOutlinedIcon from "@material-ui/icons/PeopleAltOutlined";
import clsx from "clsx";
import React from "react";
import { useDispatch } from "react-redux";
import { NavLink, Route, useHistory } from "react-router-dom";
import { USER_LOGIN } from "../Config/settings";
import { dangXuatTaiKhoanAction } from "../redux/User/user.actions";
import "./style.scss";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundImage: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
    height: "100vh",
    width: "100vw",
    overflowY: "scroll",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
    display: "flex",
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  iconUser: {
    fontSize: 35,
    marginRight: 8,
  },
}));

export const AdminTemplate = ({ Component, ...restProps }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const history = useHistory();
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const dangXuatTaiKhoan = () => {
    dispatch(dangXuatTaiKhoanAction(history));
  };
  const nguoiDung = JSON.parse(localStorage.getItem(USER_LOGIN));
  return (
    <Route
      {...restProps}
      render={(propsRoute) => {
        return (
          <div className={classes.root}>
            <CssBaseline />
            <AppBar
              position="fixed"
              className={clsx(classes.appBar, {
                [classes.appBarShift]: open,
              })}
            >
              <Toolbar className="d-flex justify-content-between">
                <div className="d-flex align-items-center">
                  <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={handleDrawerOpen}
                    edge="start"
                    className={clsx(classes.menuButton, open && classes.hide)}
                  >
                    <MenuIcon />
                  </IconButton>
                  <Typography variant="h6" noWrap>
                    Bảng điều khiển
                  </Typography>
                </div>
                <div className="d-flex align-items-center">
                  <AccountCircleTwoToneIcon className={classes.iconUser} />
                  <Typography variant="h6" noWrap>
                    {nguoiDung.taiKhoan}
                  </Typography>
                </div>
              </Toolbar>
            </AppBar>
            <Drawer
              className={classes.drawer}
              variant="persistent"
              anchor="left"
              open={open}
              classes={{
                paper: classes.drawerPaper,
              }}
            >
              <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                  {theme.direction === "ltr" ? (
                    <ChevronLeftIcon />
                  ) : (
                    <ChevronRightIcon />
                  )}
                </IconButton>
              </div>

              <List>
                <NavLink to="/admin/nguoidungmanager">
                  <ListItem button>
                    <ListItemIcon>
                      <PeopleAltOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý người dùng" />
                  </ListItem>
                </NavLink>
                <NavLink to="/admin/khoahocmanager">
                  <ListItem button>
                    <ListItemIcon>
                      <MovieIcon />
                    </ListItemIcon>
                    <ListItemText primary="Quản lý Phim" />
                  </ListItem>
                </NavLink>
                <NavLink to="/">
                  <ListItem button>
                    <ListItemIcon>
                      <HomeOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Trở về trang chủ" />
                  </ListItem>
                </NavLink>
                <NavLink
                  to="/"
                  onClick={() => {
                    dangXuatTaiKhoan();
                  }}
                >
                  <ListItem button>
                    <ListItemIcon>
                      <ExitToAppOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Đăng xuất" />
                  </ListItem>
                </NavLink>
              </List>
            </Drawer>
            <main
              className={clsx(classes.content, {
                [classes.contentShift]: open,
              })}
            >
              <div className={classes.drawerHeader} />
              <Component />
            </main>
          </div>
        );
      }}
    ></Route>
  );
};
