import { Routes, Route } from 'react-router-dom';
import Post from './pages/Post';
import AuthPage from './pages/AuthPage';

import './App.css';
import PasswordResetVerifyPage from './components/auth/accountrecovery/PasswordResetVerifyPage';
import PasswordResetFormPage from './components/auth/accountrecovery/PasswordResetFormPage';
import MyPage from './pages/MyPage';

function App() {
  return (
    <Routes>
      {/* path="/"에 대한 element={}를 회원가입,로그인 부분으로 바꿔주세요  */}
      <Route path="/" element={<AuthPage />} />  
      <Route path="/post" element={<Post />} />
      <Route path="/reset-password" element={<PasswordResetVerifyPage />} />
      <Route path="/reset-password/update" element={<PasswordResetFormPage />} />
      <Route path="/mypage" element={<MyPage />} />
    </Routes>
  )
}

export default App
