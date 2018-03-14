import {Component} from 'react';
import PropTypes from 'prop-types';

export default class VariationsInfiniteScroll extends Component {
	componentWillUnmount() {
		this.detachListeners();
	}

	render() {
		return this.props.children({onRef: this.handleRef});
	}

	attachListeners = container => {
		container.addEventListener('wheel', this.handleScroll);
	};

	detachListeners = () => {
		this.containerRef.removeEventListener('wheel', this.handleScroll);
	};

	// Adapted from https://gist.github.com/andrewsuzuki/85708fddff4b2cf11b28
	handleScroll = e => {
		const {threshold} = this.props;
		const {offsetHeight, offsetTop} = this.containerRef;

        const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop

		if ((offsetTop) + offsetHeight - scrollTop - window.innerHeight < threshold && e.deltaY >= 1) {
			this.props.onLoadMore();
		}
	};

	handleRef = ref => {
		if (ref && !this.containerRef) {
			this.attachListeners(ref);
		}

		this.containerRef = ref;
	};
}

VariationsInfiniteScroll.defaultProps = {
	onLoadMore() {},
	threshold: 1
};

VariationsInfiniteScroll.propTypes = {
	children: PropTypes.func,
	onLoadMore: PropTypes.func,
	threshold: PropTypes.number
};
