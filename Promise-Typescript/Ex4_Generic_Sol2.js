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
const links = [
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
class TaskGenerator {
    constructor() {
        this.taskIndex = 0;
        this.hasPendingTasks = () => {
            return this.taskIndex < links.length;
        };
    }
    getNextTask(currentIndex) {
        const url = this.hasPendingTasks() ? links[this.taskIndex++] : null;
        return url
            ? fetch(url)
                .then((response) => response.json())
                .then((dynamicData) => ({ data: dynamicData, index: currentIndex }))
                .catch((error) => ({ error: error.message, index: currentIndex }))
            : null;
    }
    ;
}
const taskGenerator = new TaskGenerator();
function processTasks(batchSize) {
    return __awaiter(this, void 0, void 0, function* () {
        const queue = [];
        for (let i = 0; i < batchSize && taskGenerator.hasPendingTasks(); i++) {
            const task = taskGenerator.getNextTask(i);
            if (task) {
                queue.push({ promise: task, index: i });
            }
        }
        while (queue.length > 0) {
            const resolved = yield Promise.race(queue.map((t) => t.promise));
            console.log("Resolved Task Index:", resolved.index);
            if (resolved.index !== -1) {
                if (taskGenerator.hasPendingTasks()) {
                    const newTask = taskGenerator.getNextTask(resolved.index);
                    if (newTask) {
                        queue[resolved.index] = { promise: newTask, index: resolved.index };
                    }
                    else {
                        queue.splice(resolved.index, 1);
                    }
                }
                else {
                    queue.splice(resolved.index, 1);
                }
            }
        }
        console.log("All tasks completed.");
    });
}
processTasks(3).then();
