"use client";

import { type FC } from "react";
import { useController } from "./controller";

interface IProps {
  // define props here — omit this interface if the component has no props
}

const ComponentName: FC<IProps> = (props) => {
  const {/* destructure returned values here */} = useController(props);

  return (
    <div>ComponentName</div>
  );
};

export default ComponentName;
