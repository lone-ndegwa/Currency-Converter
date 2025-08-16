import React from "react";

function ResultDisplay({ amount, from, to, result }) {
  if (result === null) return null;

  return (
    <div className="mt-6 text-center">
      <h2 className="text-lg font-medium">
        {amount} {from} = <span className="font-bold">{result}</span> {to}
      </h2>
    </div>
  );
}

export default ResultDisplay;
