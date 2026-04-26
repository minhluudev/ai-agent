"use client";

import { type FC } from "react";
import { useController } from "./controller";
import styles from "./style.module.css";

const ComponentName: FC = () => {
  useController();

  return (
    <div className={styles.container}>ComponentName</div>
  );
};

export default ComponentName;
