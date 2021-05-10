import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Button from "@material-ui/core/Button";
import "../staffStyle.css";

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

const StaffModal = ({
  window,
  handleClose,
  addData,
  one,
  notEdit,
  setImageUrl,
  btnName,
}) => {
  const classes = useStyles();

  // eslint-disable-next-line no-unused-vars
  const [image, setImage] = useState(undefined);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [experience, setExperience] = useState("");

  const handleClear = () => {
    setImage(undefined);
    setName("");
    setSurname("");
    setEmail("");
    setExperience("");
  };

  useEffect(() => {
    setImage(one.image);
    setName(one.name);
    setSurname(one.surname);
    setEmail(one.email);
    setExperience(one.experience);
  }, [one]);

  const handleOnClose = () => {
    handleClear();
    handleClose(false);
    notEdit("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
  };

  const ddd = (e) => {
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
        <Fade in={window} style={{ width: "1000px", height: "700px" }}>
          <div className={classes.paper}>
            <h2 style={{ color: "indigo" }}>Add Staff</h2>
            <form className={classes.root} noValidate autoComplete="off">
              <div className="form-group ">
                <label className="label">Name</label>
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
                <label className="label">Surname</label>
                <input
                  type="text"
                  placeholder="Enter Surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                  className="form-control"
                />
                <label className="label">Email</label>
                <input
                  type="text"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="form-control"
                />
                <label className="label">Experience</label>
                <input
                  type="text"
                  placeholder="Enter Experience"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
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
                    addData({ name, surname, email, experience });
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
    </>
  );
};

export default StaffModal;
