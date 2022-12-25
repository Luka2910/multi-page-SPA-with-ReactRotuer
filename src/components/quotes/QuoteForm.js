//mozemo koristi prompt koji nam pruza react kako bi sprecili nezeljene tranzicije, ako korisnik krene da kuca u formi i klikne back, pa se opet vrati na fromu sve sto je kucao bice obrisano
//e mi zelimo da ga upozorimo upravo tad kada je krenuo da kuca pa kliknuo back da ode nazad na drugu stranicu i to radimo preko Prompta koji zahteva 2 parametra (when,message)

import React from "react";
import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();
  const [isEntering, setIsEntering] = useState(false);

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const focusFormHandler = () => {
    setIsEntering(true);
  };
  const enteringIsFinishedHandler=()=>{
    setIsEntering(false);
  }
  //prompt u arg message vraca f-ju koja ima location objekat koji sadrzi info o url na koji zelimo da idemo
  return (
    <React.Fragment>
      <Prompt when={isEntering} message={(location)=>'If you leave page, all your data you entered in a form will be deleted!'}/>
      <Card>
        <form
          className={classes.form}
          onFocus={focusFormHandler}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
          </div>
          <div className={classes.actions}>
            <button className="btn" onClick={enteringIsFinishedHandler}>Add Quote</button>
          </div>
        </form>
      </Card>
    </React.Fragment>
  );
};

export default QuoteForm;
