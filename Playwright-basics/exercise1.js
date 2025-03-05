"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var playwright_1 = require("playwright");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, context, page, error_1, err, topicsInNav, topicsText, content, divLocator, h1Elements, ulLocators, baseUrl, i, headingText, ulElement, liLinks, subTopics, _i, liLinks_1, link, subText, subHref, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, playwright_1.chromium.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newContext()];
            case 2:
                context = _a.sent();
                return [4 /*yield*/, context.newPage()];
            case 3:
                page = _a.sent();
                return [4 /*yield*/, page.goto('https://wiki.noovosoft.com/resources')];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.locator('div.login-form').isVisible()];
            case 5:
                if (!!(_a.sent())) return [3 /*break*/, 7];
                return [4 /*yield*/, page.goto('https://wiki.noovosoft.com/login')];
            case 6:
                _a.sent();
                console.log("Landed on login page");
                return [3 /*break*/, 8];
            case 7:
                console.log("Landed on login page");
                _a.label = 8;
            case 8: return [4 /*yield*/, page.locator('div.login-form input[type="email"]').fill('sarthak.bhapkar@noovosoft.com')];
            case 9:
                _a.sent();
                return [4 /*yield*/, page.locator('div.login-form input[type="password"]').fill('Sarthak@30')];
            case 10:
                _a.sent();
                console.log("Entered email and password");
                return [4 /*yield*/, page.locator('button:has-text("Log In")').click()];
            case 11:
                _a.sent();
                _a.label = 12;
            case 12:
                _a.trys.push([12, 14, , 20]);
                return [4 /*yield*/, page.waitForSelector('v-application--wrap', { timeout: 5000 })];
            case 13:
                _a.sent();
                console.log("Login successful, navigating to homepage.");
                return [3 /*break*/, 20];
            case 14:
                error_1 = _a.sent();
                return [4 /*yield*/, page.locator('text=Welcome').nth(0).isVisible()];
            case 15:
                if (!!(_a.sent())) return [3 /*break*/, 17];
                return [4 /*yield*/, page.goto('https://wiki.noovosoft.com/')];
            case 16:
                _a.sent();
                console.log("Login successful, navigating to homepage.");
                return [3 /*break*/, 19];
            case 17: return [4 /*yield*/, page.getByRole('status').textContent()];
            case 18:
                err = _a.sent();
                console.log("".concat(err));
                _a.label = 19;
            case 19: return [3 /*break*/, 20];
            case 20: return [4 /*yield*/, page.locator('text=Welcome').nth(0).isVisible()];
            case 21:
                if (!!(_a.sent())) return [3 /*break*/, 23];
                return [4 /*yield*/, page.goto('https://wiki.noovosoft.com/')];
            case 22:
                _a.sent();
                console.log("You are not on home page, navigating to homepage.");
                _a.label = 23;
            case 23: return [4 /*yield*/, page.waitForSelector('div[tabindex="0"],a[tabindex="0"]')];
            case 24:
                _a.sent();
                topicsInNav = page.locator('div[tabindex="0"],a[tabindex="0"]');
                return [4 /*yield*/, topicsInNav.allTextContents()];
            case 25:
                topicsText = _a.sent();
                console.log("Topics in Navigation Bar:", topicsText);
                content = {};
                divLocator = page.locator('div.contents');
                return [4 /*yield*/, divLocator.locator('h1').allInnerTexts()];
            case 26:
                h1Elements = _a.sent();
                ulLocators = divLocator.locator('ul');
                baseUrl = page.url();
                i = 0;
                _a.label = 27;
            case 27:
                if (!(i < h1Elements.length)) return [3 /*break*/, 37];
                headingText = h1Elements[i].trim();
                if (!headingText)
                    return [3 /*break*/, 36];
                content[headingText] = {};
                ulElement = ulLocators.nth(i);
                return [4 /*yield*/, ulElement.locator('li > a').all()];
            case 28:
                liLinks = _a.sent();
                subTopics = {};
                _i = 0, liLinks_1 = liLinks;
                _a.label = 29;
            case 29:
                if (!(_i < liLinks_1.length)) return [3 /*break*/, 35];
                link = liLinks_1[_i];
                _a.label = 30;
            case 30:
                _a.trys.push([30, 33, , 34]);
                return [4 /*yield*/, link.innerText()];
            case 31:
                subText = (_a.sent()).trim();
                return [4 /*yield*/, link.getAttribute('href')];
            case 32:
                subHref = _a.sent();
                if (subText && subHref) {
                    subTopics[subText] = new URL(subHref, baseUrl).href;
                }
                return [3 /*break*/, 34];
            case 33:
                error_2 = _a.sent();
                console.error("Error processing link: ".concat(error_2));
                return [3 /*break*/, 34];
            case 34:
                _i++;
                return [3 /*break*/, 29];
            case 35:
                content[headingText] = subTopics;
                _a.label = 36;
            case 36:
                i++;
                return [3 /*break*/, 27];
            case 37:
                console.log("Structured Content:", JSON.stringify(content, null, 2));
                return [2 /*return*/];
        }
    });
}); })();
