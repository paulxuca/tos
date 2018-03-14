import fetch from 'isomorphic-fetch';
import {stringify} from 'querystring';

export default async ({page = 1, seen = 0} = {}) => {
    // Using querystring's stringify() since there might be additional query params in more complex scenarios.
    const qs = stringify({
        page
    });

    try {
        const response = await fetch(`${process.env.REACT_APP_SPACES_ENDPOINT}?${qs}`);

        const {
            data,
            page_size,
            total
        } = await response.json();

        return {
            data,
            isEnd: seen + page_size >= total,
            error: null
        };
    } catch (err) {
        if (process.env.NODE_ENV === 'development') {
            console.log(err);
        }

        return {
            error: err,
            data: [],
            isEnd: true
        };
    }
};
