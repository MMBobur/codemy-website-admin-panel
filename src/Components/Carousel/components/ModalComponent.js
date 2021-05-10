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
    border: "2px solid  indigo",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    paddingTop: "40px",

    borderRadius: "10px",
  },
  foot: {
    marginTop: "90px",
    float: "right",
  },
}));

function ModalComponent({
  window,
  handleClose,
  setImageUrl,
  addData,
  one,
  handleNotEdit,
}) {
  const classes = useStyles();

  const [title, setTitle] = useState("");

  const handleClear = () => {
    setTitle("");
    setImageUrl(undefined);
  };

  useEffect(() => {
    setTitle(one.title);
    setImageUrl(one.img_url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [one]);

  const handleOnClose = () => {
    handleClear();
    handleClose(false);
    handleNotEdit("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
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
        <Fade in={window} style={{ width: "1000px", height: "500px" }}>
          <div className={classes.paper}>
            <h2 style={{ color: "indigo" }}>Add Carousel</h2>
            <form className={classes.root} noValidate autoComplete="off">
              <div className="form-group ">
                <label
                  style={{
                    fontSize: "20px",
                    color: "indigo",
                    paddingTop: "20px",
                    paddingBottom: "5px",
                  }}
                >
                  Title
                </label>
                <input
                  placeholder="Enter Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="form-control"
                />
              </div>
              <div className="form-group ">
                <label
                  style={{
                    fontSize: "20px",
                    color: "indigo",
                    paddingTop: "20px",
                    paddingBottom: "5px",
                  }}
                >
                  Image
                </label>
                <br />
                <input
                  type="file"
                  name="file"
                  onChange={(e) => setImageUrl(e.target.files[0])}
                />
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
                    addData({ title });
                    handleClear();
                  }}
                >
                  Add
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
