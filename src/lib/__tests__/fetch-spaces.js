const nock = require('nock');
const m = require('../fetch-spaces').default;

process.env.REACT_APP_SPACES_ENDPOINT = 'http://foo.bar';

it('can fetch spaces and parse response', async () => {
    const data = [1, 2, 3];

    nock(process.env.REACT_APP_SPACES_ENDPOINT)
        .get('/?page=1')
        .reply(200, {
            data,
            page_size: data.length,
            total: 30
        });
    
    const {
        data: responseData,
        isEnd,
        error
    } = await m({page: 1, seen: 0});

    expect(error).toBeNull();
    expect(responseData.length).toBe(data.length);
    expect(isEnd).toBe(false);
});

it('can fetch spaces and parse response for last page', async () => {
    const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    nock(process.env.REACT_APP_SPACES_ENDPOINT)
        .get('/?page=2')
        .reply(200, {
            data,
            page_size: data.length,
            total: 20
        });
    
    const {
        data: responseData,
        isEnd,
        error
    } = await m({page: 2, seen: 10});

    expect(error).toBeNull();
    expect(responseData.length).toBe(data.length);
    expect(isEnd).toBe(true);
});

it('can fetch spaces and handle error states', async () => {
    const data = [];

    nock(process.env.REACT_APP_SPACES_ENDPOINT)
        .get('/?page=100')
        .replyWithError('error');
    
    const {
        data: responseData,
        isEnd,
        error
    } = await m({page: 100, seen: 0});

    expect(responseData.length).toBe(0);
    expect(error).toBeDefined();
    expect(isEnd).toBe(true);
});