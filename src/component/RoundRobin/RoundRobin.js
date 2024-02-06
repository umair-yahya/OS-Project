import React, { useRef, useState } from "react";
import EffectOne from "../../effect/EffectOne";

const RoundRobin = () => {
  const [bool, setBool] = useState(false);
  const [inputFields, setinputFields] = useState([]);
  let values = {};
  let [processVal, setProcessVal] = useState([]);
  let [awt, setAwt] = useState(0);
  let [atat, setAtat] = useState(0);

  const inputRef = useRef();
  const q_Time = useRef();
  let processes = [];

  const findWaitingTime = (processes, n, bt, wt, quantum) => {
    let rem_bt = new Array(n).fill(0);
    for (let i = 0; i < n; i++) rem_bt[i] = bt[i];

    let t = 0;
    while (1) {
      let done = true;

      for (let i = 0; i < n; i++) {
        if (rem_bt[i] > 0) {
          done = false;

          if (rem_bt[i] > quantum) {
            t += quantum;

            rem_bt[i] -= quantum;
          } else {
            t = t + rem_bt[i];

            wt[i] = t - bt[i];

            rem_bt[i] = 0;
          }
        }
      }

      if (done == true) break;
    }
  };

  const findTurnAroundTime = (processes, n, bt, wt, tat) => {
    for (let i = 0; i < n; i++) tat[i] = bt[i] + wt[i];
  };

  const findavgTime = (processes, n, bt, quantum) => {
    let wt = new Array(n).fill(0),
      tat = new Array(n).fill(0);
    let total_wt = 0,
      total_tat = 0;
    let _processVal = [];

    findWaitingTime(processes, n, bt, wt, quantum);

    findTurnAroundTime(processes, n, bt, wt, tat);

    for (let i = 0; i < n; i++) {
      total_wt = total_wt + wt[i];
      total_tat = total_tat + tat[i];

      _processVal.push(`${i + 1}      ${bt[i]}      ${wt[i]}      ${tat[i]}`);
    }
    wt = total_wt / n;
    atat = total_tat / n;
    console.log(_processVal);
    setProcessVal(_processVal);
    setAwt(total_wt / n);
    setAtat(total_tat / n);
  };
  const processBtn = () => {
    if (Object.values(values).length < inputRef.current.value) {
      console.log("FILL ALL THE BOXES");
    } else {
      setBool(true);
    }

    let n = processes.length;

    let burst_time = Object.values(values);

    let quantum = q_Time;
    findavgTime(processes, n, burst_time, quantum);
  };

  const handleClick = () => {
    let length = inputRef.current.value;
    let fields = [];

    for (let i = 0; i < length; i++) {
      fields.push(
        <div key={`${i + 1}`}>
          <label className="text-lg me-2 font-bold">{"BT" + (i + 1)}</label>
          <input
            className="text-white-600 rounded-md border-4"
            onChange={(e) => onChangeFieldsText(e, i)}
          />
          <br />
          <br />
        </div>
      );
    }
    fields.push(
      <button
        className="border-2 border-blue-500 hover:border-red-500 m-3 p-3 rounded-full"
        onClick={processBtn}
      >
        start
      </button>
    );
    setinputFields([...fields]);
  };

  const onChangeFieldsText = (e, index) => {
    values[index + 1] = Number(e.target.value);
    processes[index] = index + 1;
  };

  return (
    <div className="pt-3">
      <EffectOne />
      <h1 className="font-bold mb-6 text-5xl text-teal-100 italic">
        Round Robin
      </h1>
      <label className="font-bold text-lg me-2">Enter Process Size:</label>
      <input className="text-white-600 rounded-md border-4" ref={inputRef} />
      <br />
      <div className="mt-5">
        <label className="font-bold text-lg me-2">Enter Quantum Time:</label>
        <input className="text-white-600 rounded-md border-4" ref={q_Time} />
      </div>
      <br />
      <button
        className="border-2 border-blue-500 hover:border-red-500 m-3 p-3 rounded-full"
        onClick={handleClick}
      >
        submit
      </button>

      <br />
      {inputFields.map((item) => {
        return item;
      })}
      <div className={bool ? "bg-zinc-300" : "hidden"}>
        <h1 className="font-bold text-xl ">
          Processes &nbsp;&nbsp;&nbsp; Burst time &nbsp;&nbsp;&nbsp; Waiting
          time &nbsp;&nbsp;&nbsp; Turn around time &nbsp;&nbsp;&nbsp;
        </h1>
        <h1 className="font-bold text-2xl">
          {processVal.map((item, index) =>
            index ? (
              <>
                <br />
                {item}
              </>
            ) : (
              <>{item}</>
            )
          )}
        </h1>
        <h1 className="font-bold text-xl pt-10">
          <span className="font-bold text-xl">Average Waiting Time: </span>
          {awt}
        </h1>
        <h1 className="font-bold text-xl p-2">
          <span className="font-bold text-xl p-2">
            Average Turn Around Time:
          </span>
          {atat}
        </h1>
      </div>
    </div>
  );
};

export default RoundRobin;
