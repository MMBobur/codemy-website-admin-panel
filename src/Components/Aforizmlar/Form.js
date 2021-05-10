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
import ModalCom from "./ModalCom";
import Config from "./Config";

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

const AfoForm = () => {
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
    title: "",
    text: "",
  });

  useEffect(() => {
    Config.getAll().then((res) => setData(res.data));
  }, [isActive]);

  useEffect(() => {
    let t = window.localStorage.getItem("token");
    setToken(t);
  }, []);

  const handleClick = () => {
    setBtn("Add Aforizm");
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
        formData.append("title", data.title);
        formData.append("text", data.text);

        await Config.update(isEdit, formData, token).then((res) => {
          setIsActive(!isActive);
        });
        setA(false);
        setIsEdit(0);
      } else {
        let formData = new FormData();

        formData.append("file", imageUrl);
        formData.append("title", data.title);
        formData.append("text", data.text);

        Config.create(formData, token).then((res) => {
          setIsActive(!isActive);
        });
        setA(false);
      }
    } catch (error) {
      console.log(error, "bu error-ku!!");
    }
  };

  const handleEdit = (id) => {
    setBtn("Edit Aforizm");
    try {
      setIsEdit(id);
      const oneData = data.filter((val) => {
        return val.id === id;
      });
      setOneD(oneData[0]);
      setA(true);
    } catch (error) {
      console.log(error, "bu error-ku!!");
    }
  };

  const handleDel = async (id) => {
    try {
      await Config.remove(id, token).then((res) => {
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
      title: "",
      text: "",
    });
  };

  return (
    <div>
      <ButtonM variant="contained" color="primary" onClick={handleClick}>
        Add new Aforizm
      </ButtonM>
      <h2 className="header">Aforizms</h2>
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
                Title
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "17px", padding: "2.2%" }}
                align="right"
              >
                Text
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
                  {demo.title}
                </StyledTableCell>
                <StyledTableCell align="right" style={{ fontSize: "17px" }}>
                  {demo.text}
                </StyledTableCell>
                <StyledTableCell align="right">
                  <IconButton onClick={() => handleDel(demo.id)}>
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
      <ModalCom
        one={oneD}
        handleClose={handleClose}
        addData={addData}
        window={a}
        setImageUrl={setImageUrl}
        notEdit={handleNotEdit}
        btnName={btn}
      />
    </div>
  );
};

export default AfoForm;
