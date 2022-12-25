import QuoteForm from "../components/quotes/QuoteForm";
import { useHistory } from "react-router-dom";
//ako npr hocu da kada dodam novi quote navigacija me prebaci na stranicu gde su all quotes
//nne mogu to da radim tako sto odem i u quote form promenim button addquote u link jer to mora biti button zato sto submituje formu
//zato koristimo useHistory hook koji nam daje history object i mozemo koristi push metodu history objecta koji gura novu stranicu korisniku i omogucava mu da se vrati na stranicu sa koje je dosao pomocu back
//ili replace metodu koja redirectuje na drugu stranicu kada dodamo quote i nema vracanja, koju koristimo? zavisi od nas da li zelimo korisinku da dozovolimo da moze ili ne moze da se vrati
//i ovo se sve naziva sto sam gore opisao programmatic navigation koji se desava kada se okine neka akcija(npr submituje forma)
import useHttp from "../hooks/use-http";
import { addQuote } from "../lib/api";
import { useEffect } from "react";
const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const history = useHistory();

  useEffect(() => {
    if (status === "completed") {
      history.push("/quotes");
    }
  }, [status,history]);
  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };
  return <QuoteForm isLoading={status==='pending'} onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
