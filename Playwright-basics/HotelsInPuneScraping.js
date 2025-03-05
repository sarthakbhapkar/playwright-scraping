"use strict";
// import { firefox, Page } from "playwright";
//
// async function scrapeHotels(page: Page) {
//     const hotelContainer = page.locator('div#hotelListingContainer');
//
//     let previousHeight = 0;
//     let retries = 3;
//
//     while (retries > 0) {
//         await page.evaluate(() => {
//             window.scrollBy(0, window.innerHeight);
//         });
//
//         await page.waitForTimeout(1000);
//
//         const currentHeight = await page.evaluate((selector) => {
//             return document.querySelector(selector)?.scrollHeight || 0;
//         }, 'div#hotelListingContainer');
//
//         if (currentHeight > previousHeight) {
//             previousHeight = currentHeight;
//             retries = 3;
//         } else {
//             retries -= 1;
//         }
//     }
//
//     console.log(await hotelContainer.count());
//
//     await hotelContainer.locator('div.listingRowOuter').first().waitFor();
//
//     const hotelLocator = await hotelContainer.locator('div.listingRowOuter').all();
//
//     console.log(hotelLocator.length);
//
//     const obj: Record<string, any> = {};
//
//     for (const hotel of hotelLocator) {
//         const link = await hotel.locator('a').first().getAttribute('href');
//
//         console.log(link);
//
//         const hotelNameLocator = hotel.locator('div.listingRow div.flexOne div.makeFlex div.flexOne div.makeFlex');
//         const hotelNameL = hotelNameLocator.locator('p.latoBlack');
//
//         let hotelName = '';
//
//         if (await hotelNameL.count() > 1) {
//             hotelName = await hotelNameL.nth(1).innerText();
//         } else {
//             hotelName = await hotelNameL.nth(0).innerText();
//         }
//
//         console.log(hotelName);
//
//         const price = await hotel.locator('div.listingRow div.flexOne div.textRight div.tile__priceSection p.priceText').innerText();
//
//         console.log(price);
//
//         obj[hotelName] = [link, hotelName, price];
//     }
//     return obj;
// }
//
// (async () => {
//     try {
//         const browser = await firefox.launch({ headless: false });
//         const context = await browser.newContext();
//         const page = await context.newPage();
//
//         await page.goto('https://www.makemytrip.com/hotels/pune-hotels.html');
//
//         const allHotels = await scrapeHotels(page);
//         console.log("All Hotels:", allHotels);
//
//         const parentLocator = page.locator('div.appendBottom35 div#POPULAR ul.filterList');
//         const fiveStarLocator = parentLocator.locator('li:has-text("5 Star")');
//         await fiveStarLocator.click();
//
//         const fiveStarHotels = await scrapeHotels(page);
//         console.log("Five-Star Hotels:", fiveStarHotels);
//
//         await browser.close();
//     } catch (error) {
//         console.log(error);
//     }
// })();
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
function scrollToEnd(page, containerSelector) {
    return __awaiter(this, void 0, void 0, function () {
        var previousHeight, retries, currentHeight;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    previousHeight = 0;
                    retries = 3;
                    _a.label = 1;
                case 1:
                    if (!(retries > 0)) return [3 /*break*/, 5];
                    return [4 /*yield*/, page.evaluate(function (selector) {
                            var container = document.querySelector(selector);
                            if (container) {
                                container.scrollBy(0, container.scrollHeight);
                            }
                            else {
                                window.scrollBy(0, window.innerHeight);
                            }
                        }, containerSelector)];
                case 2:
                    _a.sent();
                    return [4 /*yield*/, page.waitForTimeout(1000)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.evaluate(function (selector) {
                            var container = document.querySelector(selector);
                            return container ? container.scrollHeight : document.body.scrollHeight;
                        }, containerSelector)];
                case 4:
                    currentHeight = _a.sent();
                    if (currentHeight > previousHeight) {
                        previousHeight = currentHeight;
                        retries = 3;
                    }
                    else {
                        retries -= 1;
                    }
                    return [3 /*break*/, 1];
                case 5: return [2 /*return*/];
            }
        });
    });
}
function scrapeHotels(page) {
    return __awaiter(this, void 0, void 0, function () {
        var hotelContainerSelector, hotelContainer, _a, _b, hotelLocator, obj, _i, hotelLocator_1, hotel, link, hotelNameLocator, hotelNameL, hotelName, price;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    hotelContainerSelector = 'div#hotelListingContainer';
                    return [4 /*yield*/, scrollToEnd(page, hotelContainerSelector)];
                case 1:
                    _c.sent();
                    hotelContainer = page.locator(hotelContainerSelector);
                    _b = (_a = console).log;
                    return [4 /*yield*/, hotelContainer.count()];
                case 2:
                    _b.apply(_a, [_c.sent()]);
                    return [4 /*yield*/, hotelContainer.locator('div.listingRowOuter').first().waitFor()];
                case 3:
                    _c.sent();
                    return [4 /*yield*/, hotelContainer.locator('div.listingRowOuter').all()];
                case 4:
                    hotelLocator = _c.sent();
                    console.log(hotelLocator.length);
                    obj = {};
                    _i = 0, hotelLocator_1 = hotelLocator;
                    _c.label = 5;
                case 5:
                    if (!(_i < hotelLocator_1.length)) return [3 /*break*/, 14];
                    hotel = hotelLocator_1[_i];
                    return [4 /*yield*/, hotel.locator('a').first().getAttribute('href')];
                case 6:
                    link = _c.sent();
                    console.log(link);
                    hotelNameLocator = hotel.locator('div.listingRow div.flexOne div.makeFlex div.flexOne div.makeFlex');
                    hotelNameL = hotelNameLocator.locator('p.latoBlack');
                    hotelName = '';
                    return [4 /*yield*/, hotelNameL.count()];
                case 7:
                    if (!((_c.sent()) > 1)) return [3 /*break*/, 9];
                    return [4 /*yield*/, hotelNameL.nth(1).innerText()];
                case 8:
                    hotelName = _c.sent();
                    return [3 /*break*/, 11];
                case 9: return [4 /*yield*/, hotelNameL.nth(0).innerText()];
                case 10:
                    hotelName = _c.sent();
                    _c.label = 11;
                case 11:
                    console.log(hotelName);
                    return [4 /*yield*/, hotel.locator('div.listingRow div.flexOne div.textRight div.tile__priceSection p.priceText').innerText()];
                case 12:
                    price = _c.sent();
                    console.log(price);
                    obj[hotelName] = [link, hotelName, price];
                    _c.label = 13;
                case 13:
                    _i++;
                    return [3 /*break*/, 5];
                case 14: return [2 /*return*/, obj];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, context, page, allHotels, parentLocator, fiveStarLocator, fiveStarHotels, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 9, , 10]);
                return [4 /*yield*/, playwright_1.firefox.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newContext()];
            case 2:
                context = _a.sent();
                return [4 /*yield*/, context.newPage()];
            case 3:
                page = _a.sent();
                return [4 /*yield*/, page.goto('https://www.makemytrip.com/hotels/pune-hotels.html')];
            case 4:
                _a.sent();
                return [4 /*yield*/, scrapeHotels(page)];
            case 5:
                allHotels = _a.sent();
                console.log("All Hotels:", allHotels);
                parentLocator = page.locator('div.appendBottom35 div#POPULAR ul.filterList');
                fiveStarLocator = parentLocator.locator('li:has-text("5 Star")');
                return [4 /*yield*/, fiveStarLocator.click()];
            case 6:
                _a.sent();
                return [4 /*yield*/, scrapeHotels(page)];
            case 7:
                fiveStarHotels = _a.sent();
                console.log("Five-Star Hotels:", fiveStarHotels);
                return [4 /*yield*/, browser.close()];
            case 8:
                _a.sent();
                return [3 /*break*/, 10];
            case 9:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); })();
