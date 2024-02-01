const { default: moment } = require("moment-with-locales-es6");

const videoDate = (video) => moment(video.creation_date).locale("fr").fromNow();

export default videoDate;
