// @ts-check
const { test, expect } = require('@playwright/test');


const { DATA } = require('../builders/DATA')
const { LOGINPAGE } = require('../page/loginPage')
const { MESSAGE_PAGE } = require('../builders/messages')

test.describe('Pruebas en Swag Labs', () => {

  test.beforeEach(async ({ page }) => {
    const datos = new DATA()

    await page.goto(datos.URL)
  })


  test('Prueba de Login', async ({ page }) => {
    const datos = new DATA()
    const login = new LOGINPAGE(page)


    let usuario = datos.LoginValido.user
    let clave = datos.LoginValido.pass

    await login.LoginValido(usuario, clave)

  });

  test('Login Usuario bloqueado', async ({ page }) => {
    const datos = new DATA()
    const message = new MESSAGE_PAGE()
    const login = new LOGINPAGE(page)

    let mensaje = message.lockedMessage
    let usuario = datos.lockedUser.user
    let clave = datos.LoginValido.pass

    await login.LockedUser(usuario, clave, mensaje)

  })

  test('UseName vacío - Error', async ({ page }) => {
    const datos = new DATA()
    const message = new MESSAGE_PAGE()
    const login = new LOGINPAGE(page)

    let mensaje = message.userNameEmpty
    let clave = datos.LoginValido.pass

    await login.UserNameEmpty(clave, mensaje)

  })




});
