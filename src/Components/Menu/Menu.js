import React, { useState, forwardRef } from "react";
import { List, ListItem, Collapse, Button, Drawer } from "@material-ui/core";
import clsx from "clsx";
import menuItems from "./sideBarItems";
import { NavLink as RouterLink } from "react-router-dom";
import useStyles from "./menuBarStyles.js";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../store/actions";

const MenuBar = (props) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(signOut());
  };

  const [menu, setMenu] = useState({});
  const { className, ...rest } = props;
  const classes = useStyles();
  const auth = useSelector((state) => state.loggedIn);

  const handleClick = (item) => {
    let newData = {
      ...menu,
      [item]: !menu[item],
    };
    setMenu(newData);
  };

  const CustomRouterLink = forwardRef((props, ref) => (
    <div
      ref={ref}
      style={{
        flexGrow: 1,
      }}
    >
      <RouterLink {...props} />
    </div>
  ));

  const handleMenu = (children, level = 0) => {
    return children.map(({ children, name, url, links }) => {
      if (!children) {
        return (
          <List component="div" disablePadding key={name}>
            <ListItem
              className={classes.item}
              disableGutters
              style={{
                padding: "0px",
              }}
              key={name}
            >
              <Button
                className={clsx({
                  [classes.btnRoot]: true,
                  [classes.button]: true,
                  [classes.subMenu]: level,
                })}
                component={CustomRouterLink}
                to={url}
              >
                {name}
              </Button>
            </ListItem>
          </List>
        );
      }
      return (
        <div key={name}>
          <ListItem
            className={classes.item}
            disableGutters
            key={name}
            onClick={() => handleClick(name)}
          >
            <Button
              className={clsx({
                [classes.btnRoot]: true,
                [classes.button]: true,
                [classes.subMenu]: level,
              })}
            >
              {name}
            </Button>
          </ListItem>
          <Collapse in={menu[name] ? true : false} timeout="auto" unmountOnExit>
            {handleMenu(children, 1)}
          </Collapse>
        </div>
      );
    });
  };
  return auth ? (
    <Drawer
      anchor="left"
      classes={{
        paper: classes.drawer,
      }}
      open={true}
      variant="persistent"
    >
      <List {...rest} className={clsx(classes.root, className)}>
        {handleMenu(menuItems.data)}
      </List>
      <div
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "flex-end",
          flexDirection: "column",
        }}
      >
        <Button
          style={{
            display: "flex",
            position: "fixed",
            margin: "20px",
            backgroundColor: "#51be78",
            color: "#fff",
            width: "170px",
          }}
          onClick={handleLogout}
        >
          LogOut
        </Button>
      </div>
    </Drawer>
  ) : (
    ""
  );
};

export default MenuBar;
