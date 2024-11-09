import Sidebar from "../Sidebar";
import styles from "./AppLayout.module.css";
import Map from "../Map";
import User from "../User";

const AppLayout = () => {
  return (
    <div className={styles.app}>
      <Sidebar />
      <Map />
      <User />
    </div>
  );
};

export default AppLayout;
