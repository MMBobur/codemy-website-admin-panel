import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Image from "react-bootstrap/Image";
import { IconButton } from "@material-ui/core";
import ButtonM from "@material-ui/core/Button";
import ProglangModal from "./proglangModal";
import proglangServices from "../services/proglangservices";
import "../proglangStyle.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: "700px",
  },
});

const ProglangForm = () => {
  const classes = useStyles();

  const [valBtn, setValBtn] = useState("Add Proglang");
  const [a, setA] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(0);
  const [token, setToken] = useState("");

  const [oneD, setOneD] = useState({
    img_title: "",
    text: "",
  });

  useEffect(() => {
    proglangServices.getAll().then((res) => setData(res.data));
  }, [isActive]);

  useEffect(() => {
    let t = window.localStorage.getItem("token");
    setToken(t);
  }, [isActive]);

  const handleClick = () => {
    setValBtn("Add Proglang");
    setA(true);
  };
  const handleClose = () => {
    setA(false);
  };
  const addData = async (data) => {
    if (isEdit > 0) {
      let formData = new FormData();

      formData.append("file", imageUrl);
      formData.append("img_title", data.img_title);
      formData.append("text", data.text);

      await proglangServices.update(isEdit, formData, token).then((res) => {
        setIsActive(!isActive);
      });
      setIsEdit(0);
    } else {
      let formData = new FormData();
      formData.append("file", imageUrl);
      formData.append("img_title", data.img_title);
      formData.append("text", data.text);

      await proglangServices.create(formData, token).then((res) => {
        setIsActive(!isActive);
      });
    }
    setA(false);
  };

  const editProglang = async (id) => {
    try {
      setIsEdit(id);
      const oneData = data.filter((val) => {
        return val.id === id;
      });
      setOneD(oneData[0]);
      setA(true);
      setValBtn("Edit Proglang ");
    } catch (error) {
      console.log(error);
    }
  };

  const delProglang = async (id) => {
    try {
      await proglangServices.remove(id, token).then((res) => {
        setIsActive(!isActive);
      });
      setA(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNotEdit = (a) => {
    setIsEdit(0);
    setOneD({
      img_url: "",
      img_title: "",
      text: "",
    });
  };

  return (
    <>
      <ButtonM variant="contained" color="primary" onClick={handleClick}>
        Add new Proglang
      </ButtonM>
      <h2 className="header">Current Proglang</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell style={{ fontSize: "17px" }} align="center">
                Image
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "17px" }} align="center">
                Title
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "17px" }} align="center">
                Text
              </StyledTableCell>
              <StyledTableCell style={{ fontSize: "17px" }} align="right">
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((demo, index) => (
              <StyledTableRow key={index} style={{ fontSize: "17px" }} hover>
                <StyledTableCell align="center" component="th" scope="row">
                  <Image className="img" src={demo.img_url} rounded />
                </StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: "17px" }}>
                  {demo.img_title}
                </StyledTableCell>
                <StyledTableCell align="center" style={{ fontSize: "17px" }}>
                  {demo.text}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => delProglang(demo.id)}>
                    <DeleteIcon fontSize="inherit" color="error" />
                  </IconButton>
                  <IconButton onClick={() => editProglang(demo.id)}>
                    <EditIcon fontSize="default" style={{ color: "green" }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <ProglangModal
        setImageUrl={setImageUrl}
        valBtn={valBtn}
        one={oneD}
        handleClose={handleClose}
        addData={addData}
        window={a}
        notEdit={handleNotEdit}
      />
    </>
  );
};

export default ProglangForm;
