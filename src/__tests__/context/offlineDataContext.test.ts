import LocalStorageAPI from "../../api/localstorage";
import { saveToLocalStorageBeerDB, getLocalStorageBeerDB, saveToLocalStorageFavouriteBeer, saveToLocalStorageFavouriteBeers, getLocalStorageBeers, getLocalStorageBeer, removeLocalStorageFavouriteBeer } from "../../context/offlineDataContext";
import { Beer } from "../../types";

const mockBeers: Beer[] = [
    {
      id: '1',
      name: 'Test Beer 1',
      brewery_type: 'micro',
      address_1: '123 Main St',
      address_2: 'Suite 100',
      address_3: '',
      city: 'Test City',
      state_province: 'Test State',
      postal_code: '12345',
      country: 'Test Country',
      longitude: '12.3456',
      latitude: '65.4321',
      phone: '555-1234',
      website_url: 'https://test.com',
      state: 'Test State',
      street: '123 Main St',
    },
    {
      id: '2',
      name: 'Test Beer 2',
      brewery_type: 'regional',
      address_1: '456 Main St',
      address_2: '',
      address_3: '',
      city: 'Test City 2',
      state_province: 'Test State 2',
      postal_code: '67890',
      country: 'Test Country 2',
      longitude: '98.7654',
      latitude: '43.2100',
      phone: '555-5678',
      website_url: 'https://test2.com',
      state: 'Test State 2',
      street: '456 Main St',
    },
  ];
  

jest.mock('../../api/localstorage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe("localStorage", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("saveToLocalStorageBeerDB should save the given beers to local storage", () => {
    const input = mockBeers;
    LocalStorageAPI.getItem.mockReturnValueOnce("[]");
    saveToLocalStorageBeerDB(input);
    expect(LocalStorageAPI.setItem).toHaveBeenCalledWith(
      "beerData",
      JSON.stringify(input)
    );
  });

  it("getLocalStorageBeerDB should return the beers saved in local storage", () => {
    const data = mockBeers;
    LocalStorageAPI.getItem.mockReturnValueOnce(JSON.stringify(data));
    const result = getLocalStorageBeerDB();
    expect(result).toEqual(data);
  });

  it("saveToLocalStorageFavouriteBeer should save the given beer to the list of favourite beers in local storage", () => {
    const input = mockBeers[0];
    LocalStorageAPI.getItem.mockReturnValueOnce("[]");
    saveToLocalStorageFavouriteBeer(input);
    expect(LocalStorageAPI.setItem).toHaveBeenCalledWith(
      "favBeerData",
      JSON.stringify([input])
    );
  });

  it("saveToLocalStorageFavouriteBeers should save the given beers to the list of favourite beers in local storage", () => {
    const input = mockBeers;
    saveToLocalStorageFavouriteBeers(input);
    expect(LocalStorageAPI.setItem).toHaveBeenCalledWith(
      "favBeerData",
      JSON.stringify(input)
    );
  });

  it("getLocalStorageBeers should return the list of favourite beers saved in local storage", () => {
    const data = mockBeers;
    LocalStorageAPI.getItem.mockReturnValueOnce(JSON.stringify(data));
    const result = getLocalStorageBeers();
    expect(result).toEqual(data);
  });

  it("getLocalStorageBeer should return the beer with the given id saved in local storage", () => {
    const data = mockBeers;
    LocalStorageAPI.getItem.mockReturnValueOnce(JSON.stringify(data));
    const result = getLocalStorageBeer("1");
    expect(result).toEqual(data[0]);
  });

  it("removeLocalStorageFavouriteBeer should remove the given beer from the list of favourite beers in local storage", () => {
    const data = mockBeers;
    LocalStorageAPI.getItem.mockReturnValueOnce(JSON.stringify(data));
    removeLocalStorageFavouriteBeer(data[0]);
    expect(LocalStorageAPI.setItem).toHaveBeenCalledWith(
      "favBeerData",
      JSON.stringify([mockBeers[1]])
    );
  });
});
