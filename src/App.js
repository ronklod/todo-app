import "antd/dist/antd.css";
import TodoHeader from "./features/header/todoHeader";
import TodoBoard from "./features/Board/todoBoard";

function App() {
  return (
      <div className="App">
          <TodoHeader/>
          <TodoBoard />
      </div>
  );
}

export default App;
