import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import paginationReducer from './store/Slices/paginationSlice';
import Header from './components/Header/Header';
import MainPage from './pages/MainPage/MainPage';
import DetailPage from './pages/DetailPage/DetailPage';
import StatisticsPage from './pages/StatisticsPage/StatisticsPage';

const store = configureStore({
  reducer: {
    pagination: paginationReducer,
  },
});

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/detailPage/:id" element={<DetailPage />} />
            <Route path="/statistics" element={<StatisticsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
