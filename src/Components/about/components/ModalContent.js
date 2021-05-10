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
    outline: "none",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "12px",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingTop: "30px",
  },
}));

const ModalContent = ({
  window,
  handleClose,
  addData,
  one,
  notEdit,
  setImageUrl,
}) => {
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(undefined);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  const handleClear = () => {
    setImage(undefined);
    setTitle("");
    setText("");
  };

  useEffect(() => {
    setImage(one.image);
    setTitle(one.title);
    setText(one.text);
  }, [one]);

  const handleOnClose = () => {
    handleClear();
    handleClose(false);
    notEdit("aaaaaaaaaaaaaaaaa");
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
          timeout: 500,
        }}
      >
        <Fade in={window} style={{ width: "1000px", height: "530px" }}>
          <div className={classes.paper}>
            <h2 style={{ color: "indigo" }}>Add Data</h2>
            <form className={classes.root} noValidate autoComplete="off">
              <div className="form-group ">
                <label className="label">Title</label>
                <input
                  type="text"
                  placeholder="Title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                />{" "}
                <br />
                <label className="label">Text</label>
                <textarea
                  className="form-control"
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                  placeholder="Text..."
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
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
                  Add Data
                </Button>
              </footer>
            </form>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalContent;
