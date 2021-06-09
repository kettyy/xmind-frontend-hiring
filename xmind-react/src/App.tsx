import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Loadable from "react-loadable";
import styles from "./App.module.scss";
import { ConfigProvider } from "antd";
import zhCN from "antd/lib/locale/zh_CN";

const Bill = Loadable({
  loader: () => import("./routers/Bill"),
  loading: () => null,
});

function App() {
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.app}>
        <Switch>
          <Route path="/bill" component={Bill} />
          <Redirect from="/" to={{ pathname: "/bill" }} exact />
        </Switch>
      </div>
    </ConfigProvider>
  );
}

export default App;
