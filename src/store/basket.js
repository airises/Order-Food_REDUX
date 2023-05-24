import { fetchRequest } from "../lib/fetchAPI";

const initialState = {
  basketData: [],
  totalAmount: 0,
  amount: 0,
};

export const basketActionTypes = {
  GET_BASKET: "GET_BASKET",
  INCREMENT_BASKET_ITEM: "INCREMENT_BASKET_ITEM",
  DECREMENT_BASKET_ITEM: "DECREMENT_BASKET_ITEM",
  DEELETE_BASKET_ITEM: "DELETE_BASKET_ITEM",
};

export const basketReducer = (state = initialState, action) => {
  switch (action.type) {
    case basketActionTypes.GET_BASKET:
      return {
        ...state,
        basketData: action.payload,
      };

    case basketActionTypes.INCREMENT_BASKET_ITEM:
      return {
        ...state,
        basketData: action.payload,
      };
    default:
      return state;
  }
};

export const getBasket = () => {
  return async (dispatch) => {
    try {
      const response = await fetchRequest(`/basket`);
      dispatch({ type: basketActionTypes.GET_BASKET, payload: response.items });
    } catch (error) {
      new Error(error);
    }
  };
};
export const updateBasketItem = (id, amount) => async (dispatch) => {
  console.log("id: ", id);

  try {
    const responce = await fetchRequest(`/basketitem/${id}/update`, {
      method: "PUT",
      body: { amount: amount + 1 },
    });

    dispatch(getBasket());

    return responce.items;
  } catch (error) {
    new Error(error);
  }
};

export function deleteBasketItem(id, amount) {
  return async (dispatch) => {
    if (amount !== 0) {
      const responce = await fetchRequest(`/basketItem/${id}/update`, {
        method: "PUT",
        body: { amount: amount },
      });

      dispatch(getBasket());

      return responce.items;
    } else {
      const responce = await fetchRequest(`/basketItem/${id}/delete`, {
        method: "DELETE",
      });

      dispatch(getBasket());

      return responce.items;
    }
  };
}
