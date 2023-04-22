import { StatusBar } from "expo-status-bar";
import useCachedResources from "./hooks/useCachedResources";
import Navigation from "./navigation/index";

export default function App() {
  const isLoaded = useCachedResources();
  console.log(isLoaded);

  if (isLoaded) {
    return (
      <>
        <Navigation />
        <StatusBar style="auto" />
      </>
    );
  } else {
    return null;
  }
}
