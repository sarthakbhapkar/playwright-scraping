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
var dotenv = require("dotenv");
dotenv.config();
function delay(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function clickElementsWithMatchingParts(elements, part) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, Promise.all(elements.map(function (element) { return __awaiter(_this, void 0, void 0, function () {
                            var innerText;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, element.innerText()];
                                    case 1:
                                        innerText = _a.sent();
                                        if (!(innerText === part)) return [3 /*break*/, 4];
                                        return [4 /*yield*/, element.click()];
                                    case 2:
                                        _a.sent();
                                        return [4 /*yield*/, delay(1000)];
                                    case 3:
                                        _a.sent();
                                        _a.label = 4;
                                    case 4: return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.log("Error While Clicking an Element:".concat(error_1));
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
function navigateToPath(path, page) {
    return __awaiter(this, void 0, void 0, function () {
        var pathParts, navBarLocator, mainTopic, directory, _i, pathParts_1, part, matchingFolders, matchingLinks, pageContentColumn, infoBox, isCorrectInfo, _a, _b, correctTagsLocator, tags, _c, _d, locatorInContentSection, topics, content, currentTopic, _e, topics_1, topic, tagName, text, subtopicText, subTopicLink, root, error_2;
        var _this = this;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    pathParts = path.split('=>').map(function (pathElm) { return pathElm.trim(); });
                    navBarLocator = page.locator('div.v-navigation-drawer__content');
                    mainTopic = pathParts[0];
                    if (!navBarLocator) {
                        throw new Error('Navigation Bar not found');
                    }
                    directory = {};
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 29, , 30]);
                    console.log('Scraping the:', mainTopic);
                    _i = 0, pathParts_1 = pathParts;
                    _f.label = 2;
                case 2:
                    if (!(_i < pathParts_1.length)) return [3 /*break*/, 8];
                    part = pathParts_1[_i];
                    return [4 /*yield*/, navBarLocator.locator("div[tabindex=\"0\"]:has-text(\"".concat(part, "\")")).all()];
                case 3:
                    matchingFolders = _f.sent();
                    return [4 /*yield*/, navBarLocator.locator("a[tabindex=\"0\"]:has-text(\"".concat(part, "\")")).all()];
                case 4:
                    matchingLinks = _f.sent();
                    if (matchingFolders.length === 0 && matchingLinks.length === 0) {
                        return [2 /*return*/, "Invalid Path"];
                    }
                    return [4 /*yield*/, clickElementsWithMatchingParts(matchingFolders, part)];
                case 5:
                    _f.sent();
                    return [4 /*yield*/, clickElementsWithMatchingParts(matchingLinks, part)];
                case 6:
                    _f.sent();
                    _f.label = 7;
                case 7:
                    _i++;
                    return [3 /*break*/, 2];
                case 8: return [4 /*yield*/, delay(1000)];
                case 9:
                    _f.sent();
                    return [4 /*yield*/, page.waitForSelector('ul.v-breadcrumbs')];
                case 10:
                    _f.sent();
                    pageContentColumn = page.locator('div.page-col-sd');
                    infoBox = pageContentColumn.locator('div.pa-5');
                    isCorrectInfo = pageContentColumn.locator('span::has-text("Last Edited By")');
                    directory[mainTopic] = {
                        path: path,
                        lastEditedBy: null,
                        date: null,
                        tags: [],
                        title: null,
                        topics: {}
                    };
                    if (!(infoBox && isCorrectInfo)) return [3 /*break*/, 13];
                    _a = directory[mainTopic];
                    return [4 /*yield*/, infoBox.locator('div.body-2').innerText()];
                case 11:
                    _a.lastEditedBy = _f.sent();
                    _b = directory[mainTopic];
                    return [4 /*yield*/, infoBox.locator('div.caption').innerText()];
                case 12:
                    _b.date = _f.sent();
                    console.log('Last Edited By:', directory[mainTopic].lastEditedBy);
                    console.log('Last Edited Date:', directory[mainTopic].date);
                    _f.label = 13;
                case 13:
                    correctTagsLocator = pageContentColumn.locator('div.teal--text::has-text("Tags")');
                    if (!(infoBox && correctTagsLocator)) return [3 /*break*/, 16];
                    return [4 /*yield*/, infoBox.locator('a').all()];
                case 14:
                    tags = _f.sent();
                    _c = directory[mainTopic];
                    return [4 /*yield*/, Promise.all(tags.map(function (tag) { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, tag.innerText()];
                                case 1: return [2 /*return*/, _a.sent()];
                            }
                        }); }); }))];
                case 15:
                    _c.tags = (_f.sent()).filter(function (allTags) { return allTags !== ''; });
                    _f.label = 16;
                case 16:
                    _d = directory[mainTopic];
                    return [4 /*yield*/, page.locator('div.headline').innerText()];
                case 17:
                    _d.title = _f.sent();
                    locatorInContentSection = page.locator('div.contents');
                    return [4 /*yield*/, locatorInContentSection.locator('h1, h2').all()];
                case 18:
                    topics = _f.sent();
                    content = {};
                    currentTopic = '';
                    _e = 0, topics_1 = topics;
                    _f.label = 19;
                case 19:
                    if (!(_e < topics_1.length)) return [3 /*break*/, 25];
                    topic = topics_1[_e];
                    return [4 /*yield*/, topic.evaluate(function (el) { return el.tagName; })];
                case 20:
                    tagName = _f.sent();
                    return [4 /*yield*/, topic.innerText()];
                case 21:
                    text = _f.sent();
                    if (!(tagName === 'H1' && text)) return [3 /*break*/, 22];
                    currentTopic = text;
                    content[currentTopic] = {};
                    return [3 /*break*/, 24];
                case 22:
                    if (!(tagName === 'H2' && currentTopic)) return [3 /*break*/, 24];
                    subtopicText = text;
                    return [4 /*yield*/, topic.locator('a').getAttribute('href')];
                case 23:
                    subTopicLink = _f.sent();
                    content[currentTopic][subtopicText] = subTopicLink ? new URL(subTopicLink, page.url()).href : null;
                    _f.label = 24;
                case 24:
                    _e++;
                    return [3 /*break*/, 19];
                case 25:
                    directory[mainTopic].topics = content;
                    root = navBarLocator.locator('div[tabindex="0"]:has-text("/ sidebar.root")').nth(0);
                    return [4 /*yield*/, root.click()];
                case 26:
                    _f.sent();
                    return [4 /*yield*/, page.goto('https://wiki.noovosoft.com')];
                case 27:
                    _f.sent();
                    return [4 /*yield*/, delay(1000)];
                case 28:
                    _f.sent();
                    return [3 /*break*/, 30];
                case 29:
                    error_2 = _f.sent();
                    console.error("Error Occurred in Path: ".concat(path, " - ").concat(error_2));
                    return [2 /*return*/, "Error while navigating: ".concat(error_2)];
                case 30: return [2 /*return*/, directory];
            }
        });
    });
}
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, context, page, username, password, _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, error_3;
    return __generator(this, function (_o) {
        switch (_o.label) {
            case 0: return [4 /*yield*/, playwright_1.chromium.launch({ headless: false })];
            case 1:
                browser = _o.sent();
                return [4 /*yield*/, browser.newContext()];
            case 2:
                context = _o.sent();
                return [4 /*yield*/, context.newPage()];
            case 3:
                page = _o.sent();
                username = process.env.USERNAME;
                password = process.env.PASSWORD;
                if (!username || !password) {
                    console.log('Username or Password is not available');
                    return [2 /*return*/];
                }
                return [4 /*yield*/, page.goto('https://wiki.noovosoft.com/login')];
            case 4:
                _o.sent();
                return [4 /*yield*/, page.locator('div.login-form input[type="email"]').fill(username)];
            case 5:
                _o.sent();
                return [4 /*yield*/, page.locator('div.login-form input[type="password"]').fill(password)];
            case 6:
                _o.sent();
                return [4 /*yield*/, page.locator('button:has-text("Log In")').click()];
            case 7:
                _o.sent();
                return [4 /*yield*/, page.waitForURL('https://wiki.noovosoft.com')];
            case 8:
                _o.sent();
                _o.label = 9;
            case 9:
                _o.trys.push([9, 15, , 16]);
                _b = (_a = console).log;
                _d = (_c = JSON).stringify;
                return [4 /*yield*/, navigateToPath('JavaScript=> Exercises', page)];
            case 10:
                _b.apply(_a, [_d.apply(_c, [_o.sent(), null, 2])]);
                return [4 /*yield*/, delay(2000)];
            case 11:
                _o.sent();
                _f = (_e = console).log;
                _h = (_g = JSON).stringify;
                return [4 /*yield*/, navigateToPath('CSS=> Bootstrap =>Customize CSS', page)];
            case 12:
                _f.apply(_e, [_h.apply(_g, [_o.sent(), null, 2])]);
                return [4 /*yield*/, delay(2000)];
            case 13:
                _o.sent();
                _k = (_j = console).log;
                _m = (_l = JSON).stringify;
                return [4 /*yield*/, navigateToPath('IntelliJ=>Knewifujkbbrek', page)];
            case 14:
                _k.apply(_j, [_m.apply(_l, [_o.sent(), null, 2])]);
                return [3 /*break*/, 16];
            case 15:
                error_3 = _o.sent();
                console.error("An error occurred during Navigation:", error_3);
                return [3 /*break*/, 16];
            case 16: return [4 /*yield*/, browser.close()];
            case 17:
                _o.sent();
                return [2 /*return*/];
        }
    });
}); })();
