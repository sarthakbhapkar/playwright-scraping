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
interface FetchResult<T, U, V> {
    data?: T;
    error?: U;
    index: V;
}

async function fetchLink<V extends number>(currentIndex: V): Promise<FetchResult<any, string, number>> {
    const url = links2[currentIndex];
    return fetch(url)
        .then((response: Response) => response.json())
        .then((dynamicData: any) => ({ data: dynamicData, index: currentIndex }))
        .catch((error: any) => ({ error: error.message, index: currentIndex }));
}

async function fetchData<T, U extends number>(urls: T[], limit: U) {
    const queue: { promise: Promise<FetchResult<any, string, number>>; index: number }[] = [];
    let index = 0;
    let status = false;
    for (const url of urls) {
        const currentIndex = index++;
        if (!status) {
            const task = fetchLink(currentIndex);
            queue.push({ promise: task, index: currentIndex });
        } else {
            status = false;
        }
        if (queue.length >= limit) {
            const resolved = await Promise.race(queue.map((t) => t.promise));
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
    await Promise.all(queue.map((t) => t.promise));
}

fetchData<string, number>(links2, 3).then(() => {
    console.log("All tasks completed.");
});
