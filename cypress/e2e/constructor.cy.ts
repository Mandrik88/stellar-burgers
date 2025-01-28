import Cypress from 'cypress';


const ingredientData = {
  success: true,
  data: [
    {
      _id: '643d69a5c3f7b9001cfa093d',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa094a',
      name: 'Сыр с астероидной плесенью',
      type: 'main',
      proteins: 84,
      fat: 48,
      carbohydrates: 420,
      calories: 3377,
      price: 4142,
      image: 'https://code.s3.yandex.net/react/code/cheese.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/cheese-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/cheese-large.png',
      __v: 0
    },
    {
      _id: '643d69a5c3f7b9001cfa0943',
      name: 'Соус фирменный Space Sauce',
      type: 'sauce',
      proteins: 50,
      fat: 22,
      carbohydrates: 11,
      calories: 14,
      price: 80,
      image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
      __v: 0
    }
  ]
};
const baseUrl = 'http://localhost:4000';
const getUserUrl = 'api/auth/user';
const orderUrl = 'api/orders';
const addButtonBun =
  '[data-cy=ingredient-item-643d69a5c3f7b9001cfa093d] button[type=button]';
const addButtonIngredient =
  '[data-cy=ingredient-item-643d69a5c3f7b9001cfa0943] button[type=button]';

describe('Конструктор бургера и создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', ingredientData).as(
      'getIngredients'
    );
    cy.intercept('GET', getUserUrl, { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', orderUrl, { fixture: 'order.json' }).as('postOrder');

    window.localStorage.setItem('refreshToken', JSON.stringify('222222222'));
    cy.setCookie('accessToken', JSON.stringify('444444444'));

    cy.visit(baseUrl);
  });

  afterEach(() => {
    cy.clearCookie('refreshToken');
    cy.clearCookie('accessToken');
  });

  describe('Функционал конструктора и создание заказа', () => {
    it('добавляем булки и основной ингредиент в конструктор', () => {
      cy.wait('@getIngredients');
      // Добавление булки
      cy.get(addButtonBun).click();
      // Проверка верхней булки
      cy.get('[data-cy=bun-top]')
        .contains('Флюоресцентная булка R2-D3')
        .should('exist');
      // Проверка нижней булки
      cy.get('[data-cy=bun-bottom]')
        .contains('Флюоресцентная булка R2-D3')
        .should('exist');
      // Добавление основного ингредиента
      cy.get(addButtonIngredient).click();
      // Проверка добавленного ингредиента
      cy.get('[data-cy=between-buns]')
        .contains('Соус фирменный Space Sauce')
        .should('exist');
    });

    it('открытие и закрытие модального окна ингредиента', () => {
      cy.wait('@getIngredients');
      // Открытие модального окна ингредиентов
      cy.get('[data-cy=ingredient-link-643d69a5c3f7b9001cfa0943]').click();
      // Проверка существования модала
      cy.get('[data-cy=modal-content]').should('exist');
      // Закрытие модального окна
      cy.get('[data-cy=modal-content] button[type=button]').click();
      // Проверка отсутствия модала
      cy.get('[data-cy=modal-content]').should('not.exist');
    });

    it('should close modal on overlay click', () => {
      cy.wait('@getIngredients');
      // Открытие модального окна
      cy.get('[data-cy=ingredient-link-643d69a5c3f7b9001cfa0943]').click();
      // Проверка существования модала
      cy.get('[data-cy=modal-content]').should('exist');
      // Закрытие модала кликом на оверлей
      cy.get('[data-cy=modal-overlay]').click('top', { force: true });
      // Проверка отсутствия модала
      cy.get('[data-cy=modal-content]').should('not.exist');
    });
  });

  describe('Создание заказа', () => {
    it('создание заказа и проверка номера заказа', () => {
      cy.wait('@getIngredients');
      // Добавление булки
      cy.get(addButtonBun).click();
      // Добавление основного ингредиента
      cy.get(addButtonIngredient).click();
      // Оформление заказа
      cy.get('[data-cy=making-an-order-button]').click();
      cy.wait('@postOrder');
      // Проверка номера заказа
      cy.get('[data-cy=modal-content]').contains('56565').should('exist');
    });

    it('закрытие модального окна заказа и проверка того, что конструктор пуст', () => {
      cy.wait('@getIngredients');
      // Добавление булки
      cy.get(addButtonBun).click();
      // Добавление основного ингредиента
      cy.get(addButtonIngredient).click();
      // Оформление заказа
      cy.get('[data-cy=making-an-order-button]').click();
      cy.wait('@postOrder');
      // Проверка номера заказа
      cy.get('[data-cy=modal-content]').contains('56565').should('exist');
      // Закрытие модального окна
      cy.get('[data-cy=modal-content] button[type=button]').click();
      // Проверка отсутствия модала
      cy.get('[data-cy=modal-content]').should('not.exist');
      // Проверка отсутствия верхней булки
      cy.get('[data-cy=bun-top]').should('not.exist');
      // Проверка отсутствия нижней булки
      cy.get('[data-cy=bun-bottom]').should('not.exist');
      // Проверка отсутствия ингредиентов
      cy.get('[data-cy=between-buns]').should('not.exist');
    });
  });
});
