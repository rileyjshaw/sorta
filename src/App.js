import BalanceText from 'react-balance-text';
import React, {Component} from 'react';
import {sort} from 'timsort';

import './App.css';


class App extends Component {
	static propTypes = {
		criteria: React.PropTypes.string.isRequired,
		items: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,
	}

	constructor (props) {
		super(props);

		const items = props.items.slice();
		const n = items.length;

		this.state = {
			done: false,
			items,
			remaining: Math.ceil(2.5 * n * Math.log10(n)),
		}
	}

	componentWillMount = () => {
		const {items} = this.state;

		sort(items, (left, right) => {
			return new Promise((resolve, reject) => {
				const step = (winner) => {
					this._blocked = true;
					return resolve(winner);
				}

				this.setState(prevState => ({
					left,
					remaining: prevState.remaining - 1,
					right,
					step,
				}), () => this._blocked = false);
			});
		}).then(() => this.setState({done: true}, () => {
			console.log(`In order of ${this.props.criteria}:`, items);
		}));
	}

	componentDidMount = () => {
		window.addEventListener('keyup', this.handleKeyPress);
	}

	componentWillUnmount = () => {
		window.removeEventListener('keyup', this.handleKeyPress);
	}

	_blocked = false;

	handleKeyPress = ({key}) => {
		if (this._blocked) return;

		const {step} = this.state;

		switch (key) {
			case 'ArrowLeft':
				step(-1);
				break;
			case 'ArrowRight':
				step(1);
				break;
			default:
		}
	}

	render() {
		const {criteria} = this.props;
		const {done, left, remaining, right, step = null} = this.state;

		return step && <div className='main' onKeyDown={this.handleKeyPress}>
			<div className='panels'>
				<div className='panel' onClick={() => step(-1)}>
					<BalanceText>{done ? 'sorting complete!' : left}</BalanceText>
				</div>
				<div className='divider' />
				<div className='panel' onClick={() => step(1)}>
					<BalanceText>{done ? 'you\'re the coolest.' : right}</BalanceText>
				</div>
			</div>
			<footer>{done
				? 'you\'re done! check the output in your javascript console.'
				: `ranking by ${criteria} with ${remaining > 0 ? `about ${remaining}` : 'a few more'} remaining`
			}</footer>
		</div>;
	}
}

export default App;
