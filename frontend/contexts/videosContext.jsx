/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext } from "react";
import PropTypes from "prop-types";
import moment from "moment-with-locales-es6";
import useLocalStorage from "../hooks/useLocalStorage";

const CurrentVideosContext = createContext();

export default CurrentVideosContext;

export function CurrentVideosContextProvider({ children }) {
  const [selectedName, setSelectedName] = useLocalStorage("videoName", "");
  const [selectedId, setSelectedId] = useLocalStorage("videoId", "");

  const videoDate = (video) =>
    moment(video.creation_date).locale("fr").fromNow();

  const values = {
    setSelectedName,
    selectedName,
    selectedId,
    setSelectedId,
    videoDate,
  };

  return (
    <CurrentVideosContext.Provider value={values}>
      {children}
    </CurrentVideosContext.Provider>
  );
}
CurrentVideosContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
