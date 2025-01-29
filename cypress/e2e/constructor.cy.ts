import Cypress from 'cypress';


const baseUrl = 'http://localhost:4000';
const getUserUrl = 'api/auth/user';
const orderUrl = 'api/orders';
const addButtonBun =
  '[data-cy=ingredient-item-643d69a5c3f7b9001cfa093d] button[type=button]';
const addButtonIngredient =
  '[data-cy=ingredient-item-643d69a5c3f7b9001cfa0943] button[type=button]';

describe('Конструктор бургера и создание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredient.json'
    }).as('getIngredients');
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

      // Проверяем, что булка отсутствует в конструкторе
      cy.get('[data-cy=bun-top]').should('not.exist');
      cy.get('[data-cy=bun-bottom]').should('not.exist');

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

      // Проверяем, что основной ингредиент отсутствует в конструкторе
      cy.get('[data-cy=between-buns]').should('not.exist'); // Ожидаем, что соус отсутствует

      // Добавление основного ингредиента
      cy.get(addButtonIngredient).click();
      // Проверка добавленного ингредиента
      cy.get('[data-cy=between-buns]')
        .contains('Соус фирменный Space Sauce')
        .should('exist');
    });

    it('открытие и закрытие модального окна ингредиента', () => {
      cy.wait('@getIngredients');

      // Проверка, что модальное окно отсутствует перед открытием
      cy.get('[data-cy=modal-content]').should('not.exist');

      //Клик по ингредиенту
      cy.get(addButtonBun).click(); //
      // Проверка, что модальное окно открыто
      cy.get('[data-cy=ingredient-link-643d69a5c3f7b9001cfa0943]')
        .click()
        .then(() => {
          cy.get('[data-cy=modal-content]').should('exist');
        });
      // Проверка, что в модальном окне содержится нужная информация о ингредиенте
      cy.get('[data-cy=modal-content]')
        .contains('Соус фирменный Space Sauce')
        .should('exist'); // Проверка наличия названия

      // Проверка, что в модальном окне содержится детальная информация
      cy.get('[data-cy=modal-content]')
        .contains('Детали ингредиента')
        .should('exist');

      // Закрытие модального окна
      cy.get('[data-cy=modal-content] button[type=button]').click();
      // Проверка отсутствия модала
      cy.get('[data-cy=modal-content]').should('not.exist');
    });

    it('should close modal on overlay click', () => {
      cy.wait('@getIngredients');

      // Проверка, что модальное окно отсутствует перед открытием
      cy.get('[data-cy=modal-content]').should('not.exist');

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
