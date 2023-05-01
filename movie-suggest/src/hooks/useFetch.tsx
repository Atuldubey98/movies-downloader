import React, { useReducer } from "react";

export default function useFetch<R>() {
  type State = {
    data?: R;
    loading: boolean;
    error?: string;
  };
  type Action =
    | {
        type: "request";
      }
    | { type: "success"; result: R }
    | { type: "failure"; error: string };
  function reducer(state: State, action: Action): State {
    switch (action.type) {
      case "failure":
        return { error: action.error, loading: false };
      case "request":
        return { loading: true, data: state.data };
      case "success":
        return { loading: false, data: action.result };
      default:
        return state;
    }
  }
  const [{ loading, data, error }, dispatch] = useReducer(reducer, {
    loading: false,
  });
  return {
    loading,
    error,
    data,
    dispatch,
  };
}
