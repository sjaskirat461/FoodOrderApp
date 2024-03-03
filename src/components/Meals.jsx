import MealItem from './MealItem.jsx';
import useHttp from '../hooks/useHttp.js';
import Error from './Error.jsx';

const requestConfig = {};

export default function Meals() {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp('http://localhost:3000/meals', requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching Data..</p>;
  }

  if (error) {
    console.log(loadedMeals);
    return <Error title="Failed to Load Meals" message={error} />;
  }

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
