import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import ModalComponent from "./components/ModalComponent";
import TutorialService from "./services/TutorialService";
import Table from "@material-ui/core/Table";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Image from "react-bootstrap/Image";
import { IconButton } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";

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
function Form() {
  const classes = useStyles();

  const [a, setA] = useState(false);
  const [data, setData] = useState([]);
  const [isActive, setIsActive] = useState(false);
  const [isEdit, setIsEdit] = useState(0);
  const [token, setToken] = useState("");
  const [imageUrl, setImageUrl] = useState(undefined);
  const [oneD, setOneD] = useState({ id: "", img_url: "", title: "" });

  useEffect(() => {
    TutorialService.getAll().then((res) => setData(res.data));
  }, [isActive]);

  useEffect(() => {
    let t = window.localStorage.getItem("token");
    setToken(t);
  }, []);

  const handleClick = () => {
    setA(true);
  };
  const handleClose = () => {
    setA(false);
  };
  const deleteIcon = async (id) => {
    try {
      await TutorialService.remove(id, token).then((res) => {
        setIsActive(!isActive);
      });
      setA(false);
    } catch (error) {
      console.log(error);
    }
  };
  const addData = async (data) => {
    try {
      if (isEdit > 0) {
        let formData = new FormData();

        formData.append("file", imageUrl);
        formData.append("title", data.title);

        await TutorialService.update(isEdit, formData, token).then((res) => {
          setIsActive(!isActive);
        });
        setA(false);
        setIsEdit(0);
      } else {
        let formData = new FormData();

        formData.append("file", imageUrl);
        formData.append("title", data.title);

        TutorialService.create(formData, token).then((res) => {
          setIsActive(!isActive);
        });
        setA(false);
      }
    } catch (error) {
      console.log(error, "bu error-ku!!");
    }
  };

  const handleEdit = (id) => {
    setIsEdit(id);
    const oneData = data.filter((val) => {
      return val.id === id;
    });
    setOneD(oneData[0]);
    setA(true);
  };
  const handleNotEdit = (a) => {
    setIsEdit(0);
    setOneD({
      id: "",
      img_url: "",
      title: "",
    });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        style={{ backgroundColor: "#303f9f" }}
        className="btn btn-primary px-4"
      >
        Add Item
      </button>
      <h2 className="header">Current Carousel</h2>
      <TableContainer component={Paper} className="my-3">
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell
                style={{ fontSize: "20px", padding: "2.2%" }}
                align="left"
              >
                Image
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "20px", padding: "1%" }}
                align="center"
              >
                Title
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "20px", padding: "2.2%" }}
                align="right"
              >
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((getItem, id) => {
              return (
                <StyledTableRow
                  key={getItem.id}
                  style={{ fontSize: "17px" }}
                  hover
                >
                  <StyledTableCell component="th" scope="row">
                    <Image
                      className="img"
                      align="center"
                      style={{ width: "150px" }}
                      src={getItem.img_url}
                      rounded
                    />
                  </StyledTableCell>
                  <StyledTableCell align="center" style={{ fontSize: "19px" }}>
                    {getItem.title}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <IconButton>
                      <DeleteIcon
                        onClick={() => deleteIcon(getItem.id)}
                        fontSize="default"
                        color="error"
                      />
                    </IconButton>
                    <IconButton>
                      <EditIcon
                        onClick={() => handleEdit(getItem.id)}
                        fontSize="default"
                        style={{ color: "green", marginLeft: "15%" }}
                      />
                    </IconButton>
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <ModalComponent
        one={oneD}
        handleNotEdit={handleNotEdit}
        handleClose={handleClose}
        addData={addData}
        setImageUrl={setImageUrl}
        window={a}
      />
    </div>
  );
}

export default Form;
