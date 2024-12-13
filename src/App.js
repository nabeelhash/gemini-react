import logo from './logo.svg';
import './App.css';
import Sidebar from './components/Sidebar';
import Main from './components/Main';
import { ContextProvider } from './context/Context';

function App() {


  return (
    <ContextProvider>
      <div className="h-[100vh] w-full flex bg-gray-100">
        <Sidebar />
        <Main />
      </div>
    </ContextProvider>
  );
}

export default App;