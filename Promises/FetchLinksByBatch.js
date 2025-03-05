const links = [
    "https://api.github.com/user/emails",
    "https://api.publicapis.org/entries",
    "https://api.github.com/events",
    "https://api.github.com/feeds",
    "https://api.github.com/issues",
    "https://api.github.com/notifications",
    "https://api.github.com/authorizations",
    "https://datausa.io/api/data?drilldowns=Nation&measures=Population",
    "https://dog.ceo/api/breeds/image/random",
    "https://api.ipify.org?format=json"
];

async function fetchData(urls,count){

    for(let i=0; i < urls.length; i+=count){
        const batch=urls.slice(i,i+count);
        try{
            const data = await Promise.allSettled(
                batch.map(link =>
                    fetch(link)
                        .then(response => response.json())
                        .catch(error => ({ error: `Failed to fetch: ${link}`, details: error }))

                )
            );
            for (const result of data) {
                console.log(result);
            }
            console.log('-------------Batch Completed----------------------');
        }catch(err){
            console.error(error => ({ error: `Failed to fetch data`, details: error }));
        }
    }
}

fetchData(links,3).then();


