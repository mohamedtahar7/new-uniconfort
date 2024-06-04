import React from "react";
interface SpinnerProps {
  d: string;
}
const Spinner = ({ d }: SpinnerProps) => {
  return (
    <div
      className={`w-${d} h-${d} rounded-full border-4 
  border-slate-900 border-t-transparent animate-spin`}
    ></div>
  );
};

export default Spinner;
