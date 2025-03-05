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
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function scrapeLinksInSection(sectionLocator, content, parentFolder, baseUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var links, _i, links_1, link, text, href, resolvedHref;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sectionLocator.locator('a[tabindex="0"]').all()];
                case 1:
                    links = _a.sent();
                    _i = 0, links_1 = links;
                    _a.label = 2;
                case 2:
                    if (!(_i < links_1.length)) return [3 /*break*/, 7];
                    link = links_1[_i];
                    return [4 /*yield*/, link.innerText()];
                case 3:
                    text = _a.sent();
                    return [4 /*yield*/, link.getAttribute('href')];
                case 4:
                    href = _a.sent();
                    resolvedHref = new URL(href || '', baseUrl).href;
                    if (resolvedHref && text !== '') {
                        if (parentFolder && content[parentFolder]) {
                            content[parentFolder].subTopics[text] = { link: resolvedHref, subTopics: {} };
                        }
                        else {
                            content[text] = { link: resolvedHref, subTopics: {} };
                        }
                        console.log("Scraped: ".concat(text, " -> ").concat(resolvedHref));
                    }
                    return [4 /*yield*/, delay(1000)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [2 /*return*/];
            }
        });
    });
}
function scrapeFolder(page, folderName, navLocator, content, folders) {
    return __awaiter(this, void 0, void 0, function () {
        var baseUrl, urlLink, folderElements, selectedElement, subfolders, f, parent_1, _i, subfolders_1, subfolder, subFolderText, parent_2, root, _a, root, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    console.log('FolderName: ', folderName);
                    if (!folderName)
                        return [2 /*return*/];
                    baseUrl = page.url();
                    urlLink = new URL(folderName.toLowerCase(), baseUrl).href;
                    return [4 /*yield*/, delay(1000)];
                case 1:
                    _b.sent();
                    folders.push(folderName);
                    if (!content[folderName]) {
                        content[folderName] = { link: urlLink, subTopics: {} };
                    }
                    _b.label = 2;
                case 2:
                    _b.trys.push([2, 35, , 36]);
                    return [4 /*yield*/, delay(3000)];
                case 3:
                    _b.sent();
                    return [4 /*yield*/, navLocator.locator("div.v-list-item__title:has-text(\"".concat(folderName, "\")")).all()];
                case 4:
                    folderElements = _b.sent();
                    if (!(folderElements.length > 1)) return [3 /*break*/, 7];
                    selectedElement = folderElements[0];
                    return [4 /*yield*/, selectedElement.click()];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, delay(2000)];
                case 6:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 7:
                    if (!(folderElements.length === 1)) return [3 /*break*/, 10];
                    return [4 /*yield*/, folderElements[0].click()];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, delay(2000)];
                case 9:
                    _b.sent();
                    return [3 /*break*/, 11];
                case 10:
                    console.error("No element found for folder \"".concat(folderName, "\"."));
                    return [2 /*return*/];
                case 11: return [4 /*yield*/, page.waitForSelector('div[tabindex="0"]:not([style])', { timeout: 10000 })];
                case 12:
                    _b.sent();
                    return [4 /*yield*/, delay(2000)];
                case 13:
                    _b.sent();
                    return [4 /*yield*/, scrapeLinksInSection(navLocator, content, folderName, baseUrl)];
                case 14:
                    _b.sent();
                    return [4 /*yield*/, navLocator.locator('div[tabindex="0"]:not([style]):not(:has-text("Current Directory"))').all()];
                case 15:
                    subfolders = _b.sent();
                    if (!(subfolders.length === 0)) return [3 /*break*/, 19];
                    console.log("No subfolders found in folder: ".concat(folderName));
                    folders.pop();
                    f = '';
                    if (folders.length === 0) {
                        f = '/ (root)';
                    }
                    else {
                        f = folders[folders.length - 1];
                    }
                    if (!f) return [3 /*break*/, 18];
                    parent_1 = navLocator
                        .locator('div[tabindex="0"]')
                        .filter({ hasText: new RegExp("^".concat(f, "$")) })
                        .nth(0);
                    return [4 /*yield*/, parent_1.click()];
                case 16:
                    _b.sent();
                    return [4 /*yield*/, delay(3000)];
                case 17:
                    _b.sent();
                    _b.label = 18;
                case 18: return [2 /*return*/];
                case 19:
                    _i = 0, subfolders_1 = subfolders;
                    _b.label = 20;
                case 20:
                    if (!(_i < subfolders_1.length)) return [3 /*break*/, 25];
                    subfolder = subfolders_1[_i];
                    return [4 /*yield*/, subfolder.innerText()];
                case 21:
                    subFolderText = _b.sent();
                    return [4 /*yield*/, scrapeFolder(page, subFolderText, navLocator, content[folderName].subTopics, folders)];
                case 22:
                    _b.sent();
                    return [4 /*yield*/, delay(3000)];
                case 23:
                    _b.sent();
                    _b.label = 24;
                case 24:
                    _i++;
                    return [3 /*break*/, 20];
                case 25:
                    if (!(folders.length > 1)) return [3 /*break*/, 28];
                    folders.pop();
                    parent_2 = navLocator
                        .locator('div[tabindex="0"]')
                        .filter({ hasText: new RegExp("^".concat(folders[folders.length - 1], "$")) })
                        .nth(0);
                    return [4 /*yield*/, parent_2.click()];
                case 26:
                    _b.sent();
                    return [4 /*yield*/, delay(3000)];
                case 27:
                    _b.sent();
                    return [3 /*break*/, 34];
                case 28:
                    _b.trys.push([28, 30, , 32]);
                    root = navLocator.locator('div[tabindex="0"]:has-text("/ sidebar.root")').first();
                    return [4 /*yield*/, root.click()];
                case 29:
                    _b.sent();
                    return [3 /*break*/, 32];
                case 30:
                    _a = _b.sent();
                    root = navLocator.locator('div[tabindex="0"]:has-text("/ (root)")').first();
                    return [4 /*yield*/, root.click()];
                case 31:
                    _b.sent();
                    return [3 /*break*/, 32];
                case 32:
                    folders.length = 0;
                    return [4 /*yield*/, delay(3000)];
                case 33:
                    _b.sent();
                    _b.label = 34;
                case 34: return [3 /*break*/, 36];
                case 35:
                    error_1 = _b.sent();
                    console.error("Error in folder \"".concat(folderName, "\":"), error_1);
                    return [3 /*break*/, 36];
                case 36: return [2 /*return*/];
            }
        });
    });
}
function scrapeNavigationLinks(context, page) {
    return __awaiter(this, void 0, void 0, function () {
        var content, baseUrl, navLocator, foldersInNav, folderScrapingPromises;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    content = {};
                    baseUrl = page.url();
                    navLocator = page.locator('div.v-navigation-drawer__content');
                    return [4 /*yield*/, navLocator.locator('div[tabindex="0"]').all()];
                case 1:
                    foldersInNav = _a.sent();
                    folderScrapingPromises = foldersInNav.map(function (folder) { return __awaiter(_this, void 0, void 0, function () {
                        var folderName, newPage, newNavLocator, error_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, folder.innerText()];
                                case 1:
                                    folderName = _a.sent();
                                    return [4 /*yield*/, context.newPage()];
                                case 2:
                                    newPage = _a.sent();
                                    _a.label = 3;
                                case 3:
                                    _a.trys.push([3, 7, 8, 10]);
                                    return [4 /*yield*/, newPage.goto(baseUrl)];
                                case 4:
                                    _a.sent();
                                    newNavLocator = newPage.locator('div.v-navigation-drawer__content');
                                    return [4 /*yield*/, scrapeFolder(newPage, folderName, newNavLocator, content, [])];
                                case 5:
                                    _a.sent();
                                    return [4 /*yield*/, delay(2000)];
                                case 6:
                                    _a.sent();
                                    return [3 /*break*/, 10];
                                case 7:
                                    error_2 = _a.sent();
                                    console.error("Error scraping folder \"".concat(folderName, "\":"), error_2);
                                    return [3 /*break*/, 10];
                                case 8: return [4 /*yield*/, newPage.close()];
                                case 9:
                                    _a.sent();
                                    return [7 /*endfinally*/];
                                case 10: return [2 /*return*/];
                            }
                        });
                    }); });
                    return [4 /*yield*/, Promise.all(folderScrapingPromises)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, content];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, context, page, scrapedData, error_3;
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
                return [4 /*yield*/, page.goto('https://wiki.noovosoft.com/login')];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.locator('div.login-form input[type="email"]').fill('sarthak.bhapkar@noovosoft.com')];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.locator('div.login-form input[type="password"]').fill('Sarthak@30')];
            case 6:
                _a.sent();
                return [4 /*yield*/, page.locator('button:has-text("Log In")').click()];
            case 7:
                _a.sent();
                return [4 /*yield*/, page.waitForURL('https://wiki.noovosoft.com')];
            case 8:
                _a.sent();
                _a.label = 9;
            case 9:
                _a.trys.push([9, 11, 12, 14]);
                return [4 /*yield*/, scrapeNavigationLinks(context, page)];
            case 10:
                scrapedData = _a.sent();
                console.log("Scraped Data:", JSON.stringify(scrapedData, null, 2));
                return [3 /*break*/, 14];
            case 11:
                error_3 = _a.sent();
                console.error("An error occurred during scraping:", error_3);
                return [3 /*break*/, 14];
            case 12: return [4 /*yield*/, browser.close()];
            case 13:
                _a.sent();
                return [7 /*endfinally*/];
            case 14: return [2 /*return*/];
        }
    });
}); })();
