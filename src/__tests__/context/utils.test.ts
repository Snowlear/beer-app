import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { API } from '../../api/config';
import { fetchBeerList, fetchServerDataStatistics } from '../../context/utils';

const mock = new MockAdapter(axios);

describe('utils', () => {
  afterEach(() => {
    mock.reset();
  });

  it('fetchServerDataStatistics should make a GET request to the correct endpoint with the given params and call setDataStatistics with the response data', async () => {
    const setDataStatistics = jest.fn();
    const pageNumber = 2;
    const order = 'name,name:asc';
    const filterName = 'test';
    mock
      .onGet(`${API}breweries/meta/`, {
        params: { page: pageNumber, sort: order, by_name: filterName },
      })
      .reply(200, { data: 'data' });
    await fetchServerDataStatistics(
      setDataStatistics,
      pageNumber,
      order,
      filterName
    );
    expect(setDataStatistics).toHaveBeenCalledWith({ data: 'data' });
  });

  it('fetchBeerList should make a GET request to the correct endpoint with the given params and call setBeerData with the response data', async () => {
    const setBeerData = jest.fn();
    const pageNumber = 2;
    const order = 'name,name:asc';
    const filterName = 'test';
    mock
      .onGet(`${API}breweries/`, {
        params: { page: pageNumber, sort: order, by_name: filterName },
      })
      .reply(200, { data: 'data' });
    await fetchBeerList(setBeerData, pageNumber, order, filterName);
    expect(setBeerData).toHaveBeenCalledWith({ data: 'data' });
  });
});
