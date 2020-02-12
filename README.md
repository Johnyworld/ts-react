
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

