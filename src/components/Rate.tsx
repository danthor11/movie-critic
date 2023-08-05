import React from "react";
interface Props {
  rate: number;
}

export const Rate = ({ rate }: Props) => {
  const getBgColor = () => {
    console.log(rate);
    const inner =
      rate > 70 ? "bg-green-800" : rate > 25 ? "bg-yellow-600" : "bg-red-600";
    const outer =
      rate > 70 ? "bg-green-700" : rate > 25 ? "bg-yellow-600" : "bg-red-600";
    const gradient =
      rate > 70
        ? "GreenGradient"
        : rate > 25
        ? "YellowGradient"
        : "RedGradient";

    return {
      inner,
      outer,
      gradient,
    };
  };

  const size = () => {
    const c = Math.PI * (45 * 2);
    const pct = ((100 - rate) / 100) * c;

    return { pct, c };
  };

  console.log(getBgColor());
  return (
    <div className={`p-[2px] rounded-full opacity-80 ${getBgColor().outer}`}>
      <div className="relative ">
        <div
          className={`outer flex justify-center items-center ${
            getBgColor().outer
          }`}
        >
          <div className={`inner ${getBgColor().inner}`}>
            <p className="text-[10px]">
              {rate}
              <span className="text-[6px]">%</span>
            </p>
          </div>
        </div>
        <svg
          viewBox="0 0 100 100"
          className="absolute w-[40px] h-[40px] top-0 left-0"
        >
          <circle
            id="circle"
            stroke={`url(#${getBgColor().gradient})`}
            cx="50"
            cy={"50"}
            r={"45"}
            strokeLinecap="round"
            strokeDashoffset={size().pct}
            strokeDasharray={`${size().c} ${size().pct}`}
          />
          <defs>
            <linearGradient id="RedGradient">
              <stop offset={0} stopColor="#f9a1a2" />
              <stop offset={"100%"} stopColor="#e0131b" />
            </linearGradient>

            <linearGradient id="GreenGradient">
              <stop offset={0} stopColor="#04a853" />
              <stop offset={"100%"} stopColor="#1fe90c" />
            </linearGradient>

            <linearGradient id="YellowGradient">
              <stop offset={0} stopColor="#f9f7a1" />
              <stop offset={"100%"} stopColor="#f4ca0c" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </div>
  );
};
