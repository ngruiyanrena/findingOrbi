import { Paper } from "@material-ui/core";

import styles from "./Box.module.css";

function Box2(props) {
  const { children } = props;
  return (
    <Paper className={styles.box2} elevation={2}>
      {children}
    </Paper>
  );
}

export default Box2;