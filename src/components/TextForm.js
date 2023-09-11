import React, { useState } from "react";

export default function TextForm(props) {
  const handleUpClick = () => {
    //console.log("Uppercase was clicked " + text);
    let newText = text.toUpperCase();
    setText(newText);
    props.showAlert("converted to Uppercase !", "success");
  };
  const handleLoClick = () => {
    let newText = text.toLowerCase();
    setText(newText);
    props.showAlert("converted to Lowercase !", "success");
  };

  const speak = () => {
    let msg = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(msg);
    const toogle = document.getElementById("toggle");
    if (toogle.textContent === "Speak") {
      toogle.innerHTML = "Stop";
      props.showAlert(" click again to stop !", "info");
    } else {
      toogle.innerHTML = "Speak";
      window.speechSynthesis.cancel();
    }
  };

  const handleOnChange = (event) => {
    // console.log("onChange");
    setText(event.target.value);
  };

  //text is  a state variabe and can only be change by setText function
  //Hooks let you use different React features from your components. You can either use the built-in Hooks or combine them to build your own. This page lists all built-in Hooks in React.
  const [text, setText] = useState("");
  return (
    <>
      <div
        className="container"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h1>{props.heading}</h1>
        <div className="mb-3">
          <textarea
            className="form-control"
            value={text}
            onChange={handleOnChange}
            style={{
              backgroundColor: props.mode === "dark" ? "grey" : "white",
              color: props.mode === "dark" ? "white" : "grey",
              resize: "none",
            }}
            rows="8"
          ></textarea>
        </div>
        <button className="btn btn-primary mx-1 my-1" onClick={handleUpClick}>
          Convert to UpperCase
        </button>
        <button className="btn btn-primary mx-1 my-1" onClick={handleLoClick}>
          Convert to LowerCase
        </button>
        <button
          className="btn btn-primary mx-1 my-1"
          onClick={() => {
            setText(" ");
            props.showAlert("Text has been Clear !", "success");
          }}
        >
          Clear
        </button>
        <button
          type="submit"
          onClick={speak}
          className="btn btn-primary mx-1 my-1"
          id="toggle"
        >
          Speak
        </button>
      </div>
      <div
        className="container my3"
        style={{ color: props.mode === "dark" ? "white" : "black" }}
      >
        <h2> you text summary</h2>
        <p>
          {text.length < 1 ? 0 : text.split(" ").length} word and {text.length}{" "}
          characters
        </p>
        <p>{0.008 * text.split(" ").length} Minuntes read </p>
        <h2>Preview</h2>
        <p>{text.length > 0 ? text : "Enter something to Preview it here.."}</p>
      </div>
    </>
  );
}
