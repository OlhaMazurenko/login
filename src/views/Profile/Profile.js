import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { connect } from "react-redux";
import Modal from "@material-ui/core/Modal";
import { Formik } from "formik";
import { editProfile } from "../../api/requests/me";
import { toast } from "react-toastify";
import { getProfileAction } from "../../store/actions/me";

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const MediaCard = props => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  if (!props.me || !props.me.data || !props.me.data.avatar) {
    return null;
  }

  const editHandler = () => {
    setShowEditProfileModal(true);
  };

  const closeEditProfileModal = () => {
    setShowEditProfileModal(false);
  };

  const submitHandler = values => {
    const data = {
      name: values.name
    };
    editProfile(props.me.data.id, data)
      .then(response => {
        toast.success(`Edited successfully`);
      })
      .then(() => {
        props.getProfileAction();
      })
      .then(() => {
        setShowEditProfileModal(false);
      })
      .catch(error => {
        toast.success(`You can't do it now`);
      });
  };

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <Formik
        initialValues={{
          name: props.me.data.first_name
        }}
        onSubmit={submitHandler}
      >
        {props => {
          const {
            values,
            touched,
            errors,
            dirty,
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
            handleReset
          } = props;
          return (
            <form
              onSubmit={handleSubmit}
              className="form"
              style={{
                display: "flex",
                flexDirection: "column",
                maxWidth: "400px",
                padding: "40px",
                justifyContent: "space-between",
                height: "200px"
              }}
            >
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
              />
              <button type="submit" onClick={handleSubmit}>
                Save 
              </button>
            </form>
          );
        }}
      </Formik>
    </div>
  );

  return (
    <React.Fragment>
      <Modal
        open={showEditProfileModal}
        onClose={closeEditProfileModal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>

      <DIV>
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image={props.me.data.avatar}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {`${props.me.data.first_name} ${props.me.data.last_name}`}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {props.me.data.email}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions className="profile-buttoms">
            <Button size="small" color="primary">
              Share
            </Button>
            <Button
              size="small"
              color="primary"
              onClick={() => editHandler(props.me.data)}
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      </DIV>
    </React.Fragment>
  );
};

const DIV = styled.div`
  margin-top: 40px;
  .profile-buttoms {
    justify-content: space-between;
  }

  .modal-data {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  input {
    border: 1px solid red;
  }
`;

const mapStateToProps = state => {
  return {
    me: state.me.me
  };
};

const mapDispatchToProps = {
  getProfileAction
};
export default connect(mapStateToProps, mapDispatchToProps)(MediaCard);
