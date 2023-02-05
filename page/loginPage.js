const { expect } = require('@playwright/test');

class LOGINPAGE {

    constructor(page) {
        this.page = page
        this.logo = '.login_logo'

        this.userName = '#user-name'
        this.password = '#password'
        this.btnLogin = '#login-button'

        this.loginMessage = 'div.error'


    }

    async LoginValido(USER, PASS) {
        const page = this.page
        expect(page.locator(this.logo)).toHaveClass('login_logo');
        expect(page.locator(this.userName)).toBeEmpty();
        expect(page.locator(this.password)).toBeEmpty();


        await page.locator(this.userName).fill(USER)
        await page.locator(this.password).fill(PASS)
        await page.locator(this.btnLogin).click()

    }

    async LockedUser(USER, PASS, MESSAGE) {
        const page = this.page
        expect(await page.locator(this.userName)).toHaveAttribute('placeholder', 'Username')
        expect(await page.locator(this.userName)).toBeEditable()
        expect(await page.locator(this.userName)).toBeVisible()
        expect(await page.locator(this.userName)).toHaveCSS('font-size', '18px')

        await page.locator(this.userName).fill(USER);
        await page.locator(this.password).fill(PASS);
        expect(await page.locator(this.userName)).not.toBeEmpty()
        expect(await page.locator(this.password)).not.toBeEmpty()
        expect(await page.locator(this.btnLogin)).toBeEnabled()
        await page.locator(this.btnLogin).click()

        let LockedMessage = await page.locator(this.loginMessage).textContent()
        expect(LockedMessage === MESSAGE).toBeTruthy()
    }

    async UserNameEmpty(PASS,MESSAGE){
        const page = this.page

        expect(await page.locator(this.userName)).toBeEmpty()
        expect(await page.locator(this.userName)).toBeVisible({visible:true})
        expect(await page.locator(this.userName)).toHaveId('user-name')
        expect(await page.locator(this.userName)).toHaveCSS('color','rgb(72, 76, 85)')
        expect(await page.locator(this.userName)).toHaveCSS('font-family','Roboto, Arial, Helvetica, sans-serif')

        await page.locator(this.password).fill(PASS);
        expect(await page.locator(this.password)).not.toBeEmpty()
        expect(await page.locator(this.btnLogin)).toBeEnabled()
        await page.locator(this.btnLogin).click()

        expect(await page.locator(this.loginMessage)).toHaveCSS('background-color','rgb(226, 35, 26)')
        let LockedMessage = await page.locator(this.loginMessage).textContent()
        console.log(LockedMessage)
        expect(LockedMessage === MESSAGE).toBeTruthy()
    }



}

module.exports = { LOGINPAGE } 