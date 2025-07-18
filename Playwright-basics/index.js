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
    var browser, context, page, ans, heading, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                console.log('Starting playwright...');
                return [4 /*yield*/, playwright_1.chromium.launch({ headless: false })];
            case 1:
                browser = _c.sent();
                return [4 /*yield*/, browser.newContext()];
            case 2:
                context = _c.sent();
                return [4 /*yield*/, context.newPage()];
            case 3:
                page = _c.sent();
                return [4 /*yield*/, page.goto('https://www.zoho.com/')];
            case 4:
                _c.sent();
                return [4 /*yield*/, page.click('text=Sign In')];
            case 5:
                _c.sent();
                return [4 /*yield*/, page.fill('#login_id', 'sarthak.bhapkar@noovosoft.com')];
            case 6:
                _c.sent();
                return [4 /*yield*/, page.click('text=Next')];
            case 7:
                _c.sent();
                return [4 /*yield*/, page.waitForSelector('#password')];
            case 8:
                _c.sent();
                return [4 /*yield*/, page.fill('#password', 'abc@123')];
            case 9:
                _c.sent();
                return [4 /*yield*/, page.click('#nextbtn')];
            case 10:
                _c.sent();
                return [4 /*yield*/, page.mouse.wheel(0, 1000)];
            case 11:
                _c.sent();
                return [4 /*yield*/, page.goto('https://www.cricbuzz.com/')];
            case 12:
                _c.sent();
                return [4 /*yield*/, page.goto('https://in.bookmyshow.com/explore/home/pune')];
            case 13:
                _c.sent();
                return [4 /*yield*/, page.click('text=Sign in')];
            case 14:
                ans = _c.sent();
                console.log(ans);
                return [4 /*yield*/, page.fill('#mobileNo', '9359125523')];
            case 15:
                _c.sent();
                return [4 /*yield*/, page.click('text=Continue')];
            case 16:
                _c.sent();
                return [4 /*yield*/, page.$$eval('.sc-133848s-3.sc-133848s-10.dOuCBq', function (elements) {
                        return elements.map(function (el) { return el.textContent; }).join(',');
                    })];
            case 17:
                heading = _c.sent();
                console.log(heading);
                return [4 /*yield*/, page.fill('input[type="email"]', 'sarthakbhapkar45@gmail.com')];
            case 18:
                _c.sent();
                return [4 /*yield*/, page.click('text=Next')];
            case 19:
                _c.sent();
                // const heading= await page.textContent('h1');
                // const heading = await page.$$eval('h1', elements => elements.map(el => el.textContent).join(','));
                // console.log(heading);
                return [4 /*yield*/, page.click('text= Live Scores')];
            case 20:
                // const heading= await page.textContent('h1');
                // const heading = await page.$$eval('h1', elements => elements.map(el => el.textContent).join(','));
                // console.log(heading);
                _c.sent();
                return [4 /*yield*/, page.waitForSelector('body')];
            case 21:
                _c.sent();
                return [4 /*yield*/, page.screenshot({ path: "".concat(__dirname, "/screenshot.png") })];
            case 22:
                _c.sent();
                _b = (_a = console).log;
                return [4 /*yield*/, page.title()];
            case 23:
                _b.apply(_a, [_c.sent()]);
                return [4 /*yield*/, page.route('**/*.jpg', function (route) {
                        console.log('Blocked image:', route.request().url());
                        route.abort();
                    })];
            case 24:
                _c.sent();
                return [4 /*yield*/, browser.close()];
            case 25:
                _c.sent();
                return [2 /*return*/];
        }
    });
}); })();
