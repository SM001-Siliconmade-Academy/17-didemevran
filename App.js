import { StyleSheet } from "react-native";
import MainRouter from "./src/routes/MainRouter";
import { Provider } from "react-redux";
import { store } from "./src/app/store";

export default function App() {
  return (
    <Provider store={store}>
      <MainRouter />
    </Provider>
  );
}

const styles = StyleSheet.create({});
