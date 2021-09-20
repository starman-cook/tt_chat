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
    emailInput.click();

    const emailInput1 = await this.driver[user].findElement(By.xpath('//*[@id="email"]'));
    emailInput1.sendKeys(logins[user])

    const passwordInput = await this.driver[user].findElement(By.xpath('//*[@id="password"]'));
    passwordInput.sendKeys(passwords[user])

    const enterButton = await this.driver[user].findElement(By.xpath('//*[@id="root"]/div[2]/form/div[1]/button'));
    enterButton.click()

    this.driver[user].wait(until.elementLocated(By.className('UserIconItem__image')), 3000)
        .then(icon => {
            console.log(icon)
            icon.click()
        })
});
When(/^user "([^"]*)" sends a "([^"]*)" to user "([^"]*)"$/, function (Who, What, Whom) {

});
Then(/^user "([^"]*)" sees "([^"]*)"  in the message window$/, function () {

});
Then(/^user "([^"]*)" sees "([^"]*)" in the message window$/, function () {

});

// const {Then, When, Given} = require('cucumber');
// const { Builder, By, until } = require('selenium-webdriver');
//
// Given(/^user "([^"]*)" logged in in browser "([^"]*)"$/, async function (user, browser) {
//     if (!this.driver) {
//         this.driver = {}
//     }
//
//
//     this.driver[user] = new Builder()
//         .forBrowser('chrome')
//         .build();
//     await this.driver[user].get('http://localhost:3000');
//
//     this.driver[user].wait(until.elementLocated(By.className('Header')));
//
//     //FIND LOGIN BUTTON AND THEN CLICK
//     // const productName = await productElements[i].findElement(By.tagName('h3')).getText();
//     const loginButton = await this.driver[user].findElement(By.xpath('//*[@id="root"]/div[1]/div/div/button[1]'));
//     console.log(loginButton)
//     loginButton.click()
//     // const xxx = await buttons[0].findElement(By.tagName('h3')).getText();
// });
// When(/^user "([^"]*)" sends a "([^"]*)" to user "([^"]*)"$/, function (who, what, whom) {
//
// });
// Then(/^user "([^"]*)" sees "([^"]*)"  in the message window$/, function () {
//
// });
// Then(/^user "([^"]*)" sees "([^"]*)" in the message window$/, function () {
//
// });






//
// var {Then} = require('cucumber');
// var {When} = require('cucumber');
// var {Given} = require('cucumber');
// const { Builder, By, until } = require('selenium-webdriver');
// const driver = {};
//
// Given(/^user "([^"]*)" logged in in browser "([^"]*)"$/, async function (user, browser) {
//     if (!this.driver) {
//         this.driver = {}
//     }
//
//
//     this.driver[user] = new Builder()
//         .forBrowser('chrome')
//         .build();
//     await this.driver[user].get('http://localhost:3000');
//
//     this.driver[user].wait(until.elementLocated(By.className('Header')));
//
//     //FIND LOGIN BUTTON AND THEN CLICK
//     // const productName = await productElements[i].findElement(By.tagName('h3')).getText();
//     const loginButton = await this.driver[user].findElements(By.className('Header__btn'))[0];
//     console.log(loginButton)
//     // const xxx = await buttons[0].findElement(By.tagName('h3')).getText();
//
// });
// When(/^user "([^"]*)" sends a "([^"]*)" to user "([^"]*)"$/, function (who, what, whom) {
//
// });
// Then(/^user "([^"]*)" sees "([^"]*)" " in the message window$/, function () {
//
// });
//
// Then(/^user "([^"]*)" sees "([^"]*)" in the message window$/, function () {
//
// });