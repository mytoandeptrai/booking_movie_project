import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//import form MaterialUI
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import CloudUploadOutlinedIcon from "@material-ui/icons/CloudUploadOutlined";
// dropzone
import { useDropzone } from "react-dropzone";
import "./style.scss";
import {
  suaPhimAction,
  themKhoaHocAction,
  themPhimAction,
} from "../../redux/Movies/movie.actions";
import { DatePicker } from "antd";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "80ch",
    },
  },
  grid: {
    flexGrow: 1,
    width: "100",
  },
  gridItem: {
    margin: "15px 0",
    display: "flex",
    justifyContent: "center",
  },
  dropzone: {
    margin: "15px 0",
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
  title: {
    margin: "5px 0",
  },
  formControl: {
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
const ModalThemPhim = (props) => {
  console.log(props);
  const dispatch = useDispatch();
  const title = props.title;
  const classes = useStyles();
  const movieEdited = props.movieEdited;
  const taiKhoan = props.taiKhoan;
  const setDone = props.setDone;
  const [thongTinPhim, setthongTinPhim] = useState({
    maPhim: "",
    tenPhim: "",
    biDanh: "",
    trailer: "",
    hinhAnh: "",
    moTa: "",
    maNhom: "GP01",
    ngayKhoiChieu: "",
    danhGia: "",
  });
  useEffect(() => {
    if (movieEdited) {
      setthongTinPhim({
        maPhim: movieEdited.maPhim,
        tenPhim: movieEdited.tenPhim,
        biDanh: movieEdited.biDanh,
        trailer: movieEdited.trailer,
        hinhAnh: "",
        moTa: movieEdited.moTa,
        maNhom: "GP01",
        ngayKhoiChieu: movieEdited.ngayKhoiChieu,
        danhGia: movieEdited.danhGia,
      });
    }
    if (title) {
      setthongTinPhim({
        maPhim: "",
        tenPhim: "",
        biDanh: "",
        trailer: "",
        hinhAnh: "",
        moTa: "",
        maNhom: "GP01",
        ngayKhoiChieu: "",
        danhGia: "",
      });
    }
  }, [movieEdited]);
  const handleChange = (event) => {
    const { value, name } = event.target;
    if (name === "hinhAnh") {
      setthongTinPhim({
        ...thongTinPhim,
        hinhAnh: event.target.files[0],
      });
    } else {
      setthongTinPhim({
        ...thongTinPhim,
        [name]: value,
      });
    }
  };
  const handleClear = () => {
    setthongTinPhim({
      maPhim: "",
      tenPhim: "",
      biDanh: "",
      trailer: "",
      hinhAnh: "",
      moTa: "",
      maNhom: "GP01",
      ngayKhoiChieu: "",
      danhGia: "",
    });
    props.handleClose();
  };
  const handleSubmit = () => {
    if (title === true) {
      dispatch(themPhimAction(thongTinPhim, setDone));
      handleClear();
    } else {
      dispatch(suaPhimAction(thongTinPhim, setDone));
      handleClear();
    }
  };
  const onDrop = useCallback((acceptedFiles) => {
    // Do something with the files
    const imageUpload = acceptedFiles[0];
    setthongTinPhim({ hinhAnh: imageUpload });
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return (
    <>
      <form
        className={classes.root}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <Grid container className={classes.grid} spacing={1}>
          <Grid item xs={12} className={classes.title}>
            <h3 className="text-center">{title ? "Thêm phim" : "Sửa phim"}</h3>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Tên Phim"
              variant="outlined"
              onChange={handleChange}
              name="tenPhim"
              value={thongTinPhim.tenPhim}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Mã Phim"
              variant="outlined"
              onChange={handleChange}
              name="maPhim"
              value={thongTinPhim.maPhim}
            />
          </Grid>

          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Bí danh"
              variant="outlined"
              name="biDanh"
              onChange={handleChange}
              value={thongTinPhim.biDanh}
            />
          </Grid>

          <Grid item xs={12} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Mô tả"
              variant="outlined"
              onChange={handleChange}
              name="moTa"
              value={thongTinPhim.moTa}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Trailer"
              variant="outlined"
              onChange={handleChange}
              name="trailer"
              value={thongTinPhim.trailer}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="outlined-basic"
              label="Đánh giá"
              variant="outlined"
              onChange={handleChange}
              name="danhGia"
              value={thongTinPhim.danhGia}
            />
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <TextField
              id="date"
              label="Ngày Khởi Chiếu"
              type="date"
              defaultValue="2017-05-24"
              variant="outlined"
              onChange={handleChange}
              name="ngayKhoiChieu"
              value={thongTinPhim.ngayKhoiChieu}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} className={classes.dropzone}>
            <div className="container">
              <h4 className="text-center">Upload hình ảnh</h4>
              <div className="dropzone_css">
                <CloudUploadOutlinedIcon />
                <input
                  type="file"
                  onChange={handleChange}
                  name="hinhAnh"
                  className="btn"
                />
                {isDragActive ? <p>Kéo thả file vào đây</p> : ""}
              </div>
            </div>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                handleSubmit();
              }}
            >
              {title ? "Thêm phim" : "Sửa phim"}
            </Button>
          </Grid>
          <Grid item xs={6} className={classes.gridItem}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                handleClear();
              }}
            >
              Thoát
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default ModalThemPhim;
