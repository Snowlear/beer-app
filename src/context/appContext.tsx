import React, { createContext, useState, useContext, ReactNode } from "react";
import { DataStatistics, Beer as IBeer, SORT } from "../types";
import { fetchBeerList, fetchServerDataStatistics, isOnline } from "./utils";
import {
  getLocalStorageBeerDB,
  getLocalStorageBeer,
  getLocalStorageBeers,
  removeLocalStorageFavouriteBeer,
  saveToLocalStorageBeerDB,
  saveToLocalStorageFavouriteBeer,
  saveToLocalStorageFavouriteBeers,
} from "./offlineDataContext";

interface AppContextType {
  hasChange: boolean;
  dataStatistics: DataStatistics;
  beerData: IBeer[];
  currentPage: number;
  setCurrentPage: (input: number) => void;
  setHasChange: (input: boolean) => void;
  getTitle: () => string;
  setTitleData: (newTitle: string) => void;
  updateBeerData: (
    pageNumber: number,
    order: SORT,
    filterText?: string
  ) => void;
  getOfflineBeerbyId: (id: string) => IBeer;
  getFavoriteBeerData: () => IBeer[];
  addFavouiteBeerData: (newFavoriteBeerData: IBeer) => void;
  setFavouiteBeerData: (newFavoriteBeerDatas: IBeer[]) => void;
  removeFavouiteBeerData: (removeFavouiteBeerData: IBeer) => void;
  isFavourite: (beerData: IBeer) => boolean;
  toggleFavourite: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    beer: IBeer
  ) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hasChange, setHasChange] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [title, setTitle] = useState("");
  const [beerData, setBeerData] = useState<IBeer[]>([]);
  const [favoriteBeerData, setFavoriteBeerData] = useState<IBeer[]>(
    getLocalStorageBeers()
  );
  const [dataStatistics, setDataStatistics] = useState<DataStatistics>({
    per_page: 50,
    total: 0,
  });

  const getTitle = () => title;
  const setTitleData = (newTitle: string) => setTitle(newTitle);
  const updateBeerData = (
    pNumber: number,
    order: SORT,
    filterText?: string
  ) => {
    if (isOnline()) {
      fetchBeerList(setBeerData, pNumber, order, filterText).then(
        (itemsToOffline) => saveToLocalStorageBeerDB(itemsToOffline)
      );
      fetchServerDataStatistics(setDataStatistics, pNumber, order, filterText);
    } else {
      const perPage = 50;
      let offlineBeers: IBeer[] = getLocalStorageBeerDB();
      if (filterText && filterText?.length > 0) {
        offlineBeers = offlineBeers.filter((beer) =>
          beer.name.toLocaleLowerCase().includes(filterText.toLocaleLowerCase())
        );
      }
      if (order) {
        offlineBeers.sort((a, b) => {
          if (order === "name,name:asc") {
            return a.name.localeCompare(b.name);
          } else if (order === "name,name:desc") {
            return b.name.localeCompare(a.name);
          } else {
            return 0;
          }
        });
      }
      const startIndex = (pNumber - 1) * perPage;
      const endIndex = startIndex + perPage;
      const paginatedBeers = offlineBeers.slice(startIndex, endIndex);
      setBeerData(paginatedBeers);
      setDataStatistics({
        per_page: perPage,
        total: offlineBeers.length,
      });
    }
  };
  const getOfflineBeerbyId = (id: string): IBeer => {
    return getLocalStorageBeer(id);
  };
  const getFavoriteBeerData = () => {
    if (isOnline()) {
      return favoriteBeerData;
    } else {
      return getLocalStorageBeers();
    }
  };
  const addFavouiteBeerData = (newFavoriteBeerData: IBeer) => {
    setFavoriteBeerData([...favoriteBeerData, newFavoriteBeerData]);
    saveToLocalStorageFavouriteBeer(newFavoriteBeerData);
  };
  const setFavouiteBeerData = (newFavoriteBeerData: IBeer[]) => {
    console.log(newFavoriteBeerData);
    setFavoriteBeerData(newFavoriteBeerData);
    saveToLocalStorageFavouriteBeers(newFavoriteBeerData);
  };
  const toggleFavourite = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    beer: IBeer
  ) => {
    e.stopPropagation();
    if (isFavourite(beer)) {
      removeFavouiteBeerData(beer);
    } else {
      addFavouiteBeerData(beer);
    }
  };
  const removeFavouiteBeerData = (removeFavoriteBeerData: IBeer) => {
    setFavoriteBeerData(
      favoriteBeerData.filter((item: IBeer) => {
        return item.id !== removeFavoriteBeerData.id;
      })
    );
    removeLocalStorageFavouriteBeer(removeFavoriteBeerData);
  };
  const isFavourite = (beer: IBeer) => {
    return favoriteBeerData.some((item) => item.id === beer.id);
  };

  const contextValues: AppContextType = {
    hasChange,
    dataStatistics,
    beerData,
    currentPage,
    setHasChange,
    getTitle,
    setTitleData,
    updateBeerData,
    getFavoriteBeerData,
    addFavouiteBeerData: addFavouiteBeerData,
    setFavouiteBeerData,
    removeFavouiteBeerData,
    isFavourite,
    toggleFavourite,
    setCurrentPage,
    getOfflineBeerbyId,
  };

  return (
    <AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
  );
};

const useAppContext = (): AppContextType =>
  useContext(AppContext) as AppContextType;

export { AppProvider, useAppContext };
