import LocalStorageAPI from "../api/localstorage";
import { Beer } from "../types";
import { concatUniquely } from "../utils";

const saveToLocalStorageBeerDB = (input: Beer[]) => {
  let data = JSON.parse(LocalStorageAPI.getItem("beerData") || "[]");
  LocalStorageAPI.setItem(
    "beerData",
    JSON.stringify(concatUniquely(input, data))
  );
};

const getLocalStorageBeerDB = () => {
  return JSON.parse(LocalStorageAPI.getItem("beerData") || "[]");
};

const saveToLocalStorageFavouriteBeer = (input: Beer) => {
  let data = JSON.parse(LocalStorageAPI.getItem("favBeerData") || "[]");
  LocalStorageAPI.setItem(
    "favBeerData",
    JSON.stringify(concatUniquely([input], data))
  );
};

const saveToLocalStorageFavouriteBeers = (input: Beer[]) => {
  LocalStorageAPI.setItem("favBeerData", JSON.stringify(input));
};

const getLocalStorageBeers = () => {
  return JSON.parse(LocalStorageAPI.getItem("favBeerData") || "[]");
};

const getLocalStorageBeer = (id: string) => {
  return JSON.parse(LocalStorageAPI.getItem("beerData") || "[]").filter((x: Beer) => x.id === id)[0];
};

const removeLocalStorageFavouriteBeer = (input: Beer) => {
  let data: Beer[] = JSON.parse(LocalStorageAPI.getItem("favBeerData") || "[]");
  data = data.filter((item: Beer) => {
    return item.id !== input.id;
  });
  LocalStorageAPI.setItem("favBeerData", JSON.stringify(data));
};

export {
  saveToLocalStorageBeerDB,
  getLocalStorageBeerDB,
  saveToLocalStorageFavouriteBeer,
  saveToLocalStorageFavouriteBeers,
  getLocalStorageBeers,
  getLocalStorageBeer,
  removeLocalStorageFavouriteBeer,
};
