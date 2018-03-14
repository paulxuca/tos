import React, {Component} from 'react';
import fetchSpaces from '../lib/fetch-spaces';
import SpacesList from './spaces-list';

export default class App extends Component {
    constructor() {
        super();

        this.state = {
            isLoading: false,
            isEnd: false,
            page: 1,
            error: null,
            data: []
        };
    }

    componentDidMount() {
        this.loadData();
    }

    render() {
        return (
            <SpacesList
                onLoadMore={this.onLoadMoreData}
                isLoading={this.state.isLoading}
                isEnd={this.state.isEnd}
                spaces={this.state.data}
                />
        );
    }

    onLoadMoreData = () => {
        const {error, isLoading, isEnd} = this.state;

        if (isLoading || isEnd || error) {
            return;
        }

        this.loadData();
    };

    loadData = async () => {
        this.setState({
            isLoading: true
        });

        const {isEnd, data, error} = await fetchSpaces({
            page: this.state.page,
            seen: this.state.data.length
        });

        this.setState(state => ({
            data: state.data.concat(data),
            page: error ? state.page : state.page + 1,
            isLoading: false,
            isEnd,
            error
        }));
    }
}
