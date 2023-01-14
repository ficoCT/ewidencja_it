import React from 'react';
import ReactToPrint from "react-to-print";
import { Print as ComputerFormPrinting } from "../ComputerFormPrinting";

export default function Print({ computer, refresh }) {

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

    return <button class="btn btn-success">Drukuj</button>;

  }, []);

  function comeBack() {

    if (typeof refresh !== 'function') return;
    refresh();

  }

  return (
      <>

      <div>
        <ReactToPrint
            content={reactToPrintContent}
            removeAfterPrint
            trigger={reactToPrintTrigger}
        />
        {loading && <p className="indicator">onBeforeGetContent: Loading...</p>}
        <ComputerFormPrinting ref={componentRef} computer={computer} />
      </div>
      <button class="btn btn-primary mb-2" onClick={comeBack}>Powrót</button>

      </>
  );
}