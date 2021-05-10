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
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingTop: "10px",
  },
  foot: {
    marginTop: "40px",
    float: "right",
  },
  label: {
    fontSize: "20px",
    color: "indigo",
    paddingTop: "20px",
    paddingBottom: "5px",
  },
}));

function ModalComponent({
  window,
  handleClose,
  addData,
  one,
  notEdit,
  setImageUrl,
  btnName,
}) {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = useState(undefined);
  const [text, setText] = useState("");
  const [Url, setUrl] = useState("");

  const handleClear = () => {
    setTitle("");
    setImg(undefined);
    setText("");
    setUrl("");
  };

  useEffect(() => {
    setTitle(one.title);
    setImg(one.img);
    setText(one.text);
    setUrl(one.Url);
  }, [one]);

  const handleOnClose = () => {
    handleClear();
    handleClose(false);
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
        <Fade in={window} style={{ width: "1100px", height: "700px" }}>
          <div className={classes.paper}>
            <h2 style={{ color: "indigo" }}>Add Video</h2>
            <form className={classes.root} noValidate autoComplete="off">
              <div className="form-group ">
                <label className={classes.label}>Title</label>
                <input
                  type="text"
                  value={title}
                  placeholder="Enter Title"
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group ">
                <label className={classes.label}>Text</label>
                <input
                  type="text"
                  value={text}
                  placeholder="Enter Text"
                  onChange={(e) => setText(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group ">
                <label className={classes.label}>Url</label>
                <input
                  type="text"
                  value={Url}
                  placeholder="Enter Url"
                  onChange={(e) => setUrl(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group ">
                <label className={classes.label}>Image</label>
                <br />
                <input type="file" name="file" onChange={ddd} />
              </div>

              <footer className={classes.foot}>
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
                    addData({ title, text, Url });
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
}

export default ModalComponent;
