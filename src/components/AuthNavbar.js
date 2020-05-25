import React, {useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import styled from "styled-components";
import Menu from "@material-ui/icons/Menu";
import PersonAdd from "@material-ui/icons/PersonAdd";
import Fingerprint from "@material-ui/icons/Fingerprint";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
      color: "red"
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}));

const AuthNavbar = props => {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [pageText, setPageText] = React.useState(null);

  useEffect(() => {
    if(window.location.pathname === `/auth/register-page`) {
     setPageText("REGISTER PAGE")
    }
    if(window.location.pathname === `/auth/login-page`) {
      setPageText("LOGIN PAGE")
     }
  }, [location]);


  const classes = useStyles();
  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const list = (
    <List className="flex">
      {["Login", "Register"].map((text, index) => (
        <ListItem button key={text} onClick={() => redirectHandler(text)}>
          <ListItemIcon className="list-icon">
            {index === 0 ? <Fingerprint /> : <PersonAdd />}
          </ListItemIcon>
          <ListItemText primary={text} className="list-icon" />
        </ListItem>
      ))}
    </List>
  );

  const redirectHandler = text => {
    if(text === "Login") {
      props.history.push("/auth/login-page")
    }
    if(text === "Register") {
      props.history.push("/auth/register-page")
    }
  };

  return (
    <DIV>
      Login Page
      <AppBar position="static" className="app-header">
        <Toolbar className="flex">
          <Hidden smDown>
            <div>
                {pageText}
            </div>
          </Hidden>
          <Hidden mdUp>
            <div>
                Login Page
            </div>
          </Hidden>
          <Hidden smDown>{list}</Hidden>
          <Hidden mdUp>
            <Button
              className="burger-icon"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
            >
              <Menu />
            </Button>
          </Hidden>
          <Hidden mdUp>
            <Hidden mdUp>
              <Drawer
                variant="temporary"
                anchor={"right"}
                open={open}
                onClose={handleDrawerToggle}
                classes={{
                  paper: classes.drawerPaper
                }}
                ModalProps={{
                  keepMounted: true
                }}
              >
                <div>
                  <div className={classes.toolbar} />
                  {list}
                </div>
              </Drawer>
            </Hidden>
          </Hidden>
        </Toolbar>
      </AppBar>
    </DIV>
  );
};

const DIV = styled.div`
  width: 100vw;
  .app-header {
    background-color: transparent;
    box-shadow: none;
  }

  .navlink,
  .page-info,
  .burger-icon {
    color: #fff;
  }

  .navlink {
    display: flex;
    padding: 6px;
    border-radius: 4px;
  }

  .flex {
    display: flex;
    justify-content: space-between;
  }

  .list-icon {
    color: white;
  }

  .active {
    background-color: rgba(224, 224, 224, 0.1);
  }

  .list-item {
    margin: 0 0 0 15px;
    padding: 0;
  }

  .MuiListItem-button:hover {
    background-color: #afafaf38;
  }
`;

export default withRouter(AuthNavbar);
