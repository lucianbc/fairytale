import { createBrowserHistory } from "history";

export default createBrowserHistory();

export const navigate = url => {
  const history = createBrowserHistory();
  history.push(url);
};
