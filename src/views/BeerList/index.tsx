import { useEffect, useState } from "react";
import {
  Avatar,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  MenuItem,
  Pagination,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import SportsBar from "@mui/icons-material/SportsBar";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/appContext";
import FavoriteIcon from "@mui/icons-material/Favorite";
import styles from "./BeerList.module.css";

const BeerList = () => {
  const navigate = useNavigate();
  const [filterText, setFilterText] = useState<string>("");
  const [sortOption, setSortOption] = useState<
    "name,name:asc" | "name,name:desc"
  >("name,name:asc");
  const {
    beerData,
    hasChange,
    currentPage,
    dataStatistics,
    setCurrentPage,
    setHasChange,
    setTitleData,
    isFavourite,
    updateBeerData,
    toggleFavourite,
  } = useAppContext();

  useEffect(() => {
    setTitleData("Beer List");
  }, [setTitleData]);

  useEffect(() => {
    if (hasChange) {
      updateBeerData(currentPage, sortOption, filterText);
      setHasChange(false);
    }
  }, [
    currentPage,
    filterText,
    hasChange,
    setHasChange,
    sortOption,
    updateBeerData,
  ]);

  const onBeerClick = (id: string) => navigate(`/beer/${id}`);

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterText(event.target.value);
    setCurrentPage(1);
    setHasChange(true);
  };

  const handleSortChange = (event: SelectChangeEvent<string>) => {
    setSortOption(event.target.value as "name,name:asc" | "name,name:desc");
    setHasChange(true);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    setHasChange(true);
  };

  const totalPageCount = Math.ceil(
    dataStatistics.total / dataStatistics.per_page
  );

  return (
    <article>
      <section>
        <header>
          <h1>BeerList Page</h1>
        </header>
        <main>
          <Paper className={styles.propertyWrapper}>
            <Grid container spacing={2} justifyContent="space-between">
              <Grid item>
                <TextField
                  id="outlined-basic"
                  label="Filter"
                  variant="outlined"
                  onChange={handleFilterChange}
                />
              </Grid>
              <Grid item>
                <Select
                  value={sortOption}
                  label="Sort by"
                  onChange={handleSortChange}
                >
                  <MenuItem value="name,name:asc">Alphabetical (A-Z)</MenuItem>
                  <MenuItem value="name,name:desc">Alphabetical (Z-A)</MenuItem>
                </Select>
              </Grid>
            </Grid>
            {beerData.length > 0 ? (
              <>
                <List>
                  {beerData.map((beer) => (
                    <ListItemButton
                      key={beer.id}
                      onClick={onBeerClick.bind(this, beer.id)}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <SportsBar />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={beer.name}
                        secondary={beer.brewery_type}
                      />
                      <IconButton
                        onClick={(e) => toggleFavourite(e, beer)}
                        aria-label="favourite"
                        color={isFavourite(beer) ? "primary" : "default"}
                      >
                        <FavoriteIcon />
                      </IconButton>
                    </ListItemButton>
                  ))}
                </List>
                <div className={styles.paginationWrapper}>
                  <Pagination
                    count={totalPageCount}
                    page={currentPage}
                    onChange={(_, newPage) => handlePageChange(newPage)}
                  />
                </div>
              </>
            ) : (
              <p>There is no data to be shown.</p>
            )}
          </Paper>
        </main>
      </section>
    </article>
  );
};

export default BeerList;
