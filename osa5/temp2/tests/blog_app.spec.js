const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http:localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Matti Luukkainen',
        username: 'mluukkai',
        password: 'salainen'
      }
    })
    await page.goto('http://localhost:5173')
  })
    test('login form is shown', async ({ page }) => {
      const locator = await page.getByText('Log in to application')
      await expect(locator).toBeVisible()
    })

    describe('login tests', () =>{
    test('Succesful login', async ({ page }) => {
      await page.getByRole('textbox').first().fill('AHAHAAAAAA')
      await page.getByRole('textbox').last().fill('1111')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('create New blogs')).toBeVisible()
    })

    test('login fails', async ({ page }) => {
      await page.getByRole('textbox').first().fill('mluukkai')
      await page.getByRole('textbox').last().fill('wrong')
      await page.getByRole('button', { name: 'login' }).click()

      await expect(page.getByText('wrong credentials')).toBeVisible()
    })
  })


  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('AHAHAAAAAA')
      await page.getByRole('textbox').last().fill('1111')
      await page.getByRole('button', { name: 'login' }).click()
    })
  
    test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new Blog' }).click()
      await page.getByTestId('newTitle').fill('testititle')
      await page.getByTestId('newAuthor').fill('testiauthor')
      await page.getByTestId('newUrl').fill('testiurl')
      await page.getByRole('button', { name: 'create'}).click()
      await expect(page.getByText('testititle')).toBeVisible()
    })
  })


  describe('able to like', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('AHAHAAAAAA')
      await page.getByRole('textbox').last().fill('1111')
      await page.getByRole('button', { name: 'login' }).click()
    })
  test('a new blog can be created', async ({ page }) => {
      await page.getByRole('button', { name: 'new Blog' }).click()
      await page.getByTestId('newTitle').fill('testititle')
      await page.getByTestId('newAuthor').fill('testiauthor')
      await page.getByTestId('newUrl').fill('testiurl')
      await page.getByRole('button', { name: 'create'}).click()
      await page.getByRole('button', {name: 'Show' }).last().click()
      await page.getByRole('button', {name: 'Like' }).click()
      await expect(page.getByText('likes : 1')).toBeVisible()
    })
  })

  describe('able to delete', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('AHAHAAAAAA')
      await page.getByRole('textbox').last().fill('1111')
      await page.getByRole('button', { name: 'login' }).click()
      
    })
  test('able to delete', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', {name: 'Show' }).last().click()
      await page.getByRole('button', {name: 'poista' }).click()
      
    })
  })

  describe('who sees delete button', () => {
    beforeEach(async ({ page }) => {
      await page.getByRole('textbox').first().fill('AHAHAAAAAA')
      await page.getByRole('textbox').last().fill('1111')
      await page.getByRole('button', { name: 'login' }).click()
      
    })
  test('see delete button', async ({ page }) => {
      page.on('dialog', dialog => dialog.accept())
      await page.getByRole('button', {name: 'Show' }).first().click()
      const locator = await page.getByRole('button', {name: 'poista' })
      await expect(locator).toBeVisible()
    })
  })

  
})