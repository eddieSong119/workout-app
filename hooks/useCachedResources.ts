import { useEffect, useState } from "react";
import * as Font from "expo-font";
import data from "../data.json";
import { getData, storeData, containsKey } from "../storage";
import { clearWorkouts, getWorkouts, initWorkouts } from "../storage/workout";

export default function useCachedResources() {
  const [isLoadingComplete, setIsloadingComplete] = useState(false);

  useEffect(() => {
    async function loadResourcesAndData() {
      try {
        // await clearWorkouts();
        await initWorkouts();
        await Font.loadAsync({
          montserrat: require("../assets/fonts/Montserrat-Regular.ttf"),
          "montserrat-bold": require("../assets/fonts/Montserrat-Bold.ttf"),
        });
      } catch (err) {
        console.warn(err);
      } finally {
        // const workouts = await getWorkouts();
        // console.log(workouts);
        setIsloadingComplete(true);
      }
    }

    loadResourcesAndData();
  }, []);

  return isLoadingComplete;
}
