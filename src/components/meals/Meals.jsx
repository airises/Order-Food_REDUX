import React, { memo, useEffect } from "react";
import styled from "styled-components";
import MealItem from "./mealItem/MealItem";
import { useDispatch, useSelector } from "react-redux";
import { getMeals } from "../../store/meals";
import { getBasket } from "../../store/basket";
import UseAnimations from "react-useanimations";
import loading from "react-useanimations/lib/loading";

const Meals = () => {
  const { mealsData, isLoading } = useSelector((state) => state.meals);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMeals());
    dispatch(getBasket());
  }, [dispatch]);
  console.log(isLoading);
  return (
    <Container>
      {isLoading ? (
        <UseAnimations animation={loading} size={100} />
      ) : (
        mealsData.map((meal) => <MealItem meal={meal} key={meal.id} />)
      )}
    </Container>
  );
};

const Container = styled.div`
  background-color: #ffff;
  width: 80%;
  margin: 0 auto;
  border-radius: 16px;
  padding: 40px;
`;

export default memo(Meals);
