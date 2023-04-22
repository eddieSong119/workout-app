import { useEffect, useState } from "react";
import * as Font from "expo-font";
import data from "../data.json";
import { getData, storeData } from "../storage";

export default function useCachedResources() {
  const [isLoadingComplete, setIsloadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        await storeData("workout-data", data);
        await Font.loadAsync({
          montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
          "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        });
      } catch (err) {
        console.warn(err);
      } finally {
        const workouts = await getData("workout-data");
        console.log(workouts);
        setIsloadingComplete(true);
      }
    }

    loadResourcesAndData();
  }, []);

  return isLoadingComplete;
}
