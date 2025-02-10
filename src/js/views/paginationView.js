import View from './view.js';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    // Page 1, and there are other pages
    if (curPage === 1 && numPages > 1) {
      return this._generateMarkupButton() + this._generateMarkupPage();
    }
    // Last page
    if (curPage === numPages) {
      return this._generateMarkupButton('prev') + this._generateMarkupPage();
    }
    // Other page
    if (curPage < numPages) {
      return (
        this._generateMarkupButton('prev') +
        this._generateMarkupButton() +
        this._generateMarkupPage()
      );
    }
    // Page 1, and there are NO other pages
    return this._generateMarkupPage();
  }

  _generateMarkupButton(direction = 'next') {
    const curPage = this._data.page;
    let destinationPage = curPage + 1;
    let arrow = 'right';

    if (direction === 'prev') {
      destinationPage = curPage - 1;
      arrow = 'left';
    }

    return `<button data-goto="${destinationPage}" class="btn--inline pagination__btn--${direction}">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-${arrow}"></use>
            </svg>
            <span>Page ${destinationPage}</span>
          </button>`;
  }

  _generateMarkupPage() {
    const curPage = this._data.page;

    return `<br><br><br><h2 class="heading--3"><b>${curPage}</b></h2>`;
  }
}

export default new PaginationView();
