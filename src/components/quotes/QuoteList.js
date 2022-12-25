import { Fragment } from 'react';
import { useHistory,useLocation } from 'react-router-dom';
import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {

  const history=useHistory();
  const location=useLocation();
  //u location objektu i propertiju search(location.search) dobijamo sort key koji je = asc
  //a ovim urlSearchParams tacno smestamo u quearyParams sort key koji je jednak trenutno asc
  const queryParams=new URLSearchParams(location.search)
  const isSortingAscending=queryParams.get('sort')==='asc';
  const sortedQuotes=sortQuotes(props.quotes,isSortingAscending)
  const sortingHandler=()=>{
    history.push({
      pathname:location.pathname,
      search:`?sort=' + ${(isSortingAscending?'desc':'asc')}`
    })
    history.push('/quotes?sort=' + (isSortingAscending?'desc':'asc'))
    
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={sortingHandler}>Sort {isSortingAscending? 'descending':'ascending'}</button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
