

## Run

- npx webpack

## Dependencies

### Awesome typescript loader

React 와 TS 를 연결해주는 Dependency : `awesome-typescript-loader`, `ts-loader` 이 강의에서는 `awesome-typescript-loader` 를 사용함. 

### React hot loader



index.js
```
import { hot } from 'react-hot-loader/root/';
const Hot = hot(App);
ReactDOM.render(<Hot />, ...);
```