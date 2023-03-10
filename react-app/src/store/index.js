import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session'
import postReducer from './post';
import postMapDataReducer from './postedmaps';
import commentReducer from './comment'
import likeDislikeReducer from './likesdislikes';
import characterReducer from './character';

const rootReducer = combineReducers({
  session: sessionReducer,
  post: postReducer,
  comment: commentReducer,
  postMap: postMapDataReducer,
  reaction: likeDislikeReducer,
  character: characterReducer,
  likeDislike: likeDislikeReducer
});


let enhancer;

if (process.env.NODE_ENV === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = require('redux-logger').default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
