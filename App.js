import React from "react";
import {
  NativeBaseProvider,
  Center,
  HStack,
  Button,
  Text,
  Switch,
} from "native-base";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import { useDispatch, useSelector } from "react-redux";
import thunk from "redux-thunk";

// Part1: Defint Action Type Constant
const SET_COUNTER = "SET_COUNTER";
const TOGGLE_COLOR_MODE = "TOGGLE_COLOR_MODE";
const Increase_Counter = "Increase_Counter";
const Decrease_counter = "Decrease_counter";

// Part2: Define Actions
const setCounter = (counter) => (dispatch) => {
  dispatch({
    type: SET_COUNTER,
    payload: counter,
  });
};
const inCreeaseCounter = (incounter) => (dispatch) => {
  dispatch({
    type: Increase_Counter,
    payload: incounter,
  });
};

const DecressCounter = (decounter) => (dispatch) => {
  dispatch({
    type: Decrease_counter,
    payload: decounter,
  });
};

const toggleColorMode = () => (dispatch) => {
  dispatch({
    type: TOGGLE_COLOR_MODE,
  });
};

// Part3: Define Reducers
const initialCounter = { counter: 0 };
const initialColorMode = { colorMode: "light" };
const initialINcounter = { incounter: 1 };
const initialDecounter = { decounter: -1 };

const counterReducer = (state = initialCounter, action) => {
  switch (action.type) {
    case SET_COUNTER:
      return { counter: action.payload };

    default:
      return state;
  }
};

const incounterReducer = (state = initialINcounter, action) => {
  switch (action.type) {
    case Increase_Counter:
      return { incounter: action.payload };

    default:
      return state;
  }
};

const decounterReducer = (state = initialDecounter, action) => {
  switch (action.type) {
    case Decrease_counter:
      return { decounter: action.payload };

    default:
      return state;
  }
};

const colorModeReducer = (state = initialColorMode, action) => {
  switch (action.type) {
    case TOGGLE_COLOR_MODE:
      const colorMode = state.colorMode == "light" ? "dark" : "light";
      return { colorMode };

    default:
      return state;
  }
};

// Part4: Combine Reducers and Create a Store
const reducer = combineReducers({
  counter: counterReducer,
  incounter: incounterReducer,
  decounter: decounterReducer,
  colorMode: colorModeReducer,
});

const store = createStore(reducer, applyMiddleware(thunk));

// Then, you can use the redux state management by
// get states by useSelector
// send actions by useDispatch
const Screen = () => {
  // Get states from store
  const { counter } = useSelector((state) => state.counter);
  const { colorMode } = useSelector((state) => state.colorMode);
  const { incounter } = useSelector((state) => state.incounter);
  const { decounter } = useSelector((state) => state.decounter);
  // Define a dispatch to send actions
  const dispatch = useDispatch();

  return (
    <NativeBaseProvider>
      <Center flex={1} bg={colorMode == "light" ? "white" : "black"}>
        <HStack space={20}>
          <Button
            borderRadius={0}
            width={70}
            onPress={() => dispatch(setCounter(counter + incounter))}
          >
            <Text
              fontSize={40}
              color={colorMode == "light" ? "white" : "black"}
            >
              +
            </Text>
          </Button>
          <Button
            borderRadius={0}
            width={70}
            onPress={() => dispatch(setCounter(counter + decounter))}
          >
            <Text
              fontSize={40}
              color={colorMode == "light" ? "white" : "black"}
            >
              -
            </Text>
          </Button>
        </HStack>
        <Text
          fontSize={40}
          mt={20}
          color={colorMode == "dark" ? "white" : "black"}
        >
          {counter}
        </Text>
        {/* <HStack mt={20} space={8} alignItems="center">
          <Text fontSize="lg" color={colorMode == "dark" ? "white" : "black"}>
            {colorMode == "light" ? "Light Mode" : "Dark Mode"}
          </Text>
          <Switch
            name="light Mode"
            isChecked={colorMode === "light"}
            onToggle={() => dispatch(toggleColorMode())}
            accessibilityLabel="display-mode"
            accessibilityHint="light or dark mode"
          />
        </HStack> */}
      </Center>
    </NativeBaseProvider>
  );
};

// Wrap whole screen in a provider
const App = () => {
  return (
    <Provider store={store}>
      <Screen />
    </Provider>
  );
};

export default App;
