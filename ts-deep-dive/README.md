# Questions

## [TypeScript's Type System](https://basarat.gitbook.io/typescript/type-system)

### 1. Ambient Declarations

ambient declaration은 다른 js 라이브러리도 손쉽게 ts 프로젝트에서 사용할 수 있도록 ts가 지원하는 거다

#### Declaration Files

- 브라우저나 Node.js 같은 런타임이나 js로 작성된 코드를 ts 프로젝트에 함께 사용하기 위해 `declare`를 해준다
- `.d.ts`로 따로 파일을 만들거나 `.ts`에 적을 수도 있지만 `.d.ts`를 권장
- `.d.ts`로 파일을 시작할 경우 파일의 시작은 `declare`로 되어야 함
- [ ] 이게 무슨 뜻이지?
  _This helps make it clear to the author that **there will be no code emitted by TypeScript**. The author needs to ensure that the declared item will exist at runtime._
- [ ] 어쨌든 third party 라이브러리를 사용하려고 하는데 type definition이 없으면 런타임에서 에러를 띄운다는 거지?
- [ ] 런타임에 declaration이 필요하다는 것과 ts에 의해 방출되는 코드가 없다는 게 뜻이 상충되는 것 아닌가

#### Variables

- [ ] declaration file이랑 `declare var`이 무슨 차이인지 모르겠음
- [ ] `declare`를 쓰는 거랑 `interface`를 쓰는 거랑 뭔 차이?
- [ ] `declare` 한 것들은 다 global하게 사용되나?
- [ ] 여기 나오는 예제는 무슨 뜻인지 이해 0도 안됌
  ```ts
  interface Process {
    exit(code?: number): void;
  }
  declare var process: Process;
  ```
  ```ts
  interface Process {
    exitWithLogging(code?: number): void;
  }
  process.exitWithLogging = function() {
    console.log("exiting");
    process.exit.apply(process, arguments);
    // 위에 선언한 Process 인터페이스가 알아서 자동으로 extend 된건가
  };
  ```

### 2. Interface

- 최고 장점은 타입을 `extend` 가능하다는 것
- `class`는 `interface`를 구현 가능.
- `class`를 만드는데 특정 `interface`에 선언된 타입 구조를 반드시 따라야할 때, `implements`를 사용해서 그 관계를 더 정확하게 표현 가능 (`class Sth implements SthInterface`)
- [ ] 아래 예제 이해 불가
  ```ts
  interface Crazy {
    new (): {
      hello: number
    };
  }
  // Crazy interface에는 { hello: number }를 리턴하는 new라는 함수가 있어야 한다
  ```
  ```ts
  class CrazyClass implements Crazy {
    constructor() {
      return { hello: 123 };
    }
  }
  // Because
  const crazy = new CrazyClass(); // crazy would be {hello:123}
  // 이 new가 위의 new랑 무슨 상관이지...
  ```

### 3. Enums

- 연관된 값들의 묶음을 표현할 때 사용
- 기본적으로 Number 베이스임 (0, 1, 2...)
- 그런데 숫자와 문자를 같이 사용 가능! (자동 생성되는 듯)
- 필요시 숫자를 따로 assign해줄 수 있음
- 당연히 문자로도 `enum` 만들 수 있음
- `enum`의 값을 변수로 사용하고 싶으면 `const enum` 이라고 해야 퍼포먼스에 좋음 (그냥 사용하면 런타임에 해당 enum 타입을 체크해야 함)
- [ ] 이게 무슨 말인지 모르겠음
  the compiler:
  1. Inlines any usages of the enum (0 instead of Tristate.False).
  2. Does not generate any JavaScript for the enum definition (there is no Tristate variable at runtime) as its usages are inlined.
- `enum` + `namespace`를 사용하면 `enum`에 메소드 함수도 넣을 수 있나 봄
- `enum`을 쪼개서 관리할 수도 있다 (=일종의 extend) 대신 enum value가 겹쳐서는 안 되겠지

### 4. lib.d.ts

- ts compilation context에서 자동으로 추가된다 (=tsconfig에서 noLib 가능)
- 일반 JavaScript 문법과 관련된 녀석들과 DOM에 있는 녀석들에 대한 타입을 제공
- 이해함..

### 5. Functions

- ts팀이 function에는 각별히 신경썼다고 함
- inline || interface 둘다 ok
- return 타입은 보통 infer 되서 안 표기해줘도 됌, 근데 정확한 에러 확인을 위해선 해주는 게 좋음
- return `undefined`는 `void` 쓰면 됌
- Function overload는 런타임 오버헤드 없음: 그냥 문서용으로 굳
- [ ] `number`를 넣으면 `number`가 나오고 `string`을 넣으면 `string`이 나온다는 건가
  ```ts
  type LongHandAllowsOverloadDeclarations = {
      (a: number): number;
      (a: string): string;
  };
  ```

### 6. Callables

- type, interface로 callable한 것도 정의 가능 (=interface의 인스턴스 = function)
- arrow function은 overload 불가. 사용하려면 full syntax 사용
  ```ts
  // full syntax (interface)
  interface Overloaded {
    (foo: string): string
    (foo: number): number
  }
  // full syntax (type)
  type Overloaded = {
    (foo: string): string
    (foo: number): number
  }
  function stringOrNumber (foo: string): string
  function stringOrNumber (foo: number): number
  function stringOrNumber (foo: any): any {
    if (typeof foo === 'string') {
      return `hello ${foo}`
    }
    if (typeof foo === 'number') {
      return foo * 2
    }
  }
  const overloaded: Overloaded = stringOrNumber

  // type annotation
  const overloaded: {
    (foo: string): string
    (foo: number): number
  } = stringOrNumber

  // arrow function
  const cantOverload: (foo: string) => string = (foo) => foo.toString()
  ```

### 7. Type Assertion

- ts가 추론한 타입을 원하면 바꿀 수 있음: 컴파일러한테 내가 이 타입에 대해서는 너보다 잘 아니까 난리치지 말라고 하는 거
- `as Sth` 하는게 type assertion
- 캐스팅은 런타임에 영향을 끼치고, type assertion은 컴파일에만 적용 (only for compilers)
- assertion은 좀 위험하다. 레거시 코드를 쉽게 ts로 옮길 수 있겐 해주지만, 완전히 type safe는 보장 못함
- [ ] 둘 차이가 뭐지?
  ```ts
  interface Foo {
      bar: number;
      bas: string;
  }

  let foo: Foo = {
      // the compiler will provide autocomplete for properties of Foo
  };

  let bar = {} as Foo
  ```
- [ ] Double assertion: 둘의 차이는 MouseEvent는 Event를 더 구체적으로 명시하니까 괜찮고 HTMLElement는 Event와 아무런 상관이 없어서 안 되는거겠지?
  ```ts
  function handler (event: Event) {
      let mouseEvent = event as MouseEvent; // ok
  }
  function handler(event: Event) {
      let element = event as HTMLElement; // not ok
  }
  function handler(event: Event) {
    let element = event as unknown as HTMLELement; // well... ok fine (unknown 대신 any로 대체 가능)
  }
  ```
- `unknown`, `any`는 모든 타입에 호환가능
- [ ] 이것 좀 헷갈림: S가 T의 subType이거나 T가 S의 subType이면 type assertion은 문제 없다는 것이겠지? 근데 어쨌든 이것도 그다지 권장 안 하는 건가.
  > Basically, the assertion from type `S` to `T` succeeds if either `S` is a subtype of `T` or `T` is a subtype of `S`. This is to provide extra safety when doing type assertions


### 8. Freshness (=strict object literal checking)

- 구조적으로는 타입 compatible하더라도 실제 object literal로 봤을 땐 compatible하지 않는 경우를 잡아낼 수 있음 = freshness
  ```ts
  function logName (sth: { name: string }) {
    console.log(sth.name)
  }

  // structural typing
  const wh = { name: 'wh', dateOfBirth: 930526 }
  const js = { name: 'js' }
  const falsy = { age: 100 }

  logName(wh) // ok (has excessive property, dateOfBirth, but fine)
  logName(js) // ok
  logName(falsy) // not ok (no name)

  // freshness(strict literal checking)
  logName({ name: 'wh' }) // ok
  logName({ name: 'js', age: 20 }) // Error: excessive property of "age"
  ```

### 9. Type Guard

- 조건문에서 obj의 타입 유형을 좁힐 수 있게 도와줌
- 타입으로 조건을 걸러냈을 때 (`typeof`, `instanceof`) 해당 블록에 사용되는 변수의 타입을 ts는 알고 있음
  ```ts
  let foo = 'hello'
  if (typeof foo === 'string') {
    foo = 123 // Error: foo는 string이다
  }
  ```
- `in`으로도 타입 체크 가능
- union 타입도 걸러냄
- object의 경우 `instanceof`나 `typeof` 같은 걸로 체크 못하는데 ts에서는 User Defined Type Guard functions로 가능
- [ ] User Defined Type Guard functions은 `someArgumentName is SomeType`를 리턴하는 함수라고?
- [ ] 이해 안됌
  ```ts
  interface Foo {
      foo: number;
      common: string;
  }
  interface Bar {
      bar: number;
      common: string;
  }

  // User Defined Type Guard!
  function isFoo(arg: any): arg is Foo {
      return arg.foo !== undefined;
      // arg.foo가 string이면? arg.common이 없으면? 그러면 Foo 아니잖아
  }

  // Sample usage
  function doStuff(arg: Foo | Bar) {
      if (isFoo(arg)) {
          console.log(arg.foo); // OK
          console.log(arg.bar); // Error!
      }
      else {
          console.log(arg.foo); // Error!
          console.log(arg.bar); // OK
      }
  }

  doStuff({ foo: 123, common: '123' });
  doStuff({ bar: 123, common: '123' });
  ```
- [ ] 이건 정말 이해가 안 됌.
  ```ts
  // Example Setup
  declare var foo:{bar?: {baz: string}};
  function immediate(callback: ()=>void) {
    callback(); /** immediate 함수는 대체 왜 선언한거지.. */
  }
  // Type Guard
  if (foo.bar) {
    console.log(foo.bar.baz); // Okay 이건 ㅇㅋ
    functionDoingSomeStuff(() => {
      console.log(foo.bar.baz); // TS error: Object is possibly 'undefined'" 왜 여기서는 안되는거지? foo.bar 통과햇잖아?
    });
  }
  ```

### 10. Literal Types

- primitive의 값 자체를 타입으로 사용할 수 있음
- 하나로 사용될 때는 무의미하지만 union type으로 사용하면 막강해짐
  ```ts
  type Direction =
    | 'North'
    | 'East'
    | 'South'
    | 'West

  function move(distance: number, direction: Direction) {
    // do sth
  }

  move(1, 'North') // ok
  move(1, 'Go home') // nah
  ```
- literal type을 type으로 사용하면 좀 strict하게 된다. 이럴 때는 type assertion을 사용하거나, 타입 annotation을 따로 달거나 해서 ts 에러를 해결한다
- enum은 숫자 기반이다. 문자 리터럴과 `union` 타입을 이용하면 string 기반 enum 같은 걸 만들 수 있다 (K:V)
  ```ts
  function strEnum<T extends string>(o: Array<T>): { [K in T]: T} {
    return o.reduce((acc, key) => {
      acc[key] = key
      return acc
    }, Object.create(null))
  }

  const Direction = strEnum([
    'North',
    'East',
    'South',
    'West'
  ])

  type Direction = keyof typeof Direction

  let sample: Direction

  sample = Direction.North // ok
  sample = 'North' // ok
  sample = 'Blah Blah' // nah
  ```

### 11. Readonly

- 인터페이스/타입 정의에 원하면 특정 속성을 `readonly`로 변경 불가능하게 바꿀 수 있다
- class 내 속성도 readonly 할 수 있다. constructor 함수가 실행될 때 (인스턴스가 생성될 때) 값을 주면 됌
- `Readonly` 타입으로 모든 속성을 `readonly` 처리할 수도 있다
  ```ts
  type Foo = {
    bar: number
    baz: number
  }
  type FooReadonly = Readonly<Foo> // bar, baz는 readonly다
  const foo: Foo = { bar: 123, baz: 456 }
  const fooReadonly: FooReadonly = { bar: 123, bax: 456 }

  foo.bar = 456 // ok
  fooReadonly.bar = 456 // nah
  ```
- 참고로 immutability를 겁나 좋아하는 리액트에서는 이미 Prop과 State를 `Readonly`로 감싸는 내부 로직이 있음. 그래서 못 바꾸는 거임
- index signature에도 readonly 적용 가능 -> key에 따른 value 못바꿈 (?)
- `ReadonlyArray<T>`도 있음 -> 한번 선언 하면 영원히 끝임
- [ ] `readonly`는 property를 위해서라는 건 알겠는데, aliasing으로 수정될 수 있다는 게 무슨 말이지?
  `readonly` is 1) for a property, 2) the property can be modified because of aliasing
  ```ts
  let foo: {
    readonly bar: number;
  } = {
          bar: 123
      };

  function iMutateFoo(foo: { bar: number }) {
      foo.bar = 456;
  }

  iMutateFoo(foo); // The foo argument is aliased by the foo parameter
  console.log(foo.bar); // 456!
  ```

### 12. Generics

- 더 의미있는 타입 디펜던시 의미를 부여하기 위해 사용: class instance members, class methods, function args, function return
  ```ts
  class Queue {
    private data = []
    push(item) { this.data.push(item) }
    pop() { return this.data.shift() }
  }

  // Dirty Queue<number> -> string, boolean 뭐 추가 될 때마다 하나씩 만들어줘야함
  class NumberQueue extends Queue {
    private data = []
    push(item: number) { this.super.push(item) }
  }

  // Generic
  class Queue<T> {
    private data = []
    push(item: T) { this.data.push(item) }
    pop() { return this.data.shift()}
  }

  // Usage:
  const numberQueue = new Queue<number>()
  numberQueue.push(1) // ok
  numberQueue.push('yo') // nah
  ```
- [ ] 아래의 경우에는 제네릭 명시 없이 그냥 사용하면 되나?
  ```ts
  class Utility {
    reverse<T>(arr: T[]) {
      let arrToReturn = []
      for (let i = arr.length - 1; i >= 0; i--) {
        arrToReturn.push(arr[i])
      }
      return arrToReturn
    }
  }

  const utility = new Utility()
  utility.reverse([1, 2, 3]) // utility.reverse<number>([1, 2, 3]) 이런거 안 해줘도 되겠지?

### 13. Type Inference

- 타입을 명시적으로 주석을 달거나, 실제로 값이 assign되면 type infer가 대체로 되는 듯
  ```ts
  type Adder = (a: number, b: number) => number;
  let WeirdAdder: Adder = (a, b) => { /* Do something */ } // Error
  ```
- 헐.. 이런 경우 foo의 리턴 값은 `any`가 됌... 왜냐하면 c가 뭔지 모르니까
  ```ts
  function foo(a: number, b: number) {
      return a + addOne(b);
  }
  // Some external function in a library someone wrote in JavaScript
  function addOne(c) {
      return c + 1;
  }
  ```
- 멋있는 말이군
  > I find it simplest to always be explicit about function returns. After all, these annotations are a theorem and the function body is the proof.
- 그래서 `noImplicitAny` 플래그를 사용해야함 ㅋㅋ

### 14. Type Compatible

- 호환가능하다: 대신 타입으로 지정가능하다 (e.g. `number` !== `string`)
- ts는 일단 편하게 쓰이기 위해 안 견실함 - unsound한 행동이 많아서 조심해야함
- Structural: 구조적으로 일치한다면 이름 따위는 상관 없다
  ```ts
  interface Point {
    x: number
    y: number
  }
  class Point2D {
    constructor(public x: number, public y: number) { }
  }
  const p: Point = new Point2D(1, 2) // ㅇㅋ
  ```
- 객체를 인자로 던져줄 땐 불필요한 prop이 더 있어도 어케이
  ```ts
  interface Point2D {
    x: number
    y: number
  }
  interface Point3D {
    x: number
    y: number
    z: number
  }
  function iTakePoint2D(point: Point2D) { console.log(point) }

  const point2d: Point2D = { x: 1, y: 2 }
  const point3d: Point3D = { x: 1, y: 2, z: 3 }

  iTakePoint2D(point2d) // ㅇㅋ
  iTakePoint2D(point3d) // ㅇㅋ (z는 안 쓰면 그만)
  iTakePoint2D({ x: 1 }) // ㄴㄴ y 어딨음
  ```
- Variance: 가변성...

### 15. Never

- [ ] bottom type이 뭐지
- 영원히 리턴을 안하는 경우 `never` 사용 (error / while문)
- [ ] Exhaustive Checks에 사용된다는 게 무슨 말이지
  ```ts
  // 코드 자체는 이해가 되지만 그래서 이걸 왜 사용해라는 건진 모르겠음
  function foo(x: string | number): boolean {
    if (typeof x === "string") {
      return true;
    } else if (typeof x === "number") {
      return false;
    }

    // Without a never type we would error :
    // - Not all code paths return a value (strict null checks)
    // - Or Unreachable code detected
    // But because TypeScript understands that `fail` function returns `never`
    // It can allow you to call it as you might be using it for runtime safety / exhaustive checks.
    return fail("Unexhaustive!");
  }

  function fail(message: string): never { throw new Error(message); }
  ```
- 아무것도 리턴 안 하는 것은 `void`, 절대 리턴을 안 하는 것은 `never`
- [ ] javascript는 아무 값도 리턴하지 않으면 `undefined` 리턴하는 거 아니었나
- [ ] 이 두 코드의 차이를 모르겠음
  ```ts
  // Inferred return type: void
  function failDeclaration(message: string) {
    throw new Error(message);
  }
  // Inferred return type: never
  const failExpression = function(message: string) {
    throw new Error(message);
  };
  ```
- [ ] 이 예제가 뭘 말하려고 하는지 모르겠음
  ```ts
  class Base {
      overrideMe() {
          throw new Error("You forgot to override me!");
      }
  }
  class Derived extends Base {
      overrideMe() {
          // Code that actually returns here
      }
  }
  ```
