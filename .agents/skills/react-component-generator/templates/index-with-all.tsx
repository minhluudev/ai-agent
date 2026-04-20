"use client";

import { type FC } from "react";
import { useController } from "./controller";
import styles from "./style.module.css";

interface IProps {
  // define props here — omit this interface if the component has no props
}

const ComponentName: FC<IProps> = (props) => {
  const { /* destructure returned values here */ } = useController(props);

  return (
    <div className={styles.container}>ComponentName</div>
  );
};

export default ComponentName;
