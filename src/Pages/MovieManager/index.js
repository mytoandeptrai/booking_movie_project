import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
//Modal for addding course
import ModalAddCourse from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
//table ant design
import { Space, Table } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachPhimApiAction,
  xoaPhimAction,
} from "../../redux/Movies/movie.actions";
import Loading from "./../../components/Loading/Loading";
import SearchMovie from "./../../components/SearchMovie";
import ModalThemPhim from "./../../components/ModalThemPhim";
import "./style.css";

const MovieManager = () => {
  const dispatch = useDispatch();
  const danhSachPhim = useSelector((state) => state.moviesData.danhSachPhim);
  const danhSachPhimFilter = useSelector(
    (state) => state.moviesData.phimTimKiem
  );
  const infoUser = useSelector((state) => state.usersData.infoUser);
  //creat Loading table
  const [done, setDone] = useState(undefined);
  useEffect(() => {
    setTimeout(() => {
      dispatch(layDanhSachPhimApiAction());
      setDone(true);
    }, 1800);
  }, [done]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // action--------------------------------------------------
  // deletePhim
  const deleteMoive = (maPhim) => {
    dispatch(xoaPhimAction(maPhim, setDone));
  };
  // Edit movie
  const [movieEdited, setMovieEdited] = useState(null);
  const editMovie = (movie) => {
    setOpen(true);
    settitle(false);
    setMovieEdited(movie);
  };
  //Add Movie
  const addMovie = () => {
    setOpen(true);
    settitle(true);
  };
  //column and data table
  const columns = [
    {
      title: "Tên Phim",
      dataIndex: "tenPhim",
      key: "tenPhim",
      render: (tenPhim) => (
        <>
          <p>{tenPhim}</p>
        </>
      ),
    },
    {
      title: "Hình Ảnh",
      dataIndex: "hinhAnh",
      key: "hinhAnh",
      responsive: ["sm"],
      render: (hinhAnh) => (
        <>
          <img src={hinhAnh} alt="hinhAnh" width="100px" height="100px" />
        </>
      ),
    },
    {
      title: "Ngày khởi chiếu",
      dataIndex: "ngayKhoiChieu",
      key: "ngayKhoiChieu",
      responsive: ["lg"],
      render: (ngayKhoiChieu) => (
        <p>{moment(ngayKhoiChieu).format("YYYY-MM-DD")}</p>
      ),
    },
    {
      title: "Mô tả",
      key: "moTa",
      dataIndex: "moTa",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            className="text-warning"
            onClick={() => {
              editMovie(text);
            }}
          >
            Sửa
          </a>
          <a
            className="text-danger"
            onClick={() => {
              deleteMoive(text.maPhim);
            }}
          >
            Xóa
          </a>
        </Space>
      ),
    },
  ];
  var data = danhSachPhim;
  if (danhSachPhimFilter !== null) {
    data = danhSachPhimFilter;
  }
  const [more, setMore] = React.useState(false);
  const [dataModal, setDataModal] = useState(null);
  const showModal = (maPhim) => {
    setMore(true);
    setDataModal(maPhim);
  };
  const handleCancel = (e) => {
    setMore(false);
  };
  const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));
  const classes = useStyles();
  const [title, settitle] = useState(true);
  return (
    <>
      <div className="container-fluid">
        <div className="row d-flex justify-content-center">
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
            <div className="bg-card bg-card1">
              <div className="bg-text">
                <h3>500+</h3>
                <span>Bộ Phim</span>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
            <div className="bg-card bg-card2">
              <div className="bg-text">
                <h3>100+</h3>
                <span>Rạp phim</span>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12 col-12 cardItem">
            <div className="bg-card bg-card3">
              <div className="bg-text">
                <h3>1000+</h3>
                <span>Ghế Ngồi</span>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-10">
            <SearchMovie />
          </div>
          <div className="col-lg-2 justify-content-center d-flex">
            <button
              className="btnAddCourse"
              onClick={() => {
                addMovie();
              }}
            >
              Thêm khóa học
            </button>
            <ModalAddCourse
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <Fade in={open}>
                <div className={classes.paper}>
                  <ModalThemPhim
                    title={title}
                    handleClose={handleClose}
                    taiKhoan={infoUser}
                    setDone={setDone}
                    movieEdited={movieEdited}
                  />
                </div>
              </Fade>
            </ModalAddCourse>
          </div>
        </div>
        <div>
          {!done ? (
            <Loading />
          ) : (
            <Table
              columns={columns}
              dataSource={data}
              pagination={{
                total: data?.length,
                pageSize: 5,
                hideOnSinglePage: true,
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default MovieManager;
