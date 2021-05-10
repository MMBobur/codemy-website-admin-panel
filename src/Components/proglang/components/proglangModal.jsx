import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import "../proglangStyle.css";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    // border: "2px solid indigo",
    borderRadius: "10px",
    
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingTop: "30px",
  },
}));

const ProglangModal = ({
  window,
  handleClose,
  addData,
  one,
  notEdit,
  setImageUrl,
  valBtn,
}) => {
  const classes = useStyles();
  const [img_title, setImg_title] = useState("");
  const [text, setText] = useState("");
  const handleClear = () => {
    setImg_title("");
    setText("");
  };

  useEffect(() => {
    setImg_title(one.img_title);
    setText(one.text);
  }, [one]);

  const handleOnClose = () => {
    handleClear();
    handleClose(false);
    notEdit("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  };

  const addfile = (e) => {
    setImageUrl(e.target.files[0]);
  };
  return (
    <>
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
        <Fade in={window}>
          <div className={classes.paper}>
            <h2 style={{ color: "indigo" }}>Add Proglang</h2>
            <form className={classes.root} noValidate autoComplete="off">
              <div className="form-group ">
                <label className="label">Name</label>
                <input
                  type="text"
                  placeholder="Enter title"
                  value={img_title}
                  onChange={(e) => setImg_title(e.target.value)}
                  className="form-control"
                />
                <textarea
                  name=""
                  id=""
                  cols="100"
                  rows="10"
                  placeholder="Enter Text(About)"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                ></textarea>
                <input
                  type="file"
                  onChange={addfile}
                  className="form-control border-0"
                />
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
                    addData({ img_title, text })
                    handleClear()
                  }}
                >
                  {valBtn}
                </Button>
              </footer>
            </form>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default ProglangModal;
