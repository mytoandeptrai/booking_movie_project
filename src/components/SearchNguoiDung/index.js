import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { timKiemNguoiDungAction } from "../../redux/User/user.actions";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "2px 4px",
    display: "flex",
    alignItems: "center",
    width: "100%",
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));
const SearchNguoiDung = (props) => {
  //state từ khóa
  const [tuKhoa, setTuKhoa] = useState(null);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);
  const clearText = () => {
    setTuKhoa("");
  };
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(timKiemNguoiDungAction(tuKhoa, props.loading));
    clearText();
  };
  const handleChange = (e) => {
    setTuKhoa(e.target.value);
  };
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <>
      {" "}
      <Paper component="form" className={classes.root} onSubmit={handleSubmit}>
        <IconButton
          className={classes.iconButton}
          aria-label="menu"
          ref={anchorRef}
          aria-controls={open ? "menu-list-grow" : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
        ></IconButton>
        <InputBase
          className={classes.input}
          placeholder="Tìm kiếm người dùng"
          inputProps={{ "aria-label": "Tìm kiếm người dùng" }}
          onChange={handleChange}
          name="tuKhoa"
          value={tuKhoa}
        />
        <IconButton
          type="submit"
          className={classes.iconButton}
          aria-label="search"
        >
          <SearchIcon />
        </IconButton>
      </Paper>
    </>
  );
};

export default SearchNguoiDung;
