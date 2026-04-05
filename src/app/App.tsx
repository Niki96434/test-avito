import ItemViewPage from "../pages/ItemViewPage";
import ListViewPage from "../pages/ListViewPage";
import { Link, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <>
      <div>
        <Link to='/'></Link>
        <Link to='items'></Link>

      </div>

      <Routes>
        <Route path='/' element={<ListViewPage />} />
        <Route path='/items' element={<ListViewPage />} />
        <Route path='/items/:id' element={<ItemViewPage />} />
      </Routes>

    </>
  )
}

export default App
