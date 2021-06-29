import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useHistory, Redirect } from "react-router-dom";
import * as yup from "yup";
import logo from "../../Assets/web-logo.png";
import { USER_LOGIN } from "../../Config/settings";
import { nguoiDungDangKyAction } from "../../redux/User/user.actions";
import "./style.scss";
const SignUp = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signUpUserSchema = yup.object().shape({
    taiKhoan: yup.string().required("*Trường này bắt buộc nhập"),
    matKhau: yup.string().required("*Trường này bắt buộc nhập"),
    hoTen: yup.string().required("*Trường này bắt buộc nhập"),
    email: yup
      .string()
      .required("*Trường này bắt buộc nhập")
      .email("*Email không hợp lệ"),
    soDt: yup
      .string()
      .required("*Trường này bắt buộc nhập")
      .matches(/^[0-9]+$/), //viet bieu thuc chinh quy phai viet lien, khong co dau cach giua cac ky tu
    maNhom: yup.string().required("*Trường này bắt buộc nhập"),
  });
  const handleSubmit = (values) => {
    dispatch(nguoiDungDangKyAction(values, history));
  };
  if (localStorage.getItem(USER_LOGIN)) return <Redirect to="/" />;
  return (
    <>
      <div id="signup">
        <div className="signup signup--customize">
          <div className="signup__wrapper">
            <img className="signup__logo" src={logo} alt="dang-ky" />
            <Formik
              initialValues={{
                taiKhoan: "",
                matKhau: "",
                email: "",
                soDt: "",
                maNhom: "GP01",
                maLoaiNguoiDung: "KhachHang",
                hoTen: "",
              }}
              validationSchema={signUpUserSchema}
              // ham thu 2 can phai co: truoc khi chay hafm handelsubmit thi formik se xet xem schema validate da dung chua
              onSubmit={handleSubmit}
            >
              {(formikProps) => (
                <Form>
                  <div className="form-group text-left">
                    <label>Tài khoản: </label>
                    <Field
                      type="text"
                      name="taiKhoan"
                      className="form-control"
                      onChange={formikProps.handleChange}
                    ></Field>
                    <ErrorMessage name="taiKhoan">
                      {(message) => (
                        <div className="alert text-danger alert-validation">
                          {message}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="form-group text-left">
                    <label>Mật khẩu: </label>
                    <Field
                      type="password"
                      name="matKhau"
                      className="form-control"
                      onChange={formikProps.handleChange}
                    ></Field>
                    <ErrorMessage name="matKhau">
                      {(message) => (
                        <div className="alert text-danger alert-validation ">
                          {message}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="form-group text-left">
                    <label>Họ tên: </label>
                    <Field
                      type="text"
                      name="hoTen"
                      className="form-control"
                      onChange={formikProps.handleChange}
                    ></Field>
                    <ErrorMessage name="hoTen">
                      {(message) => (
                        <div className="alert text-danger alert-validation ">
                          {message}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="form-group text-left">
                    <label>Email: </label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      onChange={formikProps.handleChange}
                    ></Field>
                    <ErrorMessage name="email">
                      {(message) => (
                        <div className="alert text-danger alert-validation ">
                          {message}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="form-group text-left">
                    <label>Số điện thoại: </label>
                    <Field
                      type="text"
                      name="soDt"
                      className="form-control"
                      onChange={formikProps.handleChange}
                    ></Field>
                    <ErrorMessage name="soDt">
                      {(message) => (
                        <div className="alert text-danger alert-validation ">
                          {message}
                        </div>
                      )}
                    </ErrorMessage>
                  </div>
                  <div className="text-center mt-5">
                    <Link to="/signin">Đã có tài khoản ? Đăng nhập !</Link>
                    <button className="btn btn-success" type="submit">
                      Đăng ký
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="signup__close">
              <NavLink className="btn-close" to="/">
                <i className="fa fa-times"></i>
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
