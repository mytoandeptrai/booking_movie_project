import { makeStyles } from "@material-ui/core/styles";
import { Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  layDanhSachNguoiDungAction,
  xoaNguoiDungAction
} from "../../redux/User/user.actions";
import Loading from "./../../components/Loading/Loading";
import ModalNguoiDung from "./../../components/ModalNguoiDung";
import ModalSuaNguoiDung from "./../../components/ModalSuaNguoiDung";
import SearchNguoiDung from "./../../components/SearchNguoiDung";
import "./style.css";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      marginTop: theme.spacing(2),
    },
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));
const CustomerManager = () => {
  const dispatch = useDispatch();
  //Modal add user
  const [visible, setVisible] = React.useState(false);
  //Modal edit
  const [edit, setedit] = React.useState(false);
  const [dataEdit, setDataEdit] = useState(null);
  //Modal course
  const [more, setMore] = React.useState(false);
  // function show all modal
  const showModal = (status, data) => {
    if (status === 1) {
      setVisible(true);
    } else if (status === 0) {
      setedit(true);
    } else if (status === 2) {
      setMore(true);
      // setDataModal(data);
    }
  };
  // function Close all modal
  const handleCancel = (e) => {
    setVisible(false);
    setedit(false);
    setMore(false);
  };
  //---------------------------Reducer-------------------------------------//
  // Get user List
  const danhSachNguoiDung = useSelector(
    (state) => state.usersData.listCustomer
  );
  // get user search
  const danhSachNguoiDungSearch = useSelector(
    (state) => state.usersData.listCustomerSearch
  );
  //creat Loading table
  const [done, setDone] = useState(undefined);
  //dispatch và useEffect

  useEffect(() => {
    setTimeout(() => {
      dispatch(layDanhSachNguoiDungAction());
      setDone(true);
    }, 1800);
  }, [done]);
  const [dataModal, setDataModal] = useState(null);
  //data of table user
  const columns = [
    {
      title: "Tài Khoản",
      dataIndex: "taiKhoan",
      key: "taiKhoan",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Họ tên",
      dataIndex: "hoTen",
      key: "hoTen",
      width: 200,
      responsive: ["sm"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      responsive: ["lg"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "soDt",
      key: "soDt",
      responsive: ["lg"],
    },
    {
      title: "Loại người dùng",
      key: "maLoaiNguoiDung",
      dataIndex: "maLoaiNguoiDung",
      render: (maLoaiNguoiDung) => (
        <>
          <Tag
            color={maLoaiNguoiDung === "KhachHang" ? "red" : "green"}
            className="d-flex justify-content-center w-50"
          >
            {maLoaiNguoiDung}
          </Tag>
        </>
      ),
      filters: [
        {
          text: "Khách hàng",
          value: "KhachHang",
        },
        {
          text: "Quản trị",
          value: "QuanTri",
        },
      ],
      onFilter: (value, record) => record.maLoaiNguoiDung.indexOf(value) === 0,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            target="__blank"
            className="text-warning"
            onClick={() => {
              showModal(0, text);
              setDataEdit(text);
            }}
          >
            Sửa
          </a>
          <a className="text-danger" onClick={() => deleteUser(text.taiKhoan)}>
            Xóa
          </a>
        </Space>
      ),
    },
  ];
  var data = danhSachNguoiDung;
  if (danhSachNguoiDungSearch === null) {
    data = danhSachNguoiDung;
  } else {
    data = danhSachNguoiDungSearch;
  }

  //------------------------------UserAction----------------------------------//
  // Delete User
  const deleteUser = (taiKhoan) => {
    dispatch(xoaNguoiDungAction(taiKhoan, setDone));
  };

  return (
    <>
      <div className="container-fluid">
        <div className="form_admin">
          <div className="row">
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
          <div className="row mt-2 justify-content-center">
            <div className="col-lg-10">
              <SearchNguoiDung loading={setDone} />
            </div>
            <div className="col-lg-2 justify-content-center d-flex">
              <button
                className="btnAddUser"
                onClick={() => {
                  showModal(1);
                }}
              >
                Thêm người dùng
              </button>
            </div>
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
                pageSize: 7,
                hideOnSinglePage: true,
              }}
            />
          )}
        </div>
      </div>
      <ModalNguoiDung
        visible={visible}
        handleCancel={handleCancel}
        setDone={setDone}
      />
      <ModalSuaNguoiDung
        visible={edit}
        dataEdit={dataEdit}
        handleCancel={handleCancel}
        setDone={setDone}
      />
    </>
  );
};

export default CustomerManager;
