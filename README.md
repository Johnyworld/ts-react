
## Dependencies

### Awesome typescript loader

React 와 TS 를 연결해주는 Dependency : `awesome-typescript-loader`, `ts-loader` 이 강의에서는 `awesome-typescript-loader` 를 사용함. 

### React hot loader

index.js
``` jsx
import { hot } from 'react-hot-loader/root/';
const Hot = hot(App);
ReactDOM.render(<Hot />, ...);
```

## Memo

### Set timeout

setTimeout 을 사용할 때, typescript 가 setTimeout 이 nodejs 에서 실행될지, browser에서 실행될지 알 수 없기 때문에, `type timeout is not assignable to 'number'` 라는 오류 메시지가 발생한다. 이 경우 앞에 window 를 붙여주면 에러가 발생하지 않는다. 아래 코드를 보자. 

```jsx
window.setTimeout(()=>{ ... }, 1000) 
```

### Object.keys

Object.keys 로 만들어진 배열은 무조건 string[] 타입으로 추론 된다. 타입 범위를 좁혀주기 위해서는 반드시 강제 형변환을 해주어야 한다. 아래 코드를 보자.

```jsx
const keys = (Object.keys(object) as [ 'id', 'name', 'age' ]);
```

### 고차함수

고차함수는 이벤트에서 익명함수로 다른 함수를 호출하는 방법을 대체할 수 있다.

```jsx
const handleClick = (name) => { ... }
return <button onClick={()=>{ handleClick(name) }}>Button</button>
```

위 코드를 아래와 같이 바꿀 수 있다. JSX 의 코드가 좀 더 간결해 진다.

```jsx
const handleClick = (name) => () => { ... }
return <button onClick={handleClick(name)}>
```

### Function Component Type

```jsx
interface Props {
    name: string;
    phone: string;
    age: number;
    children: string;
}

const Comp: React.FC<Props> = ({ name, phone, age }) => {
    ...
}
```

여기서, `interface Props` 에 선언 된 `children`은 `props`에 존재하지 않는다. `children`은 해당 컴포넌트가 호출될 때, 여는태그와 닫는태그 사이에 존재하는 내용이다.

```jsx
<Comp name={'Henry Lee'} phone={'+8210-000-0000'} age={25} >'This is children'</>
```

### Etc.

배열 타입 설정

```jsx
// string 의 배열
type arr = string[];
type arr = Array<string>;

// object 의 배열
interface obj { name: string | number };
type arr = Array<obj>;

// 복합적인 배열
type arr = (string | number | boolean)[];
```