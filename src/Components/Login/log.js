import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container, CssBaseline } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    widows: "100%",
    height: "100vh",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "teal",
  },
}));

function DashboardLayout({ children }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        {children}
      </Container>
    </div>
  );
}

export default DashboardLayout;
