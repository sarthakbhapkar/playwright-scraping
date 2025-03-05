console.log('---------------------Practice------------------------------');
function fun(t){
    return new Promise((resolve,reject) => {
        setTimeout(()=>{
            resolve(t + ' Resolved Successfully!');
        }, t)
    });
}

fun(1000)
    .then(data => console.log(data));

function delay(time){
    return new Promise(resolve => setTimeout(resolve, time));
}
await delay(1000);