import { Routes, Route } from 'react-router-dom';
import Post from './pages/Post';

import './App.css';

function App() {
  return (
    <Routes>
      {/* path="/"에 대한 element={}를 회원가입,로그인 부분으로 바꿔주세요  */}
      {/* <Route path="/" element={<Post />} />   */}
      <Route path="/post" element={<Post />} />
    </Routes>
  )
}

export default App
