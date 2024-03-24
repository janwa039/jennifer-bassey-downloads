import Table from './components/Table';
import { tableData } from "./data"

function App() {
  return (
    <div className="App">
      <Table data={tableData} />
    </div>
  );
}

export default App;

