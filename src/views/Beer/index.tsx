import { useEffect, useState } from "react";
import { Beer as IBeer } from "../../types";
import { fetchData } from "./utils";
import { useParams } from "react-router-dom";
import { Button, Paper } from "@mui/material";
import styles from "./Beer.module.css";
import { useAppContext } from "../../context/appContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import CallIcon from "@mui/icons-material/Call";
import LanguageIcon from "@mui/icons-material/Language";
import classnames from "classnames";
import { isOnline } from "../../context/utils";

const beerInfoFieldCreator = (object: any, title: string) => {
  let fields = [];
  for (let key of Object.keys(object)) {
    let foundKey = "";
    switch (key) {
      case "id":
        foundKey = "ID";
        break;
      case "name":
        foundKey = "Name";
        break;
      case "brewery_type":
        foundKey = "Brewery Type";
        break;
      case "address_1":
        foundKey = "Address 1";
        break;
      case "address_2":
        foundKey = "Address 2";
        break;
      case "address_3":
        foundKey = "Address 3";
        break;
      case "city":
        foundKey = "City";
        break;
      case "state_province":
        foundKey = "State/Province";
        break;
      case "postal_code":
        foundKey = "Postal Code";
        break;
      case "country":
        foundKey = "Country";
        break;
      case "longitude":
        foundKey = "Longitude";
        break;
      case "latitude":
        foundKey = "Latitude";
        break;
      case "phone":
        foundKey = "Phone";
        break;
      case "website_url":
        foundKey = "Website URL";
        break;
      case "state":
        foundKey = "State";
        break;
      case "street":
        foundKey = "Street";
        break;
      default:
        foundKey = "Unknown";
    }
    if (foundKey !== "" && object[key]) {
      fields.push(
        <>
          <span>
            <b>{foundKey}: </b> {object[key]}
          </span>
          <br />
        </>
      );
    }
  }
  let result = (
    <Paper className={styles.propertyWrapper}>
      <h3 className="hNoTopMargin">{title}</h3>
      {fields}
    </Paper>
  );
  return result;
};

const Beer = () => {
  const { id } = useParams();
  const [beer, setBeer] = useState<IBeer>();
  const [isLoading, setIsLoading] = useState(true);
  const {
    setTitleData,
    isFavourite,
    addFavouiteBeerData,
    removeFavouiteBeerData,
    getOfflineBeerbyId,
  } = useAppContext();

  useEffect(() => {
    setTitleData(beer?.name || "Loading product information...");
  }, [beer?.name, id, setTitleData]);

  useEffect(() => {
    if (id) {
      if (isOnline()) {
        const fetchDataAndSetBeer = async () => {
          await fetchData(setBeer, () => setIsLoading(false), id);
        };
        fetchDataAndSetBeer();
      } else {
        console.log(getOfflineBeerbyId(id));
        setBeer(getOfflineBeerbyId(id));
        setIsLoading(false);
      }
    }
  }, [getOfflineBeerbyId, id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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

  const onCallClick = () => (window.location.href = `tel:${beer?.phone}`);

  return (
    <article>
      <section>
        <header>
          <h1>{beer?.name}</h1>
        </header>
        <main>
          <Paper
            className={classnames(styles.propertyWrapper, styles.flexContainer)}
          >
            <Button
              key="f-btn"
              variant={isFavourite(beer!) ? "outlined" : "contained"}
              onClick={(e) => toggleFavourite(e, beer!)}
              startIcon={<FavoriteIcon />}
            >
              {isFavourite(beer!)
                ? "Remove from Favourites"
                : "Add to Favourites"}
            </Button>
            {beer?.phone && (
              <Button
                key="c-btn"
                variant="contained"
                onClick={() => onCallClick()}
                startIcon={<CallIcon />}
              >
                Call
              </Button>
            )}
            {beer?.website_url && (
              <Button
                key="w-btn"
                variant="contained"
                onClick={() => window.open(beer?.website_url, "_blank")}
                startIcon={<LanguageIcon />}
              >
                WEB
              </Button>
            )}
          </Paper>
          {beerInfoFieldCreator(
            {
              name: beer?.name,
              id: beer?.id,
            },
            "Product Information"
          )}
          {beerInfoFieldCreator(
            {
              brewery_type: beer?.brewery_type,
              address_1: beer?.address_1,
              address_2: beer?.address_2,
              address_3: beer?.address_3,
              city: beer?.city,
              state_province: beer?.state_province,
              postal_code: beer?.postal_code,
              country: beer?.country,
              longitude: beer?.longitude,
              latitude: beer?.latitude,
              phone: beer?.phone,
              website_url: beer?.website_url,
              state: beer?.state,
              street: beer?.street,
            },
            "Factory Information"
          )}
        </main>
      </section>
    </article>
  );
};

export default Beer;
