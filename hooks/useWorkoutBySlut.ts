import { useState, useEffect } from "react";
import { getWorkoutBySlug, getWorkouts } from "../storage/workout";
import { Workout } from "../types/data";

export const useWorkoutBySlut = (slug: string) => {
  const [workout, setWorkout] = useState<Workout>();

  useEffect(() => {
    async function getData() {
      const _workout = await getWorkoutBySlug(slug);
      setWorkout(_workout);
    }
    getData();
  }, []);

  return workout;
};
