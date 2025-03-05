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
class TaskGenerator{
    private taskIndex = 0;
    hasPendingTasks = () => {
        return this.taskIndex < links.length;
    };
    getNextTask<T>(currentIndex:T){
        const url = this.hasPendingTasks() ? links[this.taskIndex++] : null;
        return url
            ? fetch(url)
                .then((response: Response) => response.json())
                .then((dynamicData: any) => ({ data: dynamicData, index: currentIndex }))
                .catch((error: any) => ({ error: error.message, index: currentIndex }))
            : null;
    };
}
const taskGenerator = new TaskGenerator();
async function processTasks<T extends number>(batchSize: T) {
    const queue: { promise: Promise<any>; index: number }[] = [];

    for (let i = 0; i < batchSize && taskGenerator.hasPendingTasks(); i++) {
        const task = taskGenerator.getNextTask(i);
        if (task) {
            queue.push({ promise: task, index: i });
        }
    }
    while (queue.length > 0) {
        const resolved = await Promise.race(queue.map((t) => t.promise));
        console.log("Resolved Task Index:", resolved.index);
        if (resolved.index !== -1) {
            if (taskGenerator.hasPendingTasks()) {
                const newTask = taskGenerator.getNextTask(resolved.index);
                if (newTask) {
                    queue[resolved.index] = { promise: newTask, index: resolved.index };
                } else {
                    queue.splice(resolved.index, 1);
                }
            } else {
                queue.splice(resolved.index, 1);
            }
        }
    }
    console.log("All tasks completed.");
}
processTasks<number>(3).then();