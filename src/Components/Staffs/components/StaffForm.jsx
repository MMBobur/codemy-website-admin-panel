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
import StaffModal from "./StaffModal";
import StaffService from "../services/StaffServices";
import "../staffStyle.css";

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
    minWidth: 700,
  },
});

const StaffForm = () => {
  const classes = useStyles();

  const [a, setA] = useState(false);
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(0);
  const [token, setToken] = useState("");
  const [imageUrl, setImageUrl] = useState(undefined);

  const [btn, setBtn] = useState("");

  const [oneD, setOneD] = useState({
    id: "",
    img_url: "",
    name: "",
    surname: "",
    email: "",
    experience: "",
  });

  useEffect(() => {
    StaffService.getAll().then((res) => setData(res.data));
  }, [isActive]);

  useEffect(() => {
    let t = window.localStorage.getItem("token");
    setToken(t);
  }, []);

  const handleClick = () => {
    setBtn("Add Staff");
    setA(true);
  };
  const handleClose = () => {
    setA(false);
  };

  const addData = async (data) => {
    try {
      if (isEdit > 0) {
        let formData = new FormData();

        formData.append("file", imageUrl);
        formData.append("name", data.name);
        formData.append("surname", data.surname);
        formData.append("email", data.email);
        formData.append("experience", data.experience);
        await StaffService.update(isEdit, formData, token).then((res) => {
          setIsActive(!isActive);
        });
        setA(false);
        setIsEdit(0);
      } else {
        let formData = new FormData();

        formData.append("file", imageUrl);
        formData.append("name", data.name);
        formData.append("surname", data.surname);
        formData.append("email", data.email);
        formData.append("experience", data.experience);

        StaffService.create(formData, token).then((res) => {
          setIsActive(!isActive);
        });
        setA(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    setBtn("Edit Staff");
    try {
      setIsEdit(id);
      const oneData = data.filter((val) => {
        return val.id === id;
      });
      setOneD(oneData[0]);
      setA(true);
    } catch (error) {
      console.log(error);
    }
  };

  const delStaff = async (id) => {
    try {
      await StaffService.remove(id, token).then((res) => {
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
      id: "",
      img_url: "",
      name: "",
      surname: "",
      email: "",
      experience: "",
    });
  };

  return (
    <>
      <ButtonM variant="contained" color="primary" onClick={handleClick}>
        Add new staffs
      </ButtonM>
      <h2 className="header">Current Staffs</h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{ fontSize: "17px", padding: "1%" }}
                align="center"
              >
                Image
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "17px", padding: "1%" }}
                align="right"
              >
                Name
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "17px", padding: "2.2%" }}
                align="right"
              >
                Username
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "17px", padding: "2.2%" }}
                align="right"
              >
                Email
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "17px", padding: "2.2%" }}
                align="right"
              >
                Experience
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "17px", padding: "2.2%" }}
                align="right"
              >
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((demo, index) => (
              <StyledTableRow key={index} style={{ fontSize: "17px" }} hover>
                <StyledTableCell component="th" scope="row">
                  <Image className="img" src={demo.img_url} rounded />
                </StyledTableCell>
                <StyledTableCell align="right" style={{ fontSize: "17px" }}>
                  {demo.name}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ fontSize: "17px" }}>
                  {demo.surname}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ fontSize: "17px" }}>
                  {demo.email}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ fontSize: "17px" }}>
                  {demo.experience}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => delStaff(demo.id)}>
                    <DeleteIcon fontSize="inherit" color="error" />
                  </IconButton>
                  <IconButton onClick={() => handleEdit(demo.id)}>
                    <EditIcon
                      fontSize="default"
                      style={{ color: "green", marginLeft: "15%" }}
                    />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <StaffModal
        one={oneD}
        handleClose={handleClose}
        addData={addData}
        window={a}
        setImageUrl={setImageUrl}
        notEdit={handleNotEdit}
        btnName={btn}
      />
    </>
  );
};

export default StaffForm;
