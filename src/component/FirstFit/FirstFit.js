import React, { useRef, useState } from "react";
import EffectOne from "../../effect/EffectOne";

const FirstFit = () => {
  const inputRef = useRef();
  let blockValues = {};
  let processValues = {};
  const [bool, setBool] = useState(false);
  const [bool1, setBool1] = useState(false);
  const [inputBlockFields, setInputBlockFields] = useState([]);
  const [inputProcessFields, setInputProcessFields] = useState([]);
  const [inputBtn, setinputBtn] = useState([]);
  const [block, setBlock] = useState([]);
  let [showVal, setShowVal] = useState([]);

  const firstFit = (blockSize, m, processSize, n) => {
    const allocation = [];
    let _processVal = [];

    for (let i = 0; i < allocation.length; i++) allocation[i] = -1;

    for (let i = 0; i < n; i++) {
      for (let j = 0; j < m; j++) {
        if (blockSize[j] >= processSize[i]) {
          allocation[i] = j;

          blockSize[j] -= processSize[i];

          break;
        }
      }
    }
    for (let i = 0; i < n; i++) {
      let s = "Not Allocated";
      if (allocation[i] > -1)
        _processVal.push(
          "   " +
            (i + 1) +
            "           " +
            processSize[i] +
            "           " +
            (allocation[i] + 1)
        );
      else
        _processVal.push(
          "    " + (i + 1) + "           " + processSize[i] + "           N/A"
        );
    }
    setShowVal(_processVal);
    console.log(_processVal);
  };

  const processBtn = () => {
    setBool1(true);
    let blockVal = Object.values(blockValues);
    let processVal = Object.values(processValues);
    let blockSize = blockVal;
    let processSize = processVal;
    let m = blockSize.length;
    let n = processSize.length;
    setBlock(blockVal);
    firstFit(blockSize, m, processSize, n);
  };

  const handleClick = () => {
    setBool(true);
    let length = inputRef.current.value;
    let blockFields = [];
    let processFields = [];
    let btn = [];
    for (let i = 0; i < length; i++) {
      blockFields.push(
        <div key={`${i + 1}`}>
          <label className="text-lg me-2 font-bold">{"Block" + (i + 1)}</label>
          <input
            className="text-white-600 rounded-md border-4"
            onChange={(e) => onChangeBlockFields(e, i)}
          />
          <br />
          <br />
        </div>
      );
      processFields.push(
        <div key={`${i + 1}`}>
          <label className="text-lg me-2 font-bold">
            {"Process" + (i + 1)}
          </label>
          <input
            className="text-white-600 rounded-md border-4"
            onChange={(e) => onChangeProcessFields(e, i)}
          />
          <br />
          <br />
        </div>
      );
    }
    btn.push(
      <button
        className="border-2 border-blue-500 hover:border-red-500 m-3 p-3 rounded-full"
        onClick={processBtn}
      >
        start
      </button>
    );
    setInputBlockFields([...blockFields]);
    setInputProcessFields([...processFields]);
    setinputBtn([...btn]);
  };

  const onChangeBlockFields = (e, index) => {
    blockValues[index + 1] = Number(e.target.value);
  };

  const onChangeProcessFields = (e, index) => {
    processValues[index + 1] = Number(e.target.value);
  };

  return (
    <div className="pt-3">
      <EffectOne />
      <h1 className="font-bold mb-6 text-5xl text-teal-100 italic">
        First Fit
      </h1>
      <label className="font-bold text-lg me-2">Enter Block Size:</label>
      <input className="text-white-600 rounded-md border-4" ref={inputRef} />
      <br />
      <button
        className="border-2 border-blue-500 hover:border-red-500 m-3 p-3 rounded-full"
        onClick={handleClick}
      >
        submit
      </button>
      <div className={bool ? "flex justify-evenly" : "hidden"}>
        <div>
          <h1 className="font-bold text-lg me-2 mb-3">Enter Block Elements</h1>
          {inputBlockFields.map((item) => {
            return item;
          })}
        </div>
        <div>
          <h1 className="font-bold text-lg me-2 mb-3">
            Enter Process Elements
          </h1>
          {inputProcessFields.map((item) => {
            return item;
          })}
        </div>
      </div>
      <div>
        {inputBtn.map((item) => {
          return item;
        })}
      </div>
      <div className={bool1 ? "" : "hidden"}>
        <h1 className="font-bold text-3xl">Block Avalaible Space</h1>
        <div className="mt-8">
          {block.map((item) => {
            return (
              <span className="font-bold text-3xl border-solid border-2 border-indigo-600 p-4 m-4">
                {item}
              </span>
            );
          })}
        </div>
        <div className="mt-8 bg-zinc-300">
          <h1 className="font-bold text-3xl me-2 mb-3 ms-10">
            <span className="me-28">Process No.</span>
            <span className="me-28"> Process Size</span>
            <span className="me-28">Block no.</span>
          </h1>
          <h1 className="font-bold text-2xl">
            {showVal.map((item, index) =>
              index ? (
                <>
                  <br />
                  <span className="">{item}</span>
                </>
              ) : (
                <>
                  <span className="">{item}</span>
                </>
              )
            )}
          </h1>
        </div>
      </div>
    </div>
  );
};

export default FirstFit;
