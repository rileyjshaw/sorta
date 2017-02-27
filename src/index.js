import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


// TODO(riley): Actually have a way to pass this in.
ReactDOM.render(<App
	criteria='coolness'
	items={[
		'bulbasaur',
		'charmander',
		'dragonite',
		'gengar',
		'meowth',
		'ninetales',
		'pikachu',
		'squirtle',
		'tentacruel',
		'vaporeon',
	]}
/>, document.getElementById('root'));
