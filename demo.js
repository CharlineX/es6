//变量声明
//同一作用域中不能重复声明
	let a=1;
	function b(){
		let a=3;
		console.log(a);
	}
	b();
	//let a=2;
	//同一作用域中不能重复声明
	console.log(a);
//常量声明
//同一作用域中不能重复声明
//（1.常量不可更改，修改会报错2.常量名全大写）
const NAME = 666;
function c(){
	const NAME=233;
	console.log(NAME);
}
c();
console.log(NAME);

//解构赋值
let obj={
	name :"名字",
	sex : "中",
	"weight":200
};
console.log(obj);
let{
	name,//对象的属性名可解构为同名的变量名
	sex,
	weight,//相当于是let weight =obj.weight
	height//如果对象没有此属性，这个变量也会声明，不过值为underfined
}=obj;
//let里面不能出现字符串、-
console.log(name,sex,weight,height);

const obj1={
	name :"名字",
	NAME :"名字",
	SEX : "中",
	"WEIGHT":200
};
console.log(obj1);
try{
	let{
	name,//同名的变常量都不能再同一作用域里重复声明
	NAME,
	sex,
	SEX,
	WEIGHT,//相当于是let weight =obj.weight
	HEIGHT
}=obj1;
console.log(name,NAME,SEX,WEIGHT,HEIGHT);
}catch(e){}


//方法声明
//一个参数的时候可以省去小括号
const func0 = () =>{
	console.log(233);
}
func0();
const func = name =>{
	console.log(name);
}
func("名字");
const func1 = (name,sex) =>{
	console.log(name,sex);
}
func1("名字","中");
const func2 = (name,sex,weight=200/*方法默认值设置，如果传了此参数则用传的参数值，没传，则默认值*/) =>{
	console.log(name,sex,weight);
}
func2("名字","中",300);
//方法返回值
const add =(a,b) => a + b;
const multi =(a,b) => a * b;
const addminusmulti =(a,b)=>add(a,b) -multi(a,b)
console.log(add(5,6),multi(3,4),addminusmulti(8,1));

//对象声明
try{
	let object = {
	name : "名字",
	//school,//上下文没有赋值，报错，underfined
	sex,//如果属性没有赋值，则此属性会查找上下文获取同名变常量的值
	speak(){
		console.log(this.name);
	}
};
	console.log(object);
	object.speak();
}catch(e){}

//类声明
class People{
	constructor(option){
		// console.log(option);
		console.log(this);
		this.name = option.name;
		this.play = option.play;
	}
	drink(){
		console.log("I can drink");
		return this;
	}
	walk(){
		console.log("I can walk");
		return this;
	}
}
//第一种传方法作为参数
// let jack = new People({
// 	name : "Jack",
// 	play : () => { //箭头函数中的this会取到父级的非箭头函数作用域中的this
// 		console.log("I can play");
// 		return this;
// 	}
// });
let jack = new People({
	name : "Jack",
	play(){ //箭头函数中的this会取到父级的非箭头函数作用域中的this
		console.log("I can play");
		return this;
	}
});
jack.walk().play().drink();

//字符串新方法
//模板字符串
let person1 = "Tom",
	person2 = "Jerry";
console.log(`${person1} and ${person2}`);

let arrPerson = ["Tom","Jerry","Jack","Mick","Merry"];
console.log(`${arrPerson.join(" and ")} arr play happily`);

let arrFamily = [
	{
		father : "Tom",
		pet : ["cat","dog"]
	},
	{
		father : "Jerry",
		pet : ["snake","bird"]
	},
	{
		father : "Jack",
		mother : "Merry",
		pet : ["pig","duck","chick"],
		brother :["make","Jan","Keke"]
	}
];
console.log(arrFamily[2].brother);
// console.log(`${arrFamily.map(item => {
// 	return `${item.father} and his pets ${item.pet.join(" and ")}`
// }).join(" and ")} are play happily`);

console.log(`${arrFamily.map(item => `${item.father} and his pets ${item.pet.join(" and ")}`
).join(" and ")} are play happily`);
console.log(`${arrFamily.map(item => {
	return `${item.father} and his pets ${item.pet.join(" and ")}${item.mother ? `and his wife ${item.mother}` : ""}${item.brother ? ` and his brothers ${item.brother.join(" and ")}` : ""}`
}).join(" and ")} are play happily `);

//字符串新方法
//startsWith判断字符串是否以某字符串片段开始
console.log(person1.startsWith("T"),person1.startsWith("Wt"));
//endsWith判断字符串是否以某字符串片段结束
console.log(person1.endsWith("om"),person1.endsWith("Wto"));
//includes判断字符串中是否包含某字符串片段
console.log(person2.includes("r"),person2.includes("ery"));
//repeat 重复字符串
console.log(person1.repeat(4));

//Promise对象
//resolve,reject会由promise对象自动传入，数据类型是方法
//当需求任务处理成功时，需手动调用resolve,resolve方法传入的参数被then方法接受的参数得到
//当需求任务处理失败时，需手动调用reject,reject方法传入的参数被catch方法接受的参数得到
new  Promise((resolve,reject)=>{
	setTimeout(()=>{//定时器异步处理
		if(Math.random()>.5){
			resolve(666);
		}else{
			reject(233);
		}
		
	},1000);
}).then(number=>{
	console.log(number);
	//如果想要链式调用Promise对象实例的then方法，需要在前一个then方法中返回一个Promise对象实例
	return new Promise((resolve,reject)=>{
		setTimeout(()=>{//定时器异步处理
			if(Math.random()>.5){
				resolve(666);
			}else{
				reject(233);
			}
			
		},1000);
	});
}).then(number=>{
	console.log(number);
}).catch(number=>{
	console.log(number);
});

//fetch获取数据
//使用get请求获取数据
//如果想要json格式化，则调用响应对象的实例的json方法，如果想要返回字符串，用text
//由于被json方法和text方法处理的返回值为Promise对象实例
//所以需要通过下一次then获取到处理的结果
fetch("http://www.ikindness.cn/api/test/get").then(res => res.json()).then(str => console.log(str));

fetch("http://www.ikindness.cn/api/test/post",{
	method : "post",
	headers : {
		"Content-Type" : "application/x-www-form-urlencoded"
	},
	body : "a=1&b=2"
}).then(res => res.json()).then(str => console.log(str));