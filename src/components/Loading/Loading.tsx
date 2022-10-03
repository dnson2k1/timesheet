import React from "react";
import { useStyles } from "./loadingStyles";

const loadingGif = require("~/assets/images/loading.gif");

const Loading = () => {
  const classes = useStyles();
  return (
    <div className={classes.loading}>
      <img src={loadingGif} alt="loading" className={classes.loading__gif} />
    </div>
  );
};

export default Loading;
