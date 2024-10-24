// npm i -g typescript
// установка typescript глобально

//tsc - компилятор, который позволяет компилировать код из TS в JS

// для начала в проекте нужен файл ts.config
// его можно установить через команду tsc --init

                                                    //ОСНОВНЫЕ ТИПЫ
// ИСПОЛЬЗОВАНИЕ ТИПОВ

let a: number = 1;
let a: number = '1'; // так будет ошибка

let aa: number = 2;

let b: string = '1';
let b: string = 1; // так будет ошибка

let c: boolean = true;
let c: boolean = 1; // так будет ошибка

let res: number = a + aa;
// let res: number = a + b; - так будет ошибка, так как ответ должен быть числом, а пермеенная b не число



// ТИПЫ В ФУНКЦИЯХ
// обычная функция
function getFullName(firstname: string, surname: string): string {
    return `${firstname} ${surname}`
};

getFullName('Emil', 'Bukharov');
getFullName(1, true); // так будет ошибка

// стрелочная функция
let getFullNameArrow = (firstname: string, surname: string): string => {
    return `${firstname} ${surname}`
};



// ТИПЫ В ОБЪЕКТАХ
function getFullNameUser(userObj: {firstname: string, surname: string}): string {
    return `${userObj.firstname} ${userObj.surname}`
};

const user = {
    firstname: 'Emil',
    surname: 'Bukharov',
    age: 28,
    city: 'Kazan'
};

getFullNameUser(user);


// УПРАЖНЕНИЕ
// Используя прикрепленный к уроку JSON (пример данных из бэкэнда), описать соответствующий объектный тип в TypeScript.

let info: {
    officeId: number,
    isOpened: boolean,
    contacts: {
        phone: string,
        email: string,
        address: {
            city: string
        }
    }
} = {
    "officeId": 45,
    "isOpened": false,
    "contacts": {
        "phone": "+79100000000",
        "email": "my@email.ru",
        "address": {
            "city": "Москва"
        }
    }
}



// МАССИВЫ
const skills: string[] = ['Dev', 'DevOps', 'Testing'];


// TUPLES - массив ограниченной длины, где каждый элемент типизирован
// если хотим, чтобы в массиве были: первый элем. number, второй элем. string
// если что то еще добавим или поменяем порядок - то будет ошибка
const skill: [number, string] = [1, 'Dev'];

// если есть несколько подряд однотипных элементов
const arr: [number, string, ...boolean[]] = [1, 'Dev', true, false, true]



// READONLY - св-ва только для чтения(нельзя модифицировать массив)
const arrReadonly: readonly [number, string] = [1, 'a'];

const arrReadonlyArray: ReadonlyArray<number> = [1, 2, 3, 4, 5];



// ENUMS - тип данных в TypeScript, отсутствующий в JavaScript, предназначенный для управления набором констант.
enum StatusCode {
    SUCCESS,
    IN_PROCESS,
    FAILED
}

// св-ва enum имеют значения, например в примере выше:
// SUCCESS = 0, IN_PROCESS = 1, FAILED = 2 (это по дефолту)
// Но их можно поменять

// enum StatusCode {
//     SUCCESS = 1,
//     IN_PROCESS = 5,
//     FAILED = 10
// }

// Или на строки

// enum StatusCode {
//     SUCCESS = 'success',
//     IN_PROCESS = 'inprocess',
//     FAILED = 'failed'
// }

const response = {
    message: 'Платеж успешен',
    statusCode: StatusCode.SUCCESS
}

if(response.statusCode === StatusCode.SUCCESS) {

}


// Мы работаем над фронтенд приложением и имеем функцию, которая получает список часто задаваемых вопросов о продукте. 
// Наша задача - переписать эту функцию с JavaScript (JS) на TypeScript (TS), обеспечив при этом корректную типизацию.

enum Status {
    PUBLISHED = 'published',
    DRAFT = 'draft',
    DELETED = 'deleted'
}

let request: {
    topicId: number,
    status: string
}

let response: {
        question: string,
        answer: string,
        tags: [
            string,
            string
        ],
        likes: number,
        status?: Status
}

async function getFaqs(req: {topicId: number, status: string}): Promise< {
    question: string,
    answer: string,
    tags: string[],
    likes: number,
    status?: Status
}[]> {
    const res = await fetch('/faqs', {
        method: 'POST',
        body: JSON.stringify(req)
    });
    const data = await res.json();
    return data;
}



                                                        // ПРОДВИНУТЫЕ ТИПЫ

// UNION TYPES
// в TypeScript позволяют переменной хранить значения различных типов. Записывается через вертикальную черту, например, string | number
function logIn(id: string | number | boolean) {
    console.log(id)
}

logIn(1);
logIn('1');
logIn(true);

// но если мы попробуем применить метод приведения строку к нижнему регистру, то у нас ничего тне получится,
// потому что id является или string или number или boolean
// Чтобы решить эту проблему используем Сужение типов (Type Narrowing) позволяет работать с каждым из возможных типов отдельно, 
// используя проверки вроде typeof для определения конкретного типа в runtime.

function logInNarrow(id: string | number | boolean) {
    if (typeof id === 'string') {
        console.log(id); // тип string
    } else if (typeof id === 'number') {
        console.log(id); // тип number
    } else {
        console.log(id); // тип boolean
    }
}

// с массивами
function logError(err: string | string[]) {
    if (Array.isArray(err)) {
        console.log(err); // тип string[]
    } else {
        console.log(err); // тип string
    }
}

// с объектами
function logObject(obj: {a: number} | {b: number}) {
    if ('a' in obj) {
        console.log(obj.a);
    } else {
        console.log(obj.b);
    }
}

function logMultipleIds(a: string | number, b: string | boolean) {
    if (a === b) {
        console.log(a); // тип string
        console.log(b); // тип string
    } else {
        console.log(a); // тип string | number
        console.log(b); // тип string | boolean
    }
}



// LITERAL TYPES

function fetchWithAuth(url: string, method: 'post' | 'get') {

}

// если объявить тип через const - то тип этой const будет значение этой const
const aaa = 'aaa' // тип aaa
const bbb = 1 // тип 1


// TYPE ALIASES
type httpMethod = 'post' | 'get';

function fetchWithAuthType(url: string, method: httpMethod) {

}


type User = {
    name: string,
    age: number,
    skills: string[]
}

type Role = {
    name: string
    id: number
}

type UserWithRole = User & Role

// одноименные ключи схлопываются в один
let userA: UserWithRole = {
    name: 'Anton',
    age: 50,
    skills: ['1', '2'],
    id: 3
}

// если нужно оставить 
type NewUserWithRole = {
    user: User,
    role: Role
}

// Означает, что у этого объекта может быть неограниченное колличество свойств ключам ключом которых является число и значением User
interface UserDic {
    [index: number]: UserInter
}



// INTERFACE
// тоже самое что и type, но с небольшими отличиями
interface UserInter {
    name: string,
    age: number,
    skills: string[]
}

interface RoleInter {
    name: string
    id: number
}

interface UserWithRoleInter extends UserInter, RoleInter {

}

let userB: UserWithRoleInter = {
    name: 'Anton',
    age: 50,
    skills: ['1', '2'],
    id: 3
}

// Означает, что у этого объекта может быть неограниченное колличество свойств ключам ключом которых является число и значением User
interface UserDicInter {
    [index: number]: UserInter
}

// {
//     1: user,
//     2: user2,
//     3: user3
// }



// ОТЛИЧИЯ INTERFACE ОТ TYPE
// 1. interface можно модифицировать(с type так нельзя)
interface UserMod  {
    name: string
}

interface UserMod  {
    age: number
}

// 2. Создание union типов(в interface так не получится)
type ID = string | number;
// interface IDI = {
//    id: string | number
// }



// Создать интерфейс для запроса перевода средств (IPaymentsRequest) и ответа API
interface IPayment {
    sum: number,
    from: number,
    to: number
}

enum StatusResponse {
    SUCCESS = 'success',
    FAILED = 'failed'
}

interface IDataFailed {
    errorMessage: "Недостаточно средств",
    errorCode: 4
}

interface IDataSuccess extends IPayment{
    databaseId: number
}

interface IResponseSuccess {
    status: StatusResponse.SUCCESS,
    data: IDataSuccess
}

interface IResponseFailed {
    status: StatusResponse.FAILED
    data: IDataFailed
}

const paymentRequest: IPayment = {
    "sum": 10000,
    "from": 2,
    "to": 4
}

const ResponseSuccess: IResponseSuccess = {
    "status": StatusResponse.SUCCESS,
    "data": {
        "databaseId": 567,
        "sum": 10000,
        "from": 2,
        "to": 4
    }
}

const ResponseFailed: IResponseFailed = {
    "status": StatusResponse.FAILED,
    "data": {
        "errorMessage": "Недостаточно средств",
        "errorCode": 4
    }
}



// TYPE GUARD
function logId(id: string | number) {
    if (typeof id === 'string') { 
        console.log(id);
    } else if (typeof id === 'number') { 
        console.log(id)
    }
}

// Type Guard для функции выше
function isString(x: string | number): x is string {
    return typeof x === 'string'
} 

function isNumber(x: string | number): x is number {
    return typeof x === 'number'
} 

// заменяем условия на тайпгарды для функции выше
function logIdTypeGuard(id: string | number) {
    if (isString(id)) { 
        console.log(id);
    } else if (isNumber(id)) { 
        console.log(id)
    }
}

// другой пример
interface Admin {
    role: 1
}

function isAdmin(user: User | Admin): user is Admin {
    return 'role' in user
}

function setRoleZero(user: User | Admin) {
    if (isAdmin(user)) {
        return user.role = 1
    } else {
        throw new Error('Пользователь не админ')
    }
}



// CLASS (construcnot)
// если хотим создать класс с name или без него
class UserClass {
    name: string;

    constructor(name?: string) {
        if (typeof name === 'string') this.name = name;
    }
}

const userClass = new UserClass('Egor');
const userClass2 = new UserClass();


// если хотим создать класс с name и age или по отдельности с name или c age или вообще без ничего
class UserClassOr {
    name: string;
    age: number

    constructor(ageOrName?: string | number, age?: number) {
        if (typeof ageOrName === 'string') this.name = ageOrName;
        if (typeof ageOrName === 'number') this.age = ageOrName;
        if (typeof age === 'number') this.age = age;
    }
}

const userClassOr = new UserClassOr('Egor');
const userClassOr2 = new UserClassOr(33);
const userClassOr3 = new UserClassOr('Egor', 23);
const userClassOr4 = new UserClassOr();


// CLASS (method)

enum PaymentStatus {
    Holded = 'holded',
    Processed = 'processed',
    Reversed = 'reversed'
}

class Payment {
    id: number;
    status: PaymentStatus;
    createdAt: Date;
    updatedAt: Date;

    constructor(id: number) {
        this.id = id;
        this.createdAt = new Date;
        this.status = PaymentStatus.Holded
    }

    getPaymentLifeTime(): number {
        return new Date().getTime() - this.createdAt.getTime()
    }

    unholdPayment(): void {
        if (this.status === PaymentStatus.Processed) {
            throw new Error('Платеж не может быть возвращен!')
        }
        this.status = PaymentStatus.Reversed;
        this.updatedAt = new Date();
    }
}

const payment = new Payment(1);
payment.unholdPayment();
const time = payment.getPaymentLifeTime();
console.log(payment);


// Перезагрузка в Class
class UserOverload {
    skills: string[] = [];

    addSkills(skill: string): void;
    addSkills(skills: string[]): void;
    addSkills(skillOrSkills: string | string[]): void {
        if(typeof skillOrSkills === 'string') this.skills.push(skillOrSkills);
        this.skills.push(...skillOrSkills);
    }
}


// IMPLEMENTS
// означает что class должен содержать св-ва и методы interface

interface IPayable {
    pay(paymentId: number): void;
    price?: number;
}

interface IDeletable {
    delete():void;
}

class UserImplements implements IPayable, IDeletable {
    delete(): void {
        ///
    }
    pay(paymentId: number): void {
        ///
    }

}



                                                        // GENERICS

// Встроенные Generics
const arrNum: Array<number> = [1,2,3];
const arrStr: Array<string> = ['1','2','3'];
const arrBoolean: Array<boolean> = [true, false];
const arrNumStr: Array<number | string> = [1,'2',3];


async function test() {
    const a = await new Promise<number>((resolve, reject) => {
        resolve(1);
    })
}

// типизация key(string): value(boolean)
const check: Record<string, boolean> = {
    drive: true,
    kpp: false
}



// ФУНКЦИЯ С GENERIC
// допустим приходит data, которая может быть и числом и строкой и объектом,
// это не удобно и легче написать просто any, но так делать не хорошо, на этот случай и нужны generics
function logMiddleware(data: number | string): number | string {
    console.log(data);
    return data
}

const ress1 = logMiddleware(10);

// переделаю под generics
// расшифровка: generic <T>(вместо Т можно написать все что угодно, но лучше Т),
// может иметь любой тип, который мы передадим
function logMiddlewareGen<T>(data: T): T {
    console.log(data);
    return data
}
// вот как  раз здесь мы его и передаем
const ress2 = logMiddlewareGen<number>(10);
const ress3 = logMiddlewareGen<string>('10');

// еще один пример для массивов
function testGen<T>(data: Array<T>): Array<T> {
    const l = data.length / 2
    return data.splice(0, l)
}

testGen<number>([1,2,3,4,5]);
testGen<string>(['daf', 'sdf', 'sdfs', 'sdfr']);
testGen<number | string>([1,'2',3,'4',5]);

// Написать универсальную обобщенную функцию toString, которая будет принимать разные типы данных и переводить их в строковое представление.
function toString<T>(data: T): string | undefined {
    if(Array.isArray(data)) {
        return data.toString()
    }

    switch(typeof data) {
        case 'string':
            return data;
        case 'number':
        case 'boolean':
        case 'bigint':
        case 'function':
        case 'symbol':
            return data.toString();
        case 'object':
            return JSON.stringify(data);
        default:
            return undefined
    }
}

console.log(toString(1));
console.log(toString('abc'));
console.log(toString([1, true, 'string']));
console.log(toString(true));
console.log(toString(Symbol(5)));
console.log(toString({a: 1}));



// ИСПОЛЬЗОВАНИЕ GENERICS В ТИПАХ

function testGenType<T>(data: Array<T>): Array<T> {
    const l = data.length / 2
    return data.splice(0, l)
}

// Типизация функции выше
const split: <T>(data: Array<T>) => Array<T> = testGenType;

// Альтернативная запись с помощью стрелочной функции
// type Split = <T>(data: Array<T>) => Array<T>;

// const testGenTypeArrow: Split = (data) => {
//     const l = data.length / 2
//     return data.splice(0, l)
// }

// типизация объекта с помощью generic
interface ILogLine<T> {
    date: Date
    data: T
}

type LogLineType<T> = {
    date: Date
    data: T
}

const LogLine: ILogLine<{a: number, b: string}> = {
    date: new Date(),
    data: {
        a: 1,
        b: 'bbb'
        // может прийти все что угодно
    }
}


// Ограничение generics
// допустим есть класс со св-вом run(проьег), и создаем функцию, которая будет переводить км пробега в мили
// вот тут то и будет ошибка, мы не сможем обратиться к св-ву класса
class Vehicle {
    run: number;
}

interface Vehicle {
    run: number;
}

function kmToMiles<T>(vehicle: T): T {
    vehicle.run = vehicle.run / 0.63; // будет ошибка, потому что дженерик это все что угодно
    return vehicle
}

// правильный вариант(наследуемся от класса) вот теперь можно обращаться к св-вам класса
function kmToMilesExtends<T extends Vehicle>(vehicle: T): T {
    vehicle.run = vehicle.run / 0.63;
    return vehicle
}
kmToMilesExtends(new Vehicle());
// так же все работает и с INTEFACE
kmToMilesExtends({run: 2});

// так же и с union types
function logIdExtends<T extends number | string>(id: T): T {
    console.log(id);
    return id;
}



// Написать функцию сортировки для объектов с идентификаторами (ID).
// Контекст: У нас могут быть разные типы объектов, такие как пользователи и платежи, каждый из которых имеет свой уникальный ID. 
// Необходимо создать функцию, которая может сортировать эти объекты по ID в порядке возрастания или убывания.

interface HasId {
    id: number
}

const data = [
    { id: 2, name: 'Петя' },
    { id: 1, name: 'Вася' },
    { id: 3, name: 'Надя' },
];

function sortDataToId<T extends HasId>(data: T[], range: 1 | 2 = 1): T[] {
    return data.sort((a, b) => {
        switch (range){
            case 1:
                return a.id - b.id;
            case 2: 
                return b.id - a.id;
        }
    })
}

console.log(sortDataToId(data, 1));
console.log(sortDataToId(data, 2));
console.log(sortDataToId(data));


                                                        // МАНИПУЛЯЦИИ С ТИПАМИ

// KEYOF
interface IUser {
    name: string
    age: number
};

// берем ключи от интерфейса
type keyOfUser = keyof IUser;

// присваиваем к константе ключb интерфейса выше
const key1: keyOfUser = 'age';
const key2: keyOfUser = 'name';

const iuser: IUser = {
    name: 'Dion',
    age: 30
};

// есть функция, которая возвращает value по key объекта
// сделаю через дженерики, T относится к объекту, а К относится к ключу
// и вот К extendится от ключей obj<T>
function getValue<T, K extends keyof T>(obj: T, key: K) {
    return obj[key];
}

console.log(getValue(iuser, 'age')); // Dion
console.log(getValue(iuser, 'name')); // 30



// Необходимо написать функцию группировки, которая принимает массив объектов и его ключ, 
// производит группировку по указанному ключу и возращает сгруппированный объект.

// Пример:

// [
// { group: 1, name: 'a' },
// { group: 1, name: 'b' },
// { group: 2, name: 'c' },
// ];
// ```При группироке по 'group'

// ```ts
// {
// '1': [ { group: 1, name: 'a' }, { group: 1, name: 'b' } ],
// '2': [ { group: 2, name: 'c' } ]
// }

interface Data {
    group: number
    name: string
}

type key = string | number | symbol

interface IGroup<T> {
    [key: string]: T[]
}

const data1: Data[] = [
    { group: 1, name: 'a' },
    { group: 1, name: 'b' },
    { group: 2, name: 'c' },
];

function getGroup<T extends Record<key, any>, K extends keyof T>(arr: T[], key: K): IGroup<T> {
    return arr.reduce<IGroup<T>>((acc: IGroup<T>, cur) => {
        const itemKey = cur[key].toString();
        let curEl = acc[itemKey];
        if(Array.isArray(curEl)) {
            curEl.push(cur);
        } else {
            curEl = [cur]
        }
        acc[itemKey] = curEl
        return acc
    }, {})
}

console.log(getGroup(data1, 'group'))