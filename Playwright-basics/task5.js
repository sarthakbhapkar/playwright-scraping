"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var dotenv = require("dotenv");
dotenv.config();
function delay(time) {
    return new Promise(function (resolve) { return setTimeout(resolve, time); });
}
var folders = [];
function scrapeInformation(page, folderName, navBar, content) {
    return __awaiter(this, void 0, void 0, function () {
        var firstLink, pageContentColumn, infoBox, _a, _b, contentSection, Links, asyncMapFilter, externalLinksInWiki, breadcrumbsLocator, navigateToHome, error_1;
        var _this = this;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 11, , 12]);
                    firstLink = navBar.locator('a').first();
                    return [4 /*yield*/, firstLink.click()];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, delay(2000)];
                case 2:
                    _c.sent();
                    return [4 /*yield*/, page.waitForSelector('ul.v-breadcrumbs')];
                case 3:
                    _c.sent();
                    pageContentColumn = page.locator('div.page-col-sd');
                    infoBox = pageContentColumn.locator('div.pa-5');
                    content[folderName] = __assign(__assign({}, content[folderName]), { lastEditedBy: null, lastEditedAt: null, externalLinks: [] });
                    _a = content[folderName];
                    return [4 /*yield*/, infoBox.locator('div.body-2').innerText()];
                case 4:
                    _a.lastEditedBy = _c.sent();
                    _b = content[folderName];
                    return [4 /*yield*/, infoBox.locator('div.caption').innerText()];
                case 5:
                    _b.lastEditedAt = _c.sent();
                    contentSection = page.locator('div.contents');
                    return [4 /*yield*/, contentSection.locator('a').all()];
                case 6:
                    Links = _c.sent();
                    asyncMapFilter = function (array, callBackFun) { return __awaiter(_this, void 0, void 0, function () {
                        var results;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, Promise.all(array.map(callBackFun))];
                                case 1:
                                    results = _a.sent();
                                    return [2 /*return*/, results.filter(function (href) { return href !== null; })];
                            }
                        });
                    }); };
                    return [4 /*yield*/, asyncMapFilter(Links, function (link) { return __awaiter(_this, void 0, void 0, function () {
                            var href;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, link.getAttribute('href')];
                                    case 1:
                                        href = _a.sent();
                                        return [2 /*return*/, href && href.startsWith('https://') ? href : null];
                                }
                            });
                        }); })];
                case 7:
                    externalLinksInWiki = _c.sent();
                    console.log('External Links', externalLinksInWiki);
                    content[folderName].externalLinks = externalLinksInWiki;
                    console.log(content[folderName].lastEditedBy, content[folderName].lastEditedAt);
                    return [4 /*yield*/, delay(2000)];
                case 8:
                    _c.sent();
                    breadcrumbsLocator = page.locator('ul.v-breadcrumbs');
                    navigateToHome = breadcrumbsLocator.locator('button.mdi-home');
                    return [4 /*yield*/, navigateToHome.click()];
                case 9:
                    _c.sent();
                    return [4 /*yield*/, delay(2000)];
                case 10:
                    _c.sent();
                    return [3 /*break*/, 12];
                case 11:
                    error_1 = _c.sent();
                    console.log('Error while Scraping Info', error_1);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    });
}
function scrapeFolder(page, folderLocator, navLocator, content) {
    return __awaiter(this, void 0, void 0, function () {
        var folderName, baseUrl, urlLink, subfolders, currentFolder, parent_1, _i, subfolders_1, subfolder, parent_2, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, folderLocator.innerText()];
                case 1:
                    folderName = _a.sent();
                    baseUrl = page.url();
                    urlLink = new URL(folderName.toLowerCase(), baseUrl).href;
                    folders.push(folderName);
                    if (!content[folderName]) {
                        content[folderName] = { link: urlLink, subTopics: {} };
                    }
                    _a.label = 2;
                case 2:
                    _a.trys.push([2, 25, , 26]);
                    return [4 /*yield*/, folderLocator.click()];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, page.waitForSelector('div[tabindex="0"]:not([style])', { timeout: 10000 })];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, delay(1000)];
                case 5:
                    _a.sent();
                    navLocator = page.locator('div.v-navigation-drawer__content');
                    return [4 /*yield*/, scrapeLinksInSection(navLocator, content, folderName, baseUrl)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, navLocator.locator('div[tabindex="0"]:not([style]):not(:has-text("Current Directory"))').all()];
                case 7:
                    subfolders = _a.sent();
                    if (!(subfolders.length === 0)) return [3 /*break*/, 14];
                    console.log("No subfolders found in folder: ".concat(folderName));
                    folders.pop();
                    currentFolder = '';
                    if (!(folders.length === 0)) return [3 /*break*/, 9];
                    return [4 /*yield*/, scrapeInformation(page, folderName, navLocator, content)];
                case 8:
                    _a.sent();
                    return [3 /*break*/, 10];
                case 9:
                    currentFolder = folders[folders.length - 1];
                    _a.label = 10;
                case 10:
                    if (!currentFolder) return [3 /*break*/, 13];
                    parent_1 = navLocator
                        .locator('div[tabindex="0"]')
                        .filter({ hasText: new RegExp("^".concat(currentFolder, "$")) })
                        .nth(0);
                    return [4 /*yield*/, parent_1.click()];
                case 11:
                    _a.sent();
                    return [4 /*yield*/, delay(3000)];
                case 12:
                    _a.sent();
                    _a.label = 13;
                case 13: return [2 /*return*/];
                case 14:
                    _i = 0, subfolders_1 = subfolders;
                    _a.label = 15;
                case 15:
                    if (!(_i < subfolders_1.length)) return [3 /*break*/, 18];
                    subfolder = subfolders_1[_i];
                    return [4 /*yield*/, scrapeFolder(page, subfolder, navLocator, content[folderName].subTopics)];
                case 16:
                    _a.sent();
                    _a.label = 17;
                case 17:
                    _i++;
                    return [3 /*break*/, 15];
                case 18:
                    if (!(folders.length > 1)) return [3 /*break*/, 21];
                    folders.pop();
                    parent_2 = navLocator
                        .locator('div[tabindex="0"]')
                        .filter({ hasText: new RegExp("^".concat(folders[folders.length - 1], "$")) })
                        .first();
                    return [4 /*yield*/, parent_2.click()];
                case 19:
                    _a.sent();
                    return [4 /*yield*/, delay(3000)];
                case 20:
                    _a.sent();
                    return [3 /*break*/, 24];
                case 21: return [4 /*yield*/, scrapeInformation(page, folderName, navLocator, content)];
                case 22:
                    _a.sent();
                    folders.splice(0);
                    return [4 /*yield*/, delay(3000)];
                case 23:
                    _a.sent();
                    _a.label = 24;
                case 24: return [3 /*break*/, 26];
                case 25:
                    error_2 = _a.sent();
                    console.error("Error in folder \"".concat(folderName, "\":"), error_2);
                    return [3 /*break*/, 26];
                case 26: return [2 /*return*/];
            }
        });
    });
}
function scrapeLinksInSection(sectionLocator, content, parentFolder, baseUrl) {
    return __awaiter(this, void 0, void 0, function () {
        var links, _i, links_1, link, text, href, topicLink, error_3;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, sectionLocator.locator('a[tabindex="0"]').all()];
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
                    topicLink = new URL(href || '', baseUrl).href;
                    if (!(topicLink && text !== '')) return [3 /*break*/, 6];
                    if (parentFolder && content[parentFolder]) {
                        content[parentFolder].subTopics[text] = { link: topicLink, subTopics: {} };
                    }
                    else {
                        content[text] = { link: topicLink, subTopics: {} };
                    }
                    console.log("Scraped: ".concat(text, " -> ").concat(topicLink));
                    return [4 /*yield*/, delay(2000)];
                case 5:
                    _a.sent();
                    _a.label = 6;
                case 6:
                    _i++;
                    return [3 /*break*/, 2];
                case 7: return [3 /*break*/, 9];
                case 8:
                    error_3 = _a.sent();
                    console.log('Error During Scraping:', error_3);
                    return [3 /*break*/, 9];
                case 9: return [2 /*return*/];
            }
        });
    });
}
function scrapeNavigationLinks(page) {
    return __awaiter(this, void 0, void 0, function () {
        var content, baseUrl, navLocator, foldersInNav, _i, foldersInNav_1, folder, folderName, topicLink, error_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 9, , 10]);
                    content = {};
                    baseUrl = page.url();
                    navLocator = page.locator('div.v-navigation-drawer__content');
                    return [4 /*yield*/, navLocator.locator('div[tabindex="0"]').all()];
                case 1:
                    foldersInNav = _a.sent();
                    return [4 /*yield*/, scrapeLinksInSection(navLocator, content, null, baseUrl)];
                case 2:
                    _a.sent();
                    _i = 0, foldersInNav_1 = foldersInNav;
                    _a.label = 3;
                case 3:
                    if (!(_i < foldersInNav_1.length)) return [3 /*break*/, 8];
                    folder = foldersInNav_1[_i];
                    return [4 /*yield*/, folder.innerText()];
                case 4:
                    folderName = _a.sent();
                    topicLink = new URL(folderName.toLowerCase(), baseUrl).href;
                    if (!content[folderName]) {
                        content[folderName] = { link: topicLink, subTopics: {} };
                    }
                    return [4 /*yield*/, scrapeFolder(page, folder, navLocator, content)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, delay(3000)];
                case 6:
                    _a.sent();
                    _a.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 3];
                case 8: return [2 /*return*/, content];
                case 9:
                    error_4 = _a.sent();
                    console.log('Error Facing while Scraping:', error_4);
                    return [3 /*break*/, 10];
                case 10: return [2 /*return*/];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, context, page, username, password, scrapedData, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, playwright_1.firefox.launch({ headless: false })];
            case 1:
                browser = _a.sent();
                return [4 /*yield*/, browser.newContext()];
            case 2:
                context = _a.sent();
                return [4 /*yield*/, context.newPage()];
            case 3:
                page = _a.sent();
                username = process.env.USERNAME;
                password = process.env.PASSWORD;
                if (!username || !password) {
                    console.log('Username or Password is not available');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, page.goto('https://wiki.noovosoft.com/login')];
            case 4:
                _a.sent();
                return [4 /*yield*/, page.locator('div.login-form input[type="email"]').fill(username)];
            case 5:
                _a.sent();
                return [4 /*yield*/, page.locator('div.login-form input[type="password"]').fill(password)];
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
                _a.trys.push([9, 11, , 12]);
                return [4 /*yield*/, scrapeNavigationLinks(page)];
            case 10:
                scrapedData = _a.sent();
                console.log(JSON.stringify(scrapedData, null, 2));
                return [3 /*break*/, 12];
            case 11:
                error_5 = _a.sent();
                console.log('Error while Scraping:', error_5);
                return [3 /*break*/, 12];
            case 12: return [4 /*yield*/, browser.close()];
            case 13:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); })();
