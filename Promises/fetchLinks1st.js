const links = [
    'https://api.publicapis.org/entries',
    'https://catfact.ninja/fact',
    'https://api.coindesk.com/v1/bpi/currentprice.json',
    'https://www.boredapi.com/api/activity',
    'https://api.agify.io?name=meelad',
    'https://api.genderize.io?name=luc',
    'https://api.nationalize.io?name=nathaniel',
    'https://datausa.io/api/data?drilldowns=Nation&measures=Population',
    'https://dog.ceo/api/breeds/image/random',
    'https://api.ipify.org?format=json'
];

async function fetchData(urls){
    for(const link of urls){
        try{
            const data = await fetch(link)
                .then(response => response.json())
                .catch(error => ({ error: `Failed to fetch: ${link}`, details: error }));
            console.log(data);
        }catch(err){
            console.error(err);
        }
    }
}

fetchData(links).then();