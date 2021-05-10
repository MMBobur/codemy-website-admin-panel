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
import CoursesModal from "./coursesModal";
import coursesService from "../services/coursesService";
import "../courses.css";

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

const CoursesForm = () => {
  const classes = useStyles();

  const [valBtn, setValBtn] = useState("");
  const [a, setA] = useState(false);
  const [data, setData] = useState([]);
  const [imageUrl, setImageUrl] = useState(undefined);
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(0);
  const [token, setToken] = useState("");

  const [oneD, setOneD] = useState({
    img_title: "",
  });

  useEffect(() => {
    coursesService.getAll().then((res) => setData(res.data));
  }, [isActive]);

  useEffect(() => {
    let t = window.localStorage.getItem("token");
    setToken(t);
  }, []);

  const handleClick = () => {
    setValBtn("Add Courses");
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

      await coursesService.update(isEdit, formData, token).then((res) => {
        setIsActive(!isActive);
      });
      setIsEdit(0);
    } else {
      let formData = new FormData();
      formData.append("file", imageUrl);
      formData.append("img_title", data.img_title);

      await coursesService.create(formData, token).then((res) => {
        setIsActive(!isActive);
      });
    }
    setA(false);
  };

  const editCourses = async (id) => {
    try {
      setIsEdit(id);
      const oneData = data.filter((val) => {
        return val.id === id;
      });
      setOneD(oneData[0]);
      setA(true);
      setValBtn("Edit Courses ");
    } catch (error) {
      console.log(error);
    }
  };

  const delCourses = async (id) => {
    try {
      await coursesService.remove(id, token).then((res) => {
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
    });
  };

  return (
    <>
      <ButtonM variant="contained" color="primary" onClick={handleClick}>
        Add new Courses
      </ButtonM>
      <h2 className="header">Current Courses</h2>
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
                <StyledTableCell align="right">
                  <IconButton onClick={() => delCourses(demo.id)}>
                    <DeleteIcon fontSize="inherit" color="error" />
                  </IconButton>
                  <IconButton onClick={() => editCourses(demo.id)}>
                    <EditIcon fontSize="default" style={{ color: "green" }} />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CoursesModal
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

export default CoursesForm;
