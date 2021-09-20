var {Then} = require('cucumber');
var {When} = require('cucumber');
var {Given} = require('cucumber');
const { Builder, By, until } = require('selenium-webdriver');
const driver = {};

Given(/^user "([^"]*)" logged in in browser "([^"]*)"$/, async function (user, browser) {
    if (!this.driver) {
        this.driver = {}
    }


    this.driver[user] = new Builder()
        .forBrowser('chrome')
        .build();
    this.driver.wait(until.elementLocated(By.tagName('h1')));
    await this.driver[user].get('http://localhost:3000');

    //FIND LOGIN BUTTON AND THEN CLICK
    // const productName = await productElements[i].findElement(By.tagName('h3')).getText();
    const productElements = await this.driver.findElements(By.className('product'));
    const loginButton = await productElements[i].findElement(By.tagName('h3')).getText();

});
When(/^user "([^"]*)" sends a "([^"]*)" to user "([^"]*)"$/, function (who, what, whom) {

});
Then(/^user "([^"]*)" sees "([^"]*)" on the "([^"]*)" in the message window$/, function () {

});

