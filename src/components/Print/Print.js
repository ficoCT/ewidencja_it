import React, {useCallback, useRef, useState} from 'react';
import ReactToPrint from "react-to-print";
import {ComputerFormPrinting} from "../ComputerFormPrinting";

export default function Print({computer}) {

  const componentRef = React.useRef(null);

  const onBeforeGetContentResolve = React.useRef(null);

  const [loading, setLoading] = React.useState(false);
  const [text, setText] = React.useState("old boring text");

  const handleAfterPrint = React.useCallback(() => {
    console.log("`onAfterPrint` called");
  }, []);

  const handleBeforePrint = React.useCallback(() => {
    console.log("`onBeforePrint` called");
  }, []);

  const handleOnBeforeGetContent = React.useCallback(() => {
    setLoading(true);
    setText("Loading new text...");

    return new Promise((resolve) => {
      onBeforeGetContentResolve.current = resolve;

      setTimeout(() => {
        setLoading(false);
        setText("New, Updated Text!");
        resolve();
      }, 2000);
    });
  }, [setLoading, setText]);

  React.useEffect(() => {
    if (
        text === "New, Updated Text!" &&
        typeof onBeforeGetContentResolve.current === "function"
    ) {
      onBeforeGetContentResolve.current();
    }
  }, [onBeforeGetContentResolve.current, text]);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = React.useCallback(() => {

    return <button>Drukuj</button>;

  }, []);

  return (
      <div>
        <ReactToPrint
            content={reactToPrintContent}
            removeAfterPrint
            trigger={reactToPrintTrigger}
        />
        {loading && <p className="indicator">onBeforeGetContent: Loading...</p>}
        <ComputerFormPrinting ref={componentRef} computer={computer} />
      </div>
  );
}