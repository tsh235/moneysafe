import { financeControll } from "./financeControll.js"
import { reportControll } from "./reportControll.js";

const init = () => {
  financeControll();
  reportControll();  
};

init();