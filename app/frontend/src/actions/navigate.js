import { createBrowserHistory } from "history";

const history = createBrowserHistory();

export default history;

export const navigate = url => {
  history.push(url);
};
