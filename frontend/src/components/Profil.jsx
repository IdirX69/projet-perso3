import React, { useContext, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import CurrentUserContext from "../../contexts/userContext";
import defaultAvatar from "../asset/image/defaultAvatar.jpeg";
import Imglog from "../asset/image/img1.png";

function Profil() {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

  const navigate = useNavigate();
  const { user, setUser, token } = useContext(CurrentUserContext);
  const [modifyInfos, setModifyInfos] = useState(false);

  const unlogToast = () =>
    toast.error("Vous êtes déconnecté !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const saveInfosChangeToast = () =>
    toast.info("Modifications enregistrées !", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // Nouvelles infos modifiés par le user
  const [newUserInfos, setNewUserInfos] = useState({
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
  });

  const myHeaders = new Headers({
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  });

  const PUTrequestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(newUserInfos),
  };

  const changeUsersInfo = (id) => {
    fetch(`${BACKEND_URL}/api/users/${id}`, PUTrequestOptions);
    setUser({
      ...user,
      firstname: newUserInfos.firstname,
      lastname: newUserInfos.lastname,
      email: newUserInfos.email,
    });
  };
  const newUserLastname = (e) => {
    setNewUserInfos({
      ...newUserInfos,
      lastname: e.target.value,
    });
  };
  const newUserFirstname = (e) => {
    setNewUserInfos({
      ...newUserInfos,
      firstname: e.target.value,
    });
  };
  const newUseremail = (e) => {
    setNewUserInfos({
      ...newUserInfos,
      email: e.target.value,
    });
  };

  const handleOnError = (e) => {
    e.currentTarget.src = defaultAvatar;
  };

  const handleDisconnection = () => {
    console.warn(user);
    // gestion de la deconnexion
    localStorage.clear();
    setUser({});
    navigate("/");
  };

  const avatarRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (avatarRef.current.files[0]) {
      const myHeader = new Headers();
      myHeader.append("Authorization", `Bearer ${token}`);

      const formData = new FormData();
      formData.append("avatar", avatarRef.current.files[0]);

      const requestOptions = {
        method: "POST",
        headers: myHeader,
        body: formData,
      };
      // on appelle le back
      fetch(`${BACKEND_URL}/api/avatars`, requestOptions)
        .then((response) => response.json())
        .then((results) => {
          // maj avatar
          setUser({ ...user, avatar: results.avatar });
          saveInfosChangeToast();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  return (
    <div className="profil-container">
      <div className="profil-img">
        <img src={Imglog} alt="img" />
      </div>

      <div className="profil-info">
        <img
          className="avatar-img"
          src={`${BACKEND_URL}/api/avatars/${user.avatar}`}
          alt="avatar"
          onError={handleOnError}
        />
        <form encType="multipart/form-data" onSubmit={handleSubmit}>
          <label htmlFor="file" className="form-label">
            Modifier
          </label>
          <input type="file" ref={avatarRef} id="file" />
          <button type="submit">Envoyer</button>
        </form>
        <p>
          {user.firstname} {user.lastname}
        </p>
        {modifyInfos ? (
          <button
            type="button"
            onClick={() => {
              setModifyInfos(false);
              changeUsersInfo(user.id);
              saveInfosChangeToast();
            }}
          >
            Enregistrer
          </button>
        ) : (
          <button
            className="containerbtn-profil"
            type="button"
            onClick={() => {
              setModifyInfos(true);
            }}
          >
            Modifier mes informations
          </button>
        )}

        {modifyInfos ? (
          <div className="modify-info">
            <label htmlFor="mail" name="email">
              Nom
            </label>
            <input
              type="text"
              value={newUserInfos.lastname}
              required
              title='Veuillez entrer une adresse mail valide. Exemple: "exemple@mail.fr'
              minLength={2}
              maxLength={100}
              placeholder="Entrez votre Nom"
              name="lastname"
              className="container-input"
              onChange={(e) => newUserLastname(e)}
            />

            <label htmlFor="firstname" name="firstname">
              Prénom
            </label>

            <input
              type="text"
              value={newUserInfos.firstname}
              required
              minLength={2}
              maxLength={100}
              placeholder="Entrez votre Prenom"
              name="firstname"
              className="container-input"
              onChange={(e) => newUserFirstname(e)}
            />

            <label htmlFor="mail" name="email">
              Email
            </label>
            <input
              type="text"
              value={newUserInfos.email}
              required
              title='Veuillez entrer une adresse mail valide. Exemple: "exemple@mail.fr'
              minLength={6}
              maxLength={100}
              id="email"
              name="email"
              className="container-input"
              onChange={(e) => newUseremail(e)}
            />
          </div>
        ) : null}
        {user.is_admin === 1 ? (
          <div className="admin-button">
            <button onClick={() => navigate("/upload")} type="button">
              Upload des videos
            </button>
            <button onClick={() => navigate("/videosManagement")} type="button">
              Gestion des videos
            </button>

            <button onClick={() => navigate("/addcategory")} type="button">
              Ajouter des Catégories
            </button>
            <button type="button" onClick={() => navigate("/usersManagement")}>
              Gestion des Utilisateurs
            </button>
          </div>
        ) : null}
        <button
          onClick={() => {
            handleDisconnection();
            unlogToast();
          }}
          type="button"
        >
          Se déconnecter
        </button>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Profil;
