const moment = require("moment"); // require

export const formatDate = (time: Date) => {
  if (!time) return;
  const date = moment(time).format();
  return date;
};
