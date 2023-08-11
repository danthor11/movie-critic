import React from "react";

interface Props {
  textHelper?: string;
}
export const Loading = ({ textHelper }: Props) => {
  return (
    <div className="w-full flex flex-col items-center">
      <svg width="450" height="250" cy={70} r={40}>
        <circle className="shape" />
        <circle className="shape" />
        <circle className="shape" />
        <circle className="shape" />
        <circle className="shape" />
      </svg>
      {textHelper && <h2 className="text-xl">{textHelper}</h2>}
    </div>
  );
};
