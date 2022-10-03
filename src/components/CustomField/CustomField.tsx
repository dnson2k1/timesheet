import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

function CustomField({ InputLabelProps = {}, ...props }) {
  return (
    <>
      <TextField
        InputLabelProps={{ shrink: true, ...InputLabelProps }}
        {...props}
      />
    </>
  );
}

CustomField.propTypes = {
  classes: PropTypes.object,
};

export default CustomField;
