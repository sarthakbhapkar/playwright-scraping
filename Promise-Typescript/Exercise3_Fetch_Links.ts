// const links = [
//     "https://api.github.com/user/emails",
//     "https://api.github.com/emojis",
//     "https://api.github.com/events",
//     "https://api.github.com/feeds",
//     "https://api.github.com/issues",
//     "https://api.github.com/notifications",
//     "https://api.github.com/authorizations",
//     "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
//     "https://dog.ceo/api/breeds/image/random",
//     "https://api.ipify.org?format=json"
// ];
//
//
// interface FetchResult {
//     data?: any;
//     error?: string;
//     index: number;
// }
// async function fetchLink(currentIndex: number): Promise<FetchResult> {
//     const url = links[currentIndex];
//
//     return fetch(url)
//         .then((response: Response) => response.json())
//         .then((dynamicData: any) => ({data: dynamicData, index: currentIndex}))
//         .catch((error: any) => ({error: error.message, index: currentIndex}));
// }
//
// async function fetchData(urls: string[], limit: number): Promise<void> {
//     const queue: { promise: Promise<FetchResult>; index: number }[] = [];
//     let index = 0;
//     let status = false;
//     for (const url of urls) {
//         const currentIndex = index++;
//         if (!status) {
//             const task = fetchLink(currentIndex)
//             queue.push({promise: task, index: currentIndex});
//         } else {
//             status = false;
//         }
//         if (queue.length >= limit) {
//             const resolved = await Promise.race(queue.map((t) => t.promise));
//             console.log('Resolved Task Index', resolved.index);
//             const resolvedTaskIndex = queue.findIndex((t) => t.index === resolved.index);
//             console.log('Resolved Task Index in queue', resolvedTaskIndex);
//
//             if (resolvedTaskIndex !== -1) {
//                 const newTask = fetchLink(index);
//                 queue[resolvedTaskIndex] = {promise: newTask, index};
//                 status = true;
//             }
//         }
//     }
//     await Promise.all(queue.map((t) => t.promise));
// }
//
// fetchData(links, 3).then();
//
//
//
//
