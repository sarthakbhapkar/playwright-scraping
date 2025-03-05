// const arr:number[]=[1,2,3,4,5]
// const arr2:string[]=['a','b','c','d','e']
//
// //arr.reduce((acc,val,ind,arr)=>
// function red<T>(acc:T,arr:T[], print:Function){
//     for(const val of arr){
//         acc=(acc as any)+val;
//         print(acc)
//     }
// }
//
// function print(sum:number){
//     console.log('Sum is ', sum);
// }
//
// red(0,arr,print)
// red('',arr2,print)

// const arr = [1, 2, 3, 4, 5]
// const arr2 = ['a', 'b', 'c', 'd', 'e']
//
// function mapOpe<T>(arr: T[], print: Function) {
//     return arr.reduce((acc: T[], val) => {
//         acc.push(print(val))
//         return acc;
//     }, [])
// }
//
// function print<T>(result: T):T {
//     return (result as any) + 1;
// }
//

// interface Person{
//     name:string,
//     age:number,
//     sal:number
// }
// const person:Person={
//     name:'Sarthak',
//     age:21,
//     sal:250000
// }
//
// function printName(person:Person){
//     for(const key of Object.values(person)){
//         console.log(key)
//     }
// }
// printName(person)

// Double the array
const num = [1, 2, 3, 4]
const ans = num.map(val => val * 2)
console.log(ans)

// Return the length of each
const str = ['abc', 'pqrs', 'tvwxc']
console.log(str.map(val => val.length));

//Convert cel to far
const cel = [0, 10, 20, 30];
const far = cel.map(val => val * 33.8)
console.log(far)

//Filter return words with len more than 5
const words = ["cat", "elephant", "dog", "giraffe"];

const len = words.filter(word => word.length > 5)
console.log(len)

//Filter out falsy values
const val = [0, "hello", "", false, 42, null, undefined];
const falsyVal = val.filter(v => !v)
console.log(falsyVal)

//Find max element
const nums = [10, 25, 5, 40, 100]
const max = nums.reduce((acc, val) => {
    return Math.max(acc, val)
})
console.log(max)

//count each word in an array of words
const words2 = ["apple", "banana", "coconut", "mango", "apple", "banana"]
const occ = words2.reduce<{ [key: string]: number }>((acc, val) => {
    if (acc[val]) {
        acc[val]++;
    } else {
        acc[val] = 1;
    }
    return acc;
}, {})
console.log(occ)

//Sqaure the odd numbers
const words3 = [1, 2, 3, 4, 5, 6]
const squared = words3.filter(word => word % 2 !== 0).map(val => val * val);
console.log(squared)

//convert string into uppercase that starts with a
const words4 = ["apple", "banana", "coconut", "mango", "apple", "banana"]
const upppered = words4.filter(w => w.startsWith('a')).map(val => val.toUpperCase())
console.log(upppered)

const products = [
    {name: "Laptop", price: 1000, quantity: 2},
    {name: "Phone", price: 500, quantity: 4},
    {name: "Tablet", price: 300, quantity: 3}
];

const prices = products.map(val => val.price * val.quantity).reduce((acc, sum) => {
    return acc + sum;
}, 0)
console.log(prices)

const num2 = [10, 23, 54, 23, 12]
const avg = num2.reduce((acc, val, ind, arr) => {
    return acc + val;
}, 0) / num2.length - 1;
console.log(avg)

//Return a list of name of students who scored more than 80
const students = [
    {name: "Alice", score: 85},
    {name: "Bob", score: 72},
    {name: "Charlie", score: 90},
    {name: "David", score: 65}
];
const stud = students.filter(val => val.score > 80).map(v => v.name)
console.log(stud)

//Flatten a 2D array (array of arrays) into a single array using reduce.

const arr = [[1, 2], [3, 4], [5, 6]];
const flatten = arr.reduce((acc, val) => {
    console.log(val)
    return acc.concat(val);
}, [])
console.log(flatten)

// Group an array of people by their age.
const people = [
    {name: "Alice", age: 25},
    {name: "Bob", age: 30},
    {name: "Charlie", age: 25},
    {name: "David", age: 30},
    {name: "Eve", age: 35}
];
const ageGroup = people.filter(value => {

})

// const arr = [1, 2, 3, 4, 5]
//
// function redFun<T>(arr: T[], calculate: (acc: T, val: T, index: number, arr: T[]) => T, initial: T) {
//     let accu = initial;
//     for (let i = 0; i < arr.length; i++) {
//         accu = calculate(accu, arr[i], i, arr);
//     }
//     return accu;
// }
//
// function calculate<T extends number>(acc: T, num: T) {
//     return acc * num;
// }
//
// console.log(redFun(arr, calculate, 1));

//
//
// function mapFun<T>(arr:T[],calculate2:(val:T, index:number, arr:T[])=>T){
//     const sum=[];
//     for(let i=0;i<arr.length;i++){
//         sum.push(calculate2(arr[i],i,arr))
//     }
//     return sum;
// }
// function calculate2<T>(num:T){
//     return (num as any)+5;
// }
// console.log(mapFun(arr,calculate2));
//
// function filtFun<T,U>(arr:T[],calculate3:(val:T,index:number,arr:T[])=>U){
//     let newArr=[];
//     for(let i=0;i<arr.length;i++){
//         if(calculate3(arr[i],i,arr)){
//             newArr.push(arr[i])
//         }
//     }
//     return newArr;
// }
// function calculate3<T,U>(num:T){
//     return (num as any)%2===0;
// }
// console.log(filtFun(arr,calculate3));

// console.log(mapOpe(arr, print))
// console.log(mapOpe(arr2, print))

// function findNested(obj:Record<string, any>,str:string){
//     const newStr=str.split('.');
//     let newObj=obj;
//     for(const key of newStr){
//         if(newObj[key]===undefined)
//         {
//             return null;
//         }
//         newObj=newObj[key];
//     }
// }

// const arr5=['iso','training']
// for(const v of arr5){
//     console.log(v)
// }

const obj={
    name:'abc',
    city:'Pune'
}
console.log(obj?.name);
// console.log(obj.sal);

// const locatorInContent = page.locator('div.contents');
// const topics = await locatorInContent.locator('h1').all();
// const currentURL = page.url();
//
// let content = {};
//
// for (const topic of topics) {
//     const topicText = await topic.innerText();
//     const subtopics = [];
//
//     const followingH2s = await topic.locator('following-sibling::h2').all();
//
//     for (const subtopic of followingH2s) {
//         const subtopicText = await subtopic.innerText();
//         const anchorTag = subtopic.locator('a');
//         const href = await anchorTag.getAttribute('href');
//
//         subtopics.push({
//             subtopic: subtopicText,
//             url: new URL(href || '', currentURL).href
//         });
//
//         await delay(2000);
//     }
//
//     content[topicText] = subtopics;
// }
//
// console.log(content);

//-------------------------------------------------------

// await Promise.all(
//     topics.map(async (topic) => {
//         const tagName = await topic.evaluate(el => el.tagName);
//         const text = await topic.innerText();
//
//         if (tagName === 'H1' && text.trim() !== '') {
//             currentTopic = text;
//             content[currentTopic] = {};
//         } else if (tagName === 'H2' && currentTopic) {
//             const subtopicText = text.trim();
//             const subTopicLink = await topic.locator('a').getAttribute('href');
//             content[currentTopic][subtopicText] = subTopicLink ? new URL(subTopicLink, page.url()).href : null;
//         }
//     })
// );

//-----------------------------------------------------------------------------------------

//        const locatorInContentSection = page.locator('div.contents');
//         const mainTopics = await locatorInContentSection.locator('h1').all();
//         const content: Record<string, any> = {};
//
//         for (const topic of mainTopics) {
//             const text = await topic.innerText();
//             const trimmedText = text.trim();
//
//             if (trimmedText) {
//                 content[trimmedText] = {};
//             }
//         }
//
//         const subTopics = await locatorInContentSection.locator('h2').all();
//         let currentTopic = '';
//
//         for (const subTopic of subTopics) {
//             const text = await subTopic.innerText();
//             const trimmedSubtopicText = text.trim();
//             const subTopicLink = await subTopic.locator('a').getAttribute('href');
//             const subtopic = {
//                 subTopic: trimmedSubtopicText,
//                 link: subTopicLink ? new URL(subTopicLink, page.url()).href : null
//             };
//
//             const previousElementLocator = subTopic.locator('xpath=preceding-sibling::h1[1]');
//             const previousTagName = await previousElementLocator.evaluate(el => el ? el.tagName : '');
//
//             if (previousTagName === 'H1') {
//                 const previousText = await previousElementLocator.innerText();
//                 const trimmedPreviousText = previousText.trim();
//
//                 if (trimmedPreviousText) {
//                     currentTopic = trimmedPreviousText;
//                 }
//             }
//
//             if (currentTopic && trimmedSubtopicText) {
//                 content[currentTopic][trimmedSubtopicText] = subtopic;
//             }
//         }




