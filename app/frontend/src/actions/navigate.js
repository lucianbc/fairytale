import { createHashHistory } from "history";

export const navigate = url => {
  const history = createHashHistory();
  history.push(url);
};
