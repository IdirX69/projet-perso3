import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Joi from "joi-browser";
import loginImg from "../asset/image/loginImg.jpeg";
import logo from "../asset/image/logo.svg";

function Register() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [userRegistered, setUserRegistered] = useState({
    email: "",
    firstname: "",
    lastname: "",
    password: "",
  });
  const pattern = "^[a-zA-Z0-9]{3,30}$";

  const emailPattern = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$";

  const schema = Joi.object({
    email: Joi.string().regex(RegExp(emailPattern)).max(75).required(),
    firstname: Joi.string().alphanum().min(3).max(30).required(),
    lastname: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().regex(RegExp(pattern)).required().min(8).max(20),
  });

  const navigate = useNavigate();
  const handleForm = (e) => {
    e.preventDefault();

    const result = schema.validate(userRegistered);

    if (confirmPassword === userRegistered.password && !result.error) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userRegistered),
      };

      fetch(`${BACKEND_URL}/api/register`, requestOptions)
        .then((response) => {
          if (response.status === 201) {
            navigate("/login");
          }
        })
        .catch((error) => {
          console.warn(error);
        });
    } else {
      setErrorMessage("Une erreur c'est produite");
    }
  };

  return (
    <div className="register-container">
      <div className="register-img-wrapper">
        <img className="background-img" src={loginImg} alt="loginImg" />
        <img className="logo-img" src={logo} alt="logo" />
      </div>
      <form onSubmit={handleForm}>
        <div className="rgister-input-container">
          <label htmlFor="firstname" className="form-label">
            Prénom
          </label>
          <input
            onChange={(e) =>
              setUserRegistered({
                ...userRegistered,
                firstname: e.target.value,
              })
            }
            type="firstname"
            id="firstname"
            required
            minLength={2}
            maxLength={100}
          />
        </div>
        <div className="rgister-input-container">
          <label htmlFor="lastname" className="form-label">
            Nom
          </label>
          <input
            onChange={(e) =>
              setUserRegistered({ ...userRegistered, lastname: e.target.value })
            }
            className="loginInput"
            id="lastname"
            required
            minLength={2}
            maxLength={100}
            name="lastname"
          />
        </div>
        <div className="rgister-input-container">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            onChange={(e) =>
              setUserRegistered({ ...userRegistered, email: e.target.value })
            }
            type="email"
            pattern={emailPattern}
            className="loginInput"
            required
            minLength={2}
            maxLength={100}
            id="email"
            name="email"
          />
        </div>
        <div className="rgister-input-container">
          <label htmlFor="password" className="form-label">
            Mot de passe
          </label>
          <input
            onChange={(e) =>
              setUserRegistered({ ...userRegistered, password: e.target.value })
            }
            type="password"
            pattern={pattern}
            required
            minLength={8}
            maxLength={100}
            id="password"
            name="password"
          />
        </div>
        <div className="rgister-input-container">
          <label htmlFor="password" className="form-label">
            Confirmer votre mot de passe
          </label>
          <input
            type="password"
            pattern={pattern}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            title='Veuillez entrer une adresse mail valide. Exemple: "exemple@mail.fr'
            minLength={8}
            maxLength={100}
            id="passxord"
            name="passxord"
          />
        </div>
        <p className="error-message">{errorMessage}</p>
        <button className="loginButton" type="submit">
          Inscription
        </button>
      </form>
    </div>
  );
}

export default Register;
