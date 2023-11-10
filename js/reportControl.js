import { financeControl } from "./financeControl.js";
import { clearChart, generateChart } from "./generateChart.js";
import { reformateDate } from "./helpers.js";
import { OverlayScrollbars } from "./overlayscrollbars.esm.min.js";
import { delData, getData } from "./service.js";

const typesOperation = {
  income: 'приход',
  expenses: 'расход',
};

let actualData = [];

const financeReport = document.querySelector('.finance__report');
const report = document.querySelector('.report');
const reportOperationList = document.querySelector('.report__operation-list');
const reportDates = document.querySelector('.report__dates');
const generateChartButton = document.querySelector('#generateChartButton');

OverlayScrollbars(report, {});

const closeReport = ({target}) => {
  if (!target.closest('.report') && target !== financeReport || target.closest('.report__close')) {
    
    gsap.to(report, {
      opacity: 0,
      scale: 0,
      duration: 0.5,
      ease: "power2.in",
      onComplete() {
        report.style.visibility = 'hidden';
      }
    });
    
    document.removeEventListener('click', closeReport);
  }
};

const openReport = () => {
  report.style.visibility = 'visible';

  gsap.to(report, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: "power2.out",
  });

  document.addEventListener('click', closeReport);
};

const renderReport = (data) => {
  reportOperationList.textContent = '';

  const reportRows = data.map(({category, amount, description, date, type, id}) => {
    const reportRow = document.createElement('tr');
    reportRow.classList.add('report__row');
    reportRow.innerHTML = `
    <td class="report__cell">${category}</td>
      <td class="report__cell report__cell_amount">${amount.toLocaleString()}&nbsp;₽</td>
      <td class="report__cell">${description}</td>
      <td class="report__cell">${reformateDate(date)}</td>
      <td class="report__cell">${typesOperation[type]}</td>
      <td class="report__action-cell">
        <button class="report__button report__button_table" data-id="${id}">&#10006;</button>
      </td>
      `;

    return reportRow;
  });

  reportOperationList.append(...reportRows);
};

export const reportControl = () => {
  reportOperationList.addEventListener('click', async ({target}) => {
    const btnDel = target.closest('.report__button_table');
    if (btnDel) {
      await delData(`/finance/${btnDel.dataset.id}`);

      const reportRow = btnDel.closest('.report__row');
      reportRow.remove();
      financeControl();
      actualData = await getData('/finance');
      clearChart();
    }
  });

  financeReport.addEventListener('click', async () => {
    const textContent = financeReport.textContent;
    financeReport.textContent = 'Загрузка...';
    financeReport.disabled = true;
  
    actualData = await getData('/finance');
  
    financeReport.textContent = textContent;
    financeReport.disabled = false;
  
    renderReport(actualData);
    clearChart();
    openReport();
  });
  
  reportDates.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const formData = Object.fromEntries(new FormData(reportDates));
  
    const searchParams = new URLSearchParams();
  
    if (formData.startDate) {
      searchParams.append('startDate', formData.startDate);
    }
  
    if (formData.endDate) {
      searchParams.append('endDate', formData.endDate);
    }
  
    const queryString = searchParams.toString();
  
    const url = queryString ? `/finance?${queryString}` : '/finance';
  
    actualData = await getData(url);
  
    renderReport(actualData);
    clearChart();
  });
};

generateChartButton.addEventListener('click', () => {
  generateChart(actualData);
});