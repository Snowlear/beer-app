import { Beer, DataStatistics } from "../types";
import { getBeerList, getServerDataStatics } from "../api";
import handle from "../utils/error";

const fetchServerDataStatistics = async (
  setDataStatistics: (data: DataStatistics) => void,
  pageNumber: number,
  order?: "name,name:asc" | "name,name:desc",
  filterName?: string
) => {
  try {
    const response = await getServerDataStatics({
      page: pageNumber,
      sort: order,
      by_name: filterName,
    });
    setDataStatistics(response.data);
  } catch (error) {
    handle(error);
  }
};

const fetchBeerList = async (
  setBeerData: (data: Beer[]) => void,
  pageNumber: number,
  order?: "name,name:asc" | "name,name:desc",
  filterName?: string
): Promise<Beer[]> => {
  try {
    const response = await getBeerList({
      page: pageNumber,
      sort: order,
      by_name: filterName,
    });
    setBeerData(response.data);
    return response.data;
  } catch (error) {
    handle(error);
    return [];
  }
};

const isOnline = () => {
  return navigator.onLine;
};

export { fetchServerDataStatistics, fetchBeerList, isOnline };
