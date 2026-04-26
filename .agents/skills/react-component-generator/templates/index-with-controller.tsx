"use client";

import { type FC } from "react";
import { useController } from "./controller";

const ComponentName: FC = () => {
  useController();

  return (
    <div>ComponentName</div>
  );
};

export default ComponentName;
