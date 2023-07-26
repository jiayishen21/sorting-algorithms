import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Home } from './components/Home'
import { BubbleSort } from './components/BubbleSort';
import { SelectionSort } from './components/SelectionSort';
import { InsertionSort } from './components/InsertionSort';
import { Nav } from './components/Nav';

function App() {
  return (
    <>
      <Router>
        <Nav />
        <Routes>
          <Route path='/bubble-sort' element={<BubbleSort />} />
          <Route path='/selection-sort' element={<SelectionSort />} />
          <Route path='/insertion-sort' element={<InsertionSort />} />
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
