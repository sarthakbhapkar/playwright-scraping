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
async function fetchData(urls, limit) {
    const results = [];
    const queue = [];
    let index=0;
    for (const url of urls) {
        const currentIndex=index++;
        const task = fetch(url)
            .then((response) => response.json())
            .then((data) => {
                results[currentIndex] = data;
                return currentIndex;
            })
            .catch((error) => {
                results[currentIndex] = { error: `Failed to fetch data at index ${currentIndex}`, details: error };
                return currentIndex;
            });
        queue.push({ promise: task, index: currentIndex });
        if (queue.length >= limit) {
            const resolvedIndex = await Promise.race(queue.map((t) => t.promise));
            console.log(`Resolved task index: ${resolvedIndex}`);
            const resolvedTaskIndex = queue.findIndex((t) => t.index === resolvedIndex);
            console.log(`Resolved task index in Queue: ${resolvedTaskIndex}`);
            if (resolvedTaskIndex !== -1) {
                queue.splice(resolvedTaskIndex, 1);
            }
        }
    }
    await Promise.all(queue.map((t) => t.promise));
    return results;
}
fetchData(links, 3).then((data)=> console.log(data));

