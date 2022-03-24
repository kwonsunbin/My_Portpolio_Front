import { Routes, Route } from 'react-router-dom';
import Main from './Container/Main';
import SignUp from './Container/SignUp';
import SignIn from './Container/SignIn';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Main />} exact />
        <Route path="/signup" element={<SignUp />} exact />
        <Route path="/signin" element={<SignIn />} exact />
      </Routes>
    </div>
  );
}

export default App;
