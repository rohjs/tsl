# Questions

## [TypeScript's Type System](https://basarat.gitbook.io/typescript/type-system)

### Ambient Declarations

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

### Interface

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

### Enums

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

