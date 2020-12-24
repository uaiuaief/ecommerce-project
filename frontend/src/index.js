import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

window.addEventListener('click', e => {
  let search_button = document.querySelector('.search-bar > button');
  let search_button_icon = document.querySelector('.search-bar > button > .icon');
  let search_bar = document.querySelector('.search-bar input');

  if (![search_button, search_bar, search_button_icon].includes(e.target)){
    search_bar.style.width = "0";
    search_bar.style.padding = "0";
  }

})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
