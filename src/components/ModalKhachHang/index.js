import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Grid from "@material-ui/core/Grid";
//Form
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import { makeStyles } from "@material-ui/core/styles";
// Modal
import { Modal } from "antd";
//Thư viện formik
import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import swal from "sweetalert";
//Thư viện yub (validate form)
import * as Yup from "yup";
import {
  suaNguoiDungAction,
  themNguoiDungAction,
} from "../../redux/User/user.actions";

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
const ModalKhachHang = ({
  title,
  handleClose,
  setDone,
  userEdit,
  handleCancelModal,
  isModalVisible,
}) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [thongTinUser, setThongTinUser] = useState({
    taiKhoan: "",
    matKhau: "",
    hoTen: "",
    soDT: "",
    maNhom: "GP01",
    email: "",
    maLoaiNguoiDung: "",
  });
  const validationSchema = Yup.object().shape({
    // Validate form field
    taiKhoan: Yup.string()
      .required("Không được bỏ trống")
      .min(5, "Có ít nhất 5 ký tự"),
    email: Yup.string().required("Không được bỏ trống").email("Không hợp lệ"),
    hoTen: Yup.string()
      .required("Không được bỏ trống")
      .min(8, "Có ít nhất 8 ký tự"),
    soDT: Yup.string().required("Không được bỏ trống"),
    matKhau: Yup.string()
      .required("Không được bỏ trống")
      .min(8, "Có ít nhất 8 ký tự"),
    maLoaiNguoiDung: Yup.string().required("Không được bỏ trống"),
  });

  const handleSubmit = (values) => {
    console.log(values);
    const resetForm = () => {
      values.taiKhoan = "";
      values.hoTen = "";
      values.soDT = "";
      values.matKhau = "";
      values.email = "";
      values.maLoaiNguoiDung = "";
    };
    if (
      values.email === "" ||
      values.hoTen === "" ||
      values.maLoaiNguoiDung === "" ||
      values.matKhau === "" ||
      values.soDT === "" ||
      values.taiKhoan === ""
    ) {
      swal("Oops!", "Bạn cần phải nhập đầy đủ thông tin vào form!", "error");
      handleCancelModal();
    } else {
      if (title === true) {
        dispatch(themNguoiDungAction(values, setDone, resetForm));
        handleCancelModal();
      } else {
        dispatch(suaNguoiDungAction(values, setDone, resetForm));
        handleCancelModal();
      }
    }
  };
  const initialValues = title
    ? thongTinUser
    : {
        ...userEdit,
        matKhau: "",
        maNhom: "GP01",
        soDT: userEdit.soDt,
      };
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        enableReinitialize
      >
        {(formilkProps) => {
          let { values, errors, touched } = formilkProps;
          console.log(formilkProps.initialValues);
          return (
            <>
              <Modal
                title={title ? "Thêm người dùng" : "Sửa người dùng"}
                visible={isModalVisible}
                onOk={() => handleSubmit(formilkProps.values)}
                onCancel={handleCancelModal}
                okText={title ? "Thêm" : "Sửa"}
                cancelText="Hủy bỏ"
              >
                <Form>
                  <Grid container justify="center" alignContent="center">
                    <Grid className="mr-3" item xs={5} md={5}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.taiKhoan &&
                          !!formilkProps.errors.taiKhoan
                        }
                      >
                        <InputLabel>Tài khoản</InputLabel>
                        <Field
                          name="taiKhoan"
                          render={({ field }) => (
                            <Input
                              fullWidth
                              {...field}
                              value={formilkProps.values.taiKhoan}
                              onChange={formilkProps.handleChange}
                            />
                          )}
                        />
                        {formilkProps.touched.taiKhoan && (
                          <FormHelperText>
                            {formilkProps.errors.taiKhoan}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.hoTen &&
                          !!formilkProps.errors.hoTen
                        }
                      >
                        <InputLabel>Họ tên</InputLabel>
                        <Field
                          name="hoTen"
                          render={({ field }) => (
                            <Input
                              fullWidth
                              {...field}
                              name="hoTen"
                              value={formilkProps.values.hoTen}
                              onChange={formilkProps.handleChange}
                            />
                          )}
                        />
                        {formilkProps.touched.hoTen && (
                          <FormHelperText>
                            {formilkProps.errors.hoTen}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>

                    <Grid item xs={5} md={5}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.matKhau &&
                          !!formilkProps.errors.matKhau
                        }
                      >
                        <InputLabel>Mật khẩu</InputLabel>
                        <Field
                          name="matKhau"
                          render={({ field }) => (
                            <Input
                              fullWidth
                              type="password"
                              {...field}
                              name="matKhau"
                              value={formilkProps.values.matKhau}
                              onChange={formilkProps.handleChange}
                            />
                          )}
                        />
                        {formilkProps.touched.matKhau && (
                          <FormHelperText>
                            {formilkProps.errors.matKhau}
                          </FormHelperText>
                        )}
                      </FormControl>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.soDT &&
                          !!formilkProps.errors.soDT
                        }
                      >
                        <InputLabel>Số điện thoại</InputLabel>
                        <Field
                          name="soDT"
                          render={({ field }) => (
                            <Input
                              fullWidth
                              type="phoneNumber"
                              {...field}
                              name="soDT"
                              value={formilkProps.values.soDT}
                              onChange={formilkProps.handleChange}
                            />
                          )}
                        />
                        {formilkProps.touched.soDT && (
                          <FormHelperText>
                            {formilkProps.errors.soDT}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} md={10}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.email &&
                          !!formilkProps.errors.email
                        }
                      >
                        <InputLabel>Email</InputLabel>
                        <Field
                          name="email"
                          render={({ field }) => (
                            <Input
                              fullWidth
                              {...field}
                              name="email"
                              value={formilkProps.values.email}
                              onChange={formilkProps.handleChange}
                            />
                          )}
                        />
                        {formilkProps.touched.email && (
                          <FormHelperText>
                            {formilkProps.errors.email}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                    <Grid item xs={10} md={10}>
                      <FormControl
                        fullWidth
                        margin="normal"
                        error={
                          formilkProps.touched.maLoaiNguoiDung &&
                          !!formilkProps.errors.maLoaiNguoiDung
                        }
                      >
                        <InputLabel>Chức danh</InputLabel>
                        <Field
                          render={({ field }) => (
                            <Select
                              displayEmpty
                              {...field}
                              name="maLoaiNguoiDung"
                              value={formilkProps.values.maLoaiNguoiDung}
                              onChange={formilkProps.handleChange}
                            >
                              <MenuItem value="KhachHang">Khách hàng</MenuItem>
                              <MenuItem value="QuanTri">Quản trị</MenuItem>
                            </Select>
                          )}
                        />
                        {formilkProps.touched.maLoaiNguoiDung && (
                          <FormHelperText>
                            {formilkProps.errors.maLoaiNguoiDung}
                          </FormHelperText>
                        )}
                      </FormControl>
                    </Grid>
                  </Grid>
                </Form>
              </Modal>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export default ModalKhachHang;
