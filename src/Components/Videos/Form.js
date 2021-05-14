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

  const [btn, setBtn] = useState("");

  const [oneD, setOneD] = useState({
    id: "",
    img_url: "",
    title: "",
    text: "",
    Url: "",
  });

  useEffect(() => {
    TutorialService.getAll().then((res) => setData(res.data));
  }, [isActive]);

  useEffect(() => {
    let t = window.localStorage.getItem("token");
    setToken(t);
  }, []);

  const handleClick = () => {
    setBtn("Add Video");
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
        formData.append("text", data.text);
        formData.append("Url", data.Url);

        await TutorialService.update(isEdit, formData, token).then((res) => {
          setIsActive(!isActive);
        });
        setA(false);
        setIsEdit(0);
      } else {
        let formData = new FormData();

        console.log(data);

        formData.append("file", imageUrl);
        formData.append("title", data.title);
        formData.append("text", data.text);
        formData.append("Url", data.Url);

        TutorialService.create(formData, token).then((res) => {
          setIsActive(!isActive);
        });
        setA(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (id) => {
    setBtn("Edit Video");
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

  const handleNotEdit = (a) => {
    setIsEdit(0);
    setOneD({
      id: "",
      img_url: "",
      title: "",
      text: "",
      Url: "",
    });
  };

  return (
    <>
      <button
        onClick={handleClick}
        style={{ backgroundColor: "indigo" }}
        className="btn btn-success px-4"
      >
        Add Video
      </button>
      <h2 className="header">All Videos</h2>

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
                style={{ fontSize: "20px", padding: "1%" }}
                align="center"
              >
                Text
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "20px", padding: "1%", paddingLeft: "2%" }}
                align="center"
              >
                Videos
              </StyledTableCell>
              <StyledTableCell
                style={{ fontSize: "20px", padding: "2.2%" }}
                align="center"
              >
                Actions
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((getItem, id) => {
              var add=getItem.Url.toString()
              return(
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
                <StyledTableCell align="center" style={{ fontSize: "25px" }}>
                  {getItem.title}
                </StyledTableCell>
                <StyledTableCell align="left" style={{ fontSize: "20px" }}>
                  {getItem.text}
                </StyledTableCell>
                <StyledTableCell align="center" >
                <div dangerouslySetInnerHTML={{__html: add}} />
                  
                </StyledTableCell>
                <StyledTableCell
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "nowrap",
                    marginTop: "70px",
                  }}
                >
                  <IconButton align="center">
                    <DeleteIcon
                      onClick={() => deleteIcon(getItem.id)}
                      fontSize="large"
                      color="error"
                    />
                  </IconButton>
                  <IconButton align="center">
                    <EditIcon
                      onClick={() => handleEdit(getItem.id)}
                      fontSize="large"
                      style={{ color: "green" }}
                    />
                  </IconButton>
                </StyledTableCell>
              </StyledTableRow>
              )
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
        btnName={btn}
        window={a}
      />
    </>
  );
}

export default Form;
