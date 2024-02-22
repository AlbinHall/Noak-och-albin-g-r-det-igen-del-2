// @ts-check
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('http://127.0.0.1:5500');
});

const TODO_ITEM = 
  'buy some cheese'
;

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');

    // Create 1st todo.
    await newTodo.fill(TODO_ITEM);
    await newTodo.press('Enter');

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEM);
    await newTodo.press('Enter');

    // Make sure the list now has two todo items.

  });

  test('Should check it items count displays correctly', async ({ page }) => {
    // Create 1 items.
    await createDefaultTodo(page);

    // create a todo count locator
    const todoCount = page.locator("#itemsLeft")
  
    // Check test using different methods.
    await expect(page.getByText('1 item left')).toBeVisible();
    await expect(todoCount).toHaveText('1 item left');
    await expect(todoCount).toContainText('1');

    await page.locator(".todoCheckBox").first().click();

    await expect(page.getByText('0 items left')).toBeVisible();
    await expect(todoCount).toHaveText('0 items left');
    await expect(todoCount).toContainText('0');

  });
  const itemList = ["Hejsan svejsan", "tjenare mannen", "tjena tjena tjena"]
  
  test('Check if the item count works with 3 items', async ({ page }) => {
    // create a todo count locator
    await createDefaultTodos(page)
    const todoCount = page.locator("#itemsLeft")
  
    // Check test using different methods.
    await expect(todoCount).toHaveText('3 items left');
  
    await page.locator(".todoCheckBox").first().click();
  
    await expect(page.getByText('2 items left')).toBeVisible();
    await expect(todoCount).toHaveText('2 items left');
    await expect(todoCount).toContainText('2');
  });
  
  async function createDefaultTodo(page) {
    const newTodo = page.getByPlaceholder('What needs to be done?');
  
      await newTodo.fill(TODO_ITEM);
      await newTodo.press('Enter');
    
  }
  
  async function createDefaultTodos(page) {
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?');
  
    for (const item of itemList) {
      await newTodo.fill(item);
      await newTodo.press('Enter');
    }
  }

});

//Lägg till 3 anteckningar, kryssa i en av dem och bekräfta att sidan visar "2 items left".

