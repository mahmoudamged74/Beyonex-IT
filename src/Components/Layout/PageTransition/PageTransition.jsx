import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import AppLoader from "../AppLoader/AppLoader";
import NavigationProgress from "../NavigationProgress/NavigationProgress";
import styles from "./PageTransition.module.css";

export default function PageTransition() {
  const location = useLocation();

  return (
    <>
      <NavigationProgress />
      <Suspense fallback={<AppLoader />}>
        <div key={location.pathname} className={styles.pageWrap}>
          <Outlet />
        </div>
      </Suspense>
    </>
  );
}
