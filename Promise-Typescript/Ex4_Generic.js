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
const links2 = [
    "https://api.github.com/user/emails",
    "https://api.github.com/emojis",
    "https://api.github.com/events",
    "https://api.github.com/feeds",
    "https://api.github.com/issues",
    "https://api.github.com/notifications",
    "https://api.github.com/authorizations",
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
    "https://dog.ceo/api/breeds/image/random",
    "https://api.ipify.org?format=json"
];
function fetchLink(currentIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        const url = links2[currentIndex];
        return fetch(url)
            .then((response) => response.json())
            .then((dynamicData) => ({ data: dynamicData, index: currentIndex }))
            .catch((error) => ({ error: error.message, index: currentIndex }));
    });
}
function fetchData(urls, limit) {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = [];
        let index = 0;
        let status = false;
        for (const url of urls) {
            const currentIndex = index++;
            if (!status) {
                const task = fetchLink(currentIndex);
                queue.push({ promise: task, index: currentIndex });
            }
            else {
                status = false;
            }
            if (queue.length >= limit) {
                const resolved = yield Promise.race(queue.map((t) => t.promise));
                console.log(`Resolved Task Index: ${resolved.index}`);
                const resolvedTaskIndex = queue.findIndex((t) => t.index === resolved.index);
                if (resolvedTaskIndex !== -1) {
                    console.log(`Replacing task at index ${resolvedTaskIndex}`);
                    const newTask = fetchLink(index);
                    queue[resolvedTaskIndex] = { promise: newTask, index };
                    status = true;
                }
            }
        }
        yield Promise.all(queue.map((t) => t.promise));
    });
}
fetchData(links2, 3).then(() => {
    console.log("All tasks completed.");
});
