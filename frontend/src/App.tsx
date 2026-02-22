import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Categories from './pages/Categories';
import Recent from './pages/Recent';
import Favorites from './pages/Favorites';
import Collection from './pages/Collection';
import CategoryPage from './pages/CategoryPage';
import AnimeDetailPage from './pages/AnimeDetailPage';


const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth' // плавная прокрутка
    });
  }, [pathname]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="categories" element={<Categories />} />
          <Route path="recent" element={<Recent />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="collection" element={<Collection />} />
          <Route path="category/:genre" element={<CategoryPage />} />
          <Route path="anime/:id" element={<AnimeDetailPage />} />
          <Route path="search" element={<div className="p-8 text-white">Поиск</div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;