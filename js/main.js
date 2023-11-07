import { convertStringNumber } from "./convertStringNumber.js";

const financeReport = document.querySelector('.finance__report');
const financeForm = document.querySelector('.finance__form');
const financeAmount = document.querySelector('.finance__amount');
const report = document.querySelector('.report');

let amount = 0;
financeAmount.textContent = amount;

financeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const typeOperation = e.submitter.dataset.typeOperation;

  const changeAmount = Math.abs(convertStringNumber(financeForm.amount.value));
  
  if (typeOperation === 'income') {
    amount += changeAmount;
  }

  if (typeOperation === 'expenses') {
    amount -= changeAmount;
  }

  financeAmount.textContent = `${amount.toLocaleString()} ₽`; // на русской раскладке значок рубля alt+ctrl+8
});

financeReport.addEventListener('click', (e) => {
  e.preventDefault();
  report.classList.add('report_open');
  
  report.addEventListener('click', ({target}) => {
    console.log('target: ', target);

    if (target.classList.contains('report__close')) {
      report.classList.remove('report_open');
    }
    
  });

});

