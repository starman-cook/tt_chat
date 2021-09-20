const assert = require('assert')
const {Given, When, Then} = require('cucumber')
const { Builder, By, until } = require('selenium-webdriver');

Given(/^user "([^"]*)" logged in in browser "([^"]*)"$/, async function (user, browser) {
    if (!this.driver) {
        this.driver = {}
    }
    const logins = {
        "one": "1@1.com",
        "two": "2@2.com"
    }
    const passwords = {
        "one": "1",
        "two": "1"
    }

    this.driver[user] = new Builder()
        .forBrowser('chrome')
        .build();
    await this.driver[user].get('http://localhost:3000');

    this.driver[user].wait(until.elementLocated(By.className('Header')));

    const loginButton = await this.driver[user].findElement(By.xpath('//*[@id="root"]/div[1]/div/div/button[1]'));
    loginButton.click()
    this.driver[user].wait(until.elementLocated(By.xpath('//*[@id="email"]')))

    const emailInput = await this.driver[user].findElement(By.xpath('//*[@id="email"]'));
    // emailInput.click();

    const emailInput1 = await this.driver[user].findElement(By.xpath('//*[@id="email"]'));
    emailInput1.sendKeys(logins[user])

    const passwordInput = await this.driver[user].findElement(By.xpath('//*[@id="password"]'));
    passwordInput.sendKeys(passwords[user])

    const enterButton = await this.driver[user].findElement(By.xpath('//*[@id="root"]/div[2]/form/div[1]/button'));
    enterButton.click()

    this.driver[user].wait(until.elementLocated(By.className('UserIconItem__image')), 3000)
        .then(icon => {
            icon.click()
        })
});
When(/^user "([^"]*)" sends a "([^"]*)" to user "([^"]*)"$/, async function (user, message, interlocutor) {
    const textArea = await this.driver[user].findElement(By.xpath('//*[@id="root"]/div[2]/div/div[2]/div[3]/textarea'));
    textArea.sendKeys(message)

    const sendBtn = await this.driver[user].findElement(By.xpath('//*[@id="root"]/div[2]/div/div[2]/div[3]/button'));
    sendBtn.click()

});
Then(/^user "([^"]*)" sees "([^"]*)"  in the message window$/, async function (user, text) {
    this.driver[user].wait(until.elementLocated(By.xpath(`//*[@id="root"]/div[2]/div/div[2]/div[2]`)), 3000)
        .then(async message => {
            const res = await message.getText()
            const arr = res.split("\n")
            const index = arr.length - 2
            console.log(arr[index])
            console.log(text)
            console.log(arr[index] === text)
        })
});
Then(/^user "([^"]*)" sees "([^"]*)" in the message window$/,async function (user, text) {
    this.driver[user].wait(until.elementLocated(By.xpath(`//*[@id="root"]/div[2]/div/div[2]/div[2]`)), 3000)
        .then(async message => {
            const res = await message.getText()
            const arr = res.split("\n")
            const index = arr.length - 2
            console.log(arr[index])
            console.log(text)
            console.log(arr[index] === text)
        })
});