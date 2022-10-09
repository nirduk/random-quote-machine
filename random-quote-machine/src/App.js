import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';

const API = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json';

class App extends React.Component {
  state = {
    quotes: [
      {
        quote: "Life isn’t about getting and having, it’s about giving and being.",
        author: "Kevin Kruse"
      }
    ],
    index: 0
  }

  componentDidMount() {
    fetch(API).then(response => response.json()).then(response => {
      this.setState({
        quotes: response.quotes
      }, this.getRandomIndex);
    });
  }

  getRandomIndex = () => {
    const { quotes } = this.state;

    if (quotes.length > 0) {
      const index = Math.floor(Math.random() * quotes.length);
      this.setState({
        index
      })
    }
  }

  render() {
    const { quotes, index } = this.state;
    const quote = quotes[index];

    return (
      <div className='wrapper d-flex justify-content-center align-items-center vh-100'>
        <div id='quote-box' className='col-md-8 col-lg-6 col-10 p-5 rounded shadow'>
          {
            quote && (
              <div>
                <p id='text'>
                  <i className="fa-solid fa-quote-left"></i> {quote.quote} <i className="fa-solid fa-quote-right"></i>
                </p>
                <cite id='author' className='d-block'>- {quote.author}</cite>
              </div>
            )
          }

          <div className='d-flex justify-content-between mt-3'>
            <a id='tweet-quote'
              href={`https://twitter.com/intent/tweet?text="${quote.quote}" - ${quote.author}`}
              title='tweet this quote'
              target='_top'
              className='btn shadow'
            >
              <i className='fa-brands fa-twitter'></i>
            </a>
            <button
              type='button'
              id='new-quote'
              title='generate new quote'
              className='btn shadow'
              onClick={this.getRandomIndex}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

export default App;