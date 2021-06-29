import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { Link, NavLink, useHistory } from "react-router-dom";
import * as yup from "yup";
import logo from "../../Assets/web-logo.png";
import { nguoiDungDangNhapAction } from "../../redux/User/user.actions";
import "./style.scss";
const SignIn = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const signUpUserSchema = yup.object().shape({
    taiKhoan: yup.string().required("*Trường này bắt buộc nhập"),
    matKhau: yup.string().required("*Trường này bắt buộc nhập"),
  });
  const handleSubmit = (values) => {
    dispatch(nguoiDungDangNhapAction(values, history));
  };

  return (
    <>
      <div id="login">
        <div className="login login--customize">
          <div className="login__wrapper">
            <img className="login__logo" src={logo} alt="dang-ky" />
            <div className="login__message">
              Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
            </div>
            <Formik
              initialValues={{
                taiKhoan: "",
                matKhau: "",
              }}
              validationSchema={signUpUserSchema}
              // ham thu 2 can phai co: truoc khi chay hafm handelsubmit thi formik se xet xem schema validate da dung chua
              onSubmit={(values, actions) => {
                handleSubmit(values);
                actions.resetForm();
              }}
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
                  <div className="text-center mt-5">
                    <Link to="/signup">Chưa có tài khoản ? Đăng ký !</Link>
                    <button className="btn btn-success" type="submit">
                      Đăng nhập
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="login__close">
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

export default SignIn;
