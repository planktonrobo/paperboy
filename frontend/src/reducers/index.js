import { combineReducers } from 'redux';
import archives from './archives';
import auth from "./auth";
import { posts, selectedSubreddit, postsBySubreddit} from './posts';
import sum from './summary';

export default combineReducers({
    archives,
    auth,
    posts,
    selectedSubreddit,
    postsBySubreddit,
    sum

});