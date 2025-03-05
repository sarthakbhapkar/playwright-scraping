// type Student={
//     name: string,
//     email: string,
//     phone: string,
//     password?: string
// }
// function printStudent(student: Student) {
//     console.log(student.name, student.email, student.phone);
// }
// let student: Student={
//     name: "John",
//     email: "john@example.com",
//     phone: "0123456789",
// }
// printStudent(student);

// interface Student {
//     name: string;
// }
// interface Teacher extends Student {
//     role: string;
// }
// function showTeacher(teacher: Teacher) {
//     console.log(teacher.name,teacher.role);
// }
// let Teacher: Teacher={
//     name:'Sarthak',
//     role:'Principal'
// };
// showTeacher(Teacher)

//Simple function with union
// type input = number | string;
// function printId(id: input){
//     if(typeof id === 'string'){
//         console.log('String Id', id)
//     }else{
//         console.log('Number Id', id)
//     }
// }
// printId(45);
//
// //function with optional parameters
// function printName(obj:{fName:string, lName?:string}){
//     if(obj.lName){
//         console.log(obj.fName+' '+obj.lName);
//     }
//     else{
//         console.log(obj.fName);
//     }
// }
// printName({fName:'Sarthak', lName:'Bhapkar'})

//Type alias
// type animal= string
// let dog: animal = 'Puppy';
// console.log(typeof dog)
//
// type Point={
//     x: number;
//     y: number;
// }
// function printPoints(point:Point){
//     console.log(point.x+point.y)
// }
// printPoints({x:45,y:45});

//Interfaces
// interface Points{
//     x:number;
//     y:number;
// }
// function printIt(point:Points){
//     console.log(point.x+point.y)
// }
// printIt({x:45, y:45})

// interface User {
//     name: string;
//     age: number;
// }
// interface Admin extends User {
//     role: string;
// }
// class SuperAdmin implements Admin {
//     name: string;
//     age: number;
//     role: string;
//     constructor(name: string, age: number, role: string) {
//         this.name = name;
//         this.age = age;
//         this.role = role;
//     }
// }
// let sAdmin: SuperAdmin = {
//     name:'Sarthak',
//     age:30,
//     role:'Principal',
// }
// console.log(sAdmin.name);

// ---

// interface Person {
//     name: string;
//     age: number;
//     greet(): void;
// }
// function printPerson(person: Person) {
//     console.log(person.name);
//     console.log(person.age);
//     person.greet();
// }
// const user: Person = {
//     name: 'Alice',
//     age: 30,
//     greet() {
//         console.log('Hello!');
//     }
// };
// printPerson(user);
//
// type p1={
//     name: string;
//     age: number;
// }
// function p2(person: p1) {
//     console.log(person.name);
//     console.log(person.age);
// }
// const u2: p1 = {
//     name: 'Alice',
//     age: 30,
// }
// p2(u2);

//
// interface Values {
//     x:number;
//     y:number;
//     z:number;
//     cal():void;
// }
// class Calculate implements Values {
//     x:number;
//     y:number;
//     z:number;
//     constructor(x:number,y:number,z:number) {
//         this.x = x;
//         this.y = y;
//         this.z = z;
//     }
//     cal(){
//         console.log(this.x*this.y*this.z)
//     }
// }
//
// let c1=new Calculate(3,4,5);
// c1.cal()

// class Animal {
//     name: string;
//     constructor(name: string) {
//         this.name = name;
//     }
//     move(distance: number): void {
//         console.log(`${this.name} moved ${distance} meters.`);
//     }
// }
// class Dog extends Animal {
//     bark(): void {
//         console.log("Woof! Woof!");
//     }
// }
// const dog = new Dog("Buddy");
// dog.bark();
// dog.move(10);

// function multiply(n: number, ...m: number[]) {
//     return m.map((x) => n * x);
// }
// const a = multiply(10, 1, 2, 3, 4);

// const arr1 = [1, 2, 3];
// const arr2 = [4, 5, 6];
// arr1.push(...arr2);
// console.log(arr1)

// function sum({ a, b, c }:{a:number, b: number, c:number}) {
//     console.log(a + b + c);
// }
// sum({ a: 10, b: 3, c: 9 });
//
// const f2 = (): boolean => true;

// enum numbers{
//     maths,
//     science,
//     physics
// }
// function favSubject(name: string, sub:numbers){
//     console.log(name + ': ' + sub);
// }
// favSubject('Sarthak', numbers.maths);

// function myForEach(arr: any[], callback: (arg: any, index?: number) => void) {
//     for (let i = 0; i < arr.length; i++) {
//         callback(arr[i], i);
//     }
// }
// myForEach([1, 2, 3], (a) => console.log(a));
// myForEach([1, 2, 3], (a, i) => console.log(a, i));

// type voidFunc = () => void;
//
// const f1: voidFunc = () => {
//     return true;
// };
//
// const f2: voidFunc = () => true;
//
// const f3: voidFunc = function () {
//     return true;
// };
//
// function identity<type>(arg: type):type{
//     return arg;
// }
// const n = identity('Sarthak')
// console.log(n)
// const number = identity(5)
// console.log(number)
//
// function add<T=number>(val1: T, val2: T): void {
//     console.log(val1,val2);
// }
// add<number>(50, 45);
// add<string>('Sarthak', 'Bhapkar');
//
// //---
// function loggingIdentity<T>(val1:T[]):T[]{
//     return val1;
// }
// console.log(loggingIdentity([1,2,3,4,5,6,7,8,9,10]));
//
// //-- Generic interfaces
// interface Type {
//     <T>(arg: T): T;
// }
// let myIdentity: Type = function <T>(arg: T): T {
//     return arg;
// };
// console.log(myIdentity('Sarthak'+'Bhapkar'));
// console.log(myIdentity(45));
//
// //-- Generic Classes
//
// class Generic<numType>{
//     value: numType;
//     add:(x:numType, y:numType)=>numType;
//     constructor(value:numType, add:(x:numType, y:numType)=>numType) {
//         this.value = value;
//         this.add = add;
//     }
// }
// let myGen = new Generic<number>(
//     45,
//     (x: number, y: number): number => x + y
// );
// console.log(myGen.value);
// console.log(myGen.add(65,75));
//
// //-- Generic Constraints
// function logging<T=string>(arg: T): T {
//     return arg;
// }
// let s:number=logging<number>(43);
// let n:string=logging('Sarthak');
// console.log(s);
// console.log(n);

// function reverse<T>(arr: T[]): T[] {
//     return arr.reverse();
// }
//
// const ans:number[] = reverse<number>([1, 2, 3, 4, 5]);
// console.log(ans)
//
// interface Pair<T,U>{
//     first: T;
//     second: U;
// }
//
// let pair1: Pair<number,string>={first:45, second:'Sarthak'};
// let pair2: Pair<string,number>={first:'45', second:45};
// console.log(pair1, pair2)
//
// // interface Num<T,U>{
// //     first:T;
// //     second:U;
// // }
// // function calculate(num:Num<number,string>){
// //     console.log(num.first)
// //     console.log(num.second)
// // }
// // calculate({first:56, second:'Sarthak'});
// class operation<T>{
//     private num1:T;
//     private num2:T;
//     constructor(num1:T,num2:T) {
//         this.num1 = num1;
//         this.num2 = num2;
//     }
//     getValues():T{
//        if(this.num1<this.num2){
//            return this.num1;
//        }
//        else{ return this.num2; }
//     }
// }
// const greaterNo= new operation<number>(45,50);
// const greaterStr=new operation<string>('Sarthak22','Bhapkar');
// console.log(greaterNo.getValues())
// console.log(greaterStr.getValues())
//
// function getValue<T, K extends keyof T>(obj: T, key: K): T[K] {
//     return obj[key];
// }
// const myObj = { first: 56, second: 'Sarthak', third: true };
// const firstValue = getValue(myObj, 'first');
// const secondValue = getValue(myObj, 'second');
// const thirdValue = getValue(myObj, 'third');
// console.log(firstValue);
// console.log(secondValue);
// console.log(thirdValue);

// const content = await page.locator('div.contents').evaluate((div) => {
//     const obj: Heading = {};
//     const childElements = div.children;
//
//     Array.from(childElements).forEach((child) => {
//         if (child.tagName === 'H1') {
//             const headingText = child.textContent?.trim() || "";
//             obj[headingText] = {};
//         } else if (child.tagName === 'UL') {
//             const subTopics: SubHeading = {};
//             const liElements = child.querySelectorAll('li > a');
//             liElements.forEach((a) => {
//                 const anchor = a as HTMLAnchorElement;
//                 const subText = anchor.textContent?.trim();
//                 const subUrl = anchor.href;
//                 if (subText && subUrl) {
//                     subTopics[subText] = subUrl;
//                 }
//             });
//             obj.headingText = subTopics;
//         }
//     });
//     return obj;
// });

// const content = await page.locator('div.contents').evaluate((div) => {
//     const obj:Heading = {};
//     const h1Elements = Array.from(div.querySelectorAll('h1'));
//
//     h1Elements.forEach((h1) => {
//         const headingText = h1.textContent?.trim() || "";
//         obj[headingText] = {};
//         let sibling = h1.nextElementSibling;
//         while (sibling) {
//             if (sibling.tagName === 'UL') {
//                 const subTopics:SubHeading = {};
//                 const liElements = sibling.querySelectorAll('li > a');
//                 liElements.forEach((a) => {
//                     const anchor = a as HTMLAnchorElement;
//                     const subText = anchor.textContent?.trim();
//                     const subUrl = anchor.href;
//                     if (subText && subUrl) {
//                         subTopics[subText] = subUrl;
//                     }
//                 });
//                 obj[headingText] = subTopics;
//             }
//             sibling = sibling.nextElementSibling;
//         }
//     });
//
//     return obj;
// });

//--------------------------------------------------------------------------------------

// import {chromium} from 'playwright';
//
// interface Heading {
//     [key: string]: {
//         [subKey: string]: string;
//     };
// }
//
// interface SubHeading {
//     [key: string]: string;
// }
//
// (async () => {
//     const browser = await chromium.launch({headless: false});
//     const context = await browser.newContext();
//     const page = await context.newPage();
//
//     await page.goto('https://wiki.noovosoft.com/login');
//     console.log("Landed on login page");
//
//     await page.waitForSelector('input[type="email"]');
//     await page.fill('input[type="email"]', 'sarthak.bhapkar@noovosoft.com');
//     await page.fill('input[type="password"]', 'Sarthak@30');
//     console.log("Entered email and password");
//     await page.click('text=Log In');
//     try {
//         //await page.waitForURL('https://wiki.noovosoft.com/');
//         await page.waitForNavigation({ timeout: 3000 });
//         console.log('Login successful!!!');
//     } catch (error) {
//         console.log('Invalid Username or Password')
//     }
//
//     if (page.url() !== 'https://wiki.noovosoft.com/') {
//         console.log(`You are not on the home page: ${page.url()}`);
//         await page.goto('https://wiki.noovosoft.com/');
//     }
//
//     await page.waitForSelector('.v-list.py-2.v-sheet.theme--dark.v-list--dense.grey.darken-4-d4');
//     const topicsInNav = await page.$$eval(
//         '.v-list.py-2.v-sheet.theme--dark.v-list--dense.grey.darken-4-d4 a, .v-list.py-2.v-sheet.theme--dark.v-list--dense.grey.darken-4-d4 .v-list-item__title',
//         elements => {
//             return [...new Set(elements.map(el => el.textContent?.trim()))];
//         }
//     );
//     console.log("Topics in Navigation Bar:", topicsInNav);
//
//     const content = await page.$eval('div.contents', (div) => {
//         const obj: Heading = {};
//         const h1Elements = Array.from(div.querySelectorAll('h1'));
//         h1Elements.map((h1) => {
//             const headingText = h1.textContent?.trim() || "Untitled Heading";
//             obj[headingText] = {};
//             let sibling = h1.nextElementSibling;
//             while (sibling) {
//                 if (sibling.tagName === 'UL') {
//                     const subTopics: SubHeading = {};
//                     const liElements = sibling.querySelectorAll('li > a');
//                     liElements.forEach((a) => {
//                         const anchor = a as HTMLAnchorElement;
//                         const subText = anchor.textContent?.trim();
//                         const subUrl = anchor.href;
//                         if (subText && subUrl) {
//                             subTopics[subText] = subUrl;
//                         }
//                     });
//                     obj[headingText] = subTopics;
//                 }
//                 sibling = sibling.nextElementSibling;
//             }
//         });
//         return obj;
//     });
//
//     console.log("Structured Content:", JSON.stringify(content,null,2));
// })();

//----------------------------------------------------------------
// const content = await page.locator('div.contents').evaluate((div) => {
//     const obj: Heading = {};
//     const childElements = div.children[0].children;
//
//     Array.from(childElements).forEach((child) => {
//         if (child.tagName === 'H1') {
//             const headingText = child.textContent?.trim() || "";
//             obj[headingText] = {};
//         } else if (child.tagName === 'UL') {
//             const subTopics: SubHeading = {};
//             const liElements = child.querySelectorAll('li > a');
//             liElements.forEach((a) => {
//                 const anchor = a as HTMLAnchorElement;
//                 const subText = anchor.textContent?.trim();
//                 const subUrl = anchor.href;
//                 if (subText && subUrl) {
//                     subTopics[subText] = subUrl;
//                 }
//             });
//
//             const lastHeading = Object.keys(obj).pop();
//             if (lastHeading) {
//                 obj[lastHeading] = subTopics;
//             }
//         }
//     });
//
//     return obj;
// });





