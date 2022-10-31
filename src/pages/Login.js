import React from "react";
import { useState } from "react";
import { Button } from "../components/Button/Button";
import { authentication } from "../auth/authentication";
import Input from "../components/Input/Input";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLogged } from "../reducers/authentication";
import { Navigate } from "react-router-dom";
import { inventoryError } from "../services/toastService";

import "./Login.scss";

const Login = () => {
  const dispatch = useDispatch();

  const [passwordType, setPasswordType] = useState("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const isLogged = useSelector((state) => state.authentication.isLogged);

  const handleEmailInput = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handlePasswordInput = (event) => {
    event.preventDefault();
    setPassword(event.target.value);
  };

  const changePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const onLogin = async (event) => {
    event.preventDefault();
    const { loginSuccess, token } = await authentication(email, password);
    console.log(loginSuccess);
    if (loginSuccess) {
      dispatch(setLogged(loginSuccess));
    } else {
      inventoryError("Usuario o contraseña incorrectos");
      dispatch(setLogged(loginSuccess));
    }
    setEmail("");
    setPassword("");
  };

  return (
    <>
      {isLogged ? (
        <Navigate to={"/accounting-mode/"} replace={true} />
      ) : (
        <div className="box-container">
          <div className="border">
            <div className="image-form-container">
              <div className="image"></div>
              <div className="login-form-container">
                <div className="form">
                  <h1 className="title-system-name">ACSYS</h1>
                  <p className="title-system-description">
                    Sistema de contabilidad para artesanos
                  </p>

                  <form className="form-style" onSubmit={onLogin}>
                    <h2 className="login-title">Iniciar sesión</h2>
                    <div className="input-container-space">
                      <Input
                        label={"Correo electrónico"}
                        type={"text"}
                        value={email}
                        style={"standard"}
                        onChange={handleEmailInput}
                      />
                    </div>
                    <div className="input-container-space">
                      <Input
                        label={"Contraseña"}
                        type={passwordType}
                        value={password}
                        style={"standard"}
                        onChange={handlePasswordInput}
                      />
                    </div>

                    <div className="password-checkbox">
                      <input
                        type="checkbox"
                        id="checkbox-password"
                        className="checkbox-value"
                        onClick={changePasswordType}
                      />
                      <label
                        htmlFor="checkbox-password"
                        className="checkbox-label"
                      >
                        {" "}
                        Mostrar contraseña
                      </label>
                    </div>
                    <div>
                      <Button
                        label={"Iniciar sesion"}
                        type={"login"}
                        system={"accounting"}
                      />
                    </div>
                  </form>
                  <p className="warning-message">
                    Para obtener una cuenta póngase en contacto con el
                    administrador
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
