import { Link, useParams, useRouteMatch } from "react-router-dom";
import Comments from "../components/comments/Comments";
import { Route } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import useHttp from "../hooks/use-http";
import { getSingleQuote } from "../lib/api";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import { useEffect } from "react";


const QuoteDetail = () => {
  const params = useParams();
  const match = useRouteMatch();
  const {sendRequest,status,data:loadedQuote,error}=useHttp(getSingleQuote,true);
  const {ID}=params;
  useEffect(()=>{
    sendRequest(ID);
  },[sendRequest,ID])
  if(status==='pending'){
    return(
      <div className="centered">
        <LoadingSpinner/>
      </div>
    )
  }
  if(error){
    return(
      <p className="centered">{error}</p>
    )
  }
  if (!loadedQuote.text) {
    return <p>No quotes found!</p>;
  }
  return (
    <section>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comment`}>
            Go to comment
          </Link>
        </div>
      </Route>
      <p>{params.ID}</p>
      <Route path={`${match.path}/comment`}>
        <Comments />
      </Route>
    </section>
  );
};

export default QuoteDetail;
