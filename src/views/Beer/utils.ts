import { getBeer } from "../../api";
import { Beer } from "../../types";
import handle from "../../utils/error";

const fetchData = async (
  setData: (data: Beer) => void,
  callback: () => void,
  id?: string
) => {
  if (!id) return;

  try {
    const response = await getBeer(id);
    setData(response.data);
  } catch (error) {
    handle(error);
  }
  callback();
};

export { fetchData };
