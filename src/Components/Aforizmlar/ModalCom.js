/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid indigo",
    borderRadius: "10px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingTop: "30px",
  },
}));

const ModalCom = ({
  window,
  handleClose,
  addData,
  one,
  notEdit,
  setImageUrl,
  btnName,
}) => {
  const classes = useStyles();

  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleClear = () => {
    setImageUrl(undefined);
    setTitle("");
    setText("");
  };

  useEffect(() => {
    setImageUrl(one.image);
    setTitle(one.title);
    setText(one.text);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [one]);

  const handleOnClose = () => {
    handleClear();
    handleClose(false);
    notEdit("qqqqqqqqqqqqqqqqqqqqqqqq");
  };

  const ddd = (e) => {
    setImageUrl(e.target.files[0]);
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={window}
        onClose={handleOnClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 1000,
        }}
      >
        <Fade in={window} style={{ width: "1000px", height: "530px" }}>
          <div className={classes.paper}>
            <h2 style={{ color: "indigo" }}>Add Aforizm</h2>
            <form
              className={classes.root}
              noValidate
              autoComplete="off"
              encType="multipart/form-data"
            >
              <div className="form-group ">
                <label className="label">Title</label>
                <input
                  type="text"
                  placeholder="Enter Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                />
                <label className="label">Text</label>
                <input
                  type="text"
                  placeholder="Enter Text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group ">
                <label className="label">Image</label>
                <br />
                <input type="file" name="file" onChange={ddd} />
              </div>
              <footer className="footerBtn">
                <Button
                  variant="contained"
                  className="mx-4"
                  color="secondary"
                  onClick={handleOnClose}
                >
                  Close
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    addData({ title, text });
                    handleClear();
                  }}
                >
                  {btnName}
                </Button>
              </footer>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalCom;
