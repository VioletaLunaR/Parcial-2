import React from 'react';
import ReactDOM from 'react-dom';
import { IntlProvider } from 'react-intl';
import './index.css';
import localeEsMessages from "./locales/es";
import localeEnMessages from "./locales/en";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.css';
import PokemonList from './componentes/pokemonList';
import Graph from './componentes/graph';
import { gray } from 'd3';

function getMessage() {
  if (window.navigator.language.includes("en")) {
    return localeEnMessages;
  }
  else {
    return localeEsMessages;
  }
}

ReactDOM.render(
  <IntlProvider locale={window.navigator.language} messages={getMessage()}>
    <PokemonList />
    <Graph/>
  </IntlProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.register();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
