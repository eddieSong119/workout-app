import { containsKey, getData, removeItem, storeData } from "./index";
import data from "../data.json";
import { Workout } from "../types/data";

export const getWorkouts = async (): Promise<Workout[]> => {
  const workouts = await getData("workout-data");
  return workouts;
};

export const getWorkoutBySlug = async (slug: string): Promise<Workout> => {
  const workouts = await getWorkouts();
  const workout = workouts.filter((workout) => workout.slug === slug)[0];
  return workout;
};

/**
 * init the workouts storage
 */
export const initWorkouts = async (): Promise<boolean> => {
  // if there's workout data, don't load it again
  if (!(await containsKey("workout-data"))) {
    // console.log("storing data");
    await storeData("workout-data", data);
    return true;
  } else {
    return false;
  }
};

export const clearWorkouts = async () => {
  await removeItem("workout-data");
};
