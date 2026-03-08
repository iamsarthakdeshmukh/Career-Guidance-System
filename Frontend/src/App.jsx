import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LandingPg from './Pages/LandingPg';
import LoginForm from './Pages/Login';
import Forms from './Pages/Forms';
import Results from './Pages/Results';
import Developers from './Pages/Developers';
import PageNotFound from './Pages/PageNotFound';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './Pages/Profile';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPg />} />
      <Route path="/login" element={<LoginForm />} />
        <Route path="/developers" element={<Developers />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/form" element={<Forms />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

        <Route path="/results" element={<Results />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
}

export default App;
