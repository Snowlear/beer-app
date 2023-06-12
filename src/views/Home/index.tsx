import { useEffect, useState } from "react";
import { Beer } from "../../types";
import { Link as RouterLink } from "react-router-dom";
import { Button, Checkbox, Paper, Link } from "@mui/material";
import styles from "./Home.module.css";
import { useAppContext } from "../../context/appContext";

const Home = () => {
  const { setTitleData, getFavoriteBeerData, setFavouiteBeerData } =
    useAppContext();
  const [selectedBeers, setSelectedBeers] = useState<Beer[]>([]);

  const toggleSelectedItem = (isChecked: boolean, beer: Beer) => {
    if (isChecked) {
      setSelectedBeers((prevSelectedBeers) => [...prevSelectedBeers, beer]);
    } else {
      setSelectedBeers((prevSelectedBeers) =>
        prevSelectedBeers.filter((item) => item.id !== beer.id)
      );
    }
  };

  const handleFavoruiteClean = () => {
    let beers = getFavoriteBeerData();
    console.log(selectedBeers);
    if (selectedBeers.length > 0) {
      beers = beers.filter((item) => !selectedBeers.some((x) => x.id === item.id));
    } else {
      beers = [];
    }
    
    console.log(beers);
    setFavouiteBeerData(beers);
    setSelectedBeers([]);
  };

  useEffect(() => {
    setTitleData("Home");
  }, [setTitleData]);

  return (
    <article>
      <section>
        <main>
          <Paper>
            <div className={styles.listContainer}>
              <div className={styles.listHeader}>
                <h3>Favourite Items</h3>
                <Button
                  disabled={getFavoriteBeerData().length < 1}
                  onClick={handleFavoruiteClean}
                  variant={selectedBeers.length > 0 ? "outlined" : "contained"}
                  size="small"
                >
                  {selectedBeers.length > 0
                    ? "Remove Selected " + selectedBeers.length + " Beers"
                    : "Remove All Favourite Beers"}
                </Button>
              </div>
              <ul className={styles.list}>
                {getFavoriteBeerData().map((beer, index) => (
                  <li key={beer.id + index.toString()}>
                    <Checkbox
                      onChange={(event) =>
                        toggleSelectedItem(event.target.checked, beer)
                      }
                    />
                    <Link component={RouterLink} to={`/beer/${beer.id}`}>
                      {beer.name}
                    </Link>
                  </li>
                ))}
                {!getFavoriteBeerData().length && <p>No saved items</p>}
              </ul>
            </div>
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default Home;
