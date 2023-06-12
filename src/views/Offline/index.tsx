import { useEffect, useState } from "react";
import PortableWifiOffIcon from "@mui/icons-material/PortableWifiOff";
import { Paper } from "@mui/material";
import styles from "./Offline.module.css";
import { useAppContext } from "../../context/appContext";

const Offline = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { setHasChange, setCurrentPage } = useAppContext();

  useEffect(() => {
    const setOnline = () => {
      setIsOnline(true);
      setHasChange(true);
      setCurrentPage(1);
    };
    const setOffline = () => {
      setIsOnline(false);
      setHasChange(true);
      setCurrentPage(1);
    };

    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.addEventListener("online", setOnline);
      window.addEventListener("offline", setOffline);
    };
  }, []);

  return isOnline ? null : (
    <article className={styles.offlineIndicatorWrapper}>
      <Paper className={styles.offlineIndicator}>
        <section>
          <header>
            <h1 className={styles.offlineHeader}>You are offline</h1>
          </header>
          <main className={styles.offlineMainContent}>
            <PortableWifiOffIcon />
            <span>You can only access the data you previously loaded.</span>
          </main>
        </section>
      </Paper>
    </article>
  );
};

export default Offline;
