/* vim: set expandtab tabstop=4 shiftwidth=4 softtabstop=4: */
/* eslint-env es6, mocha, node */
/* eslint-extends: eslint:recommended */
'use strict';


let browser = null;
const puppeteer = require('puppeteer');
const expect = require('expect.js');


before(async () => {
    browser = await puppeteer.launch();
});

after(() => {
    browser.close();
});


describe('Headless chrome test', function () {
    describe('Protoractor test sample', function () {
        it('Should complete test', async function () {
            const page = await browser.newPage(),
                text = 'write first protractor test';
            await page.goto('https://angularjs.org');
            await page.focus('input[ng-model="todoList.todoText"]');
            await page.type(text);

            const button_add = await page.$('input[value="add"]');
            await button_add.click();

            const list = await page.$$('li[ng-repeat="todo in todoList.todos"]');
            expect(list).to.have.length(3);
            expect(await list[2].evaluate((element) => {
                return Promise.resolve(element.querySelector('span').textContent);
            })).to.be(text);

            await list[2].evaluate((element) => {
                element.querySelector('input').click();
            });
            expect(await page.$$('li[ng-repeat="todo in todoList.todos"] .done-true')).to.have.length(2);
        });
    });
});



/*
 * Local variables:
 * tab-width: 4
 * c-basic-offset: 4
 * c-hanging-comment-ender-p: nil
 * End:
 */
