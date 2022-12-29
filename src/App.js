import {Navigate, Route, Routes, useLocation, useNavigate} from "react-router-dom";
import {Todo} from "./pages/todo";
import {Sleep} from "./pages/sleep";
import {Pomodoro} from "./pages/pomodoro";
import {Sleeps} from "./pages/sleeps";


function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  return (
    <>
      <Routes>
        <Route path={''} index element={<Navigate to={'todo'} />}/>
        <Route path={'todo'} element={<Todo />} />
        <Route path={'pomodoro'} element={<Pomodoro />}/>
        <Route path={'sleep'} element={<Sleep />} />
        <Route path={'sleeps'} element={<Sleeps />}/>
      </Routes>
      <div className={'app-bar'}>
        <div
          onClick={() => navigate('/todo')}
          className={'d-flex flex-column align-items-center'}>
          <i style={{fontSize: '35px', color: pathname === '/todo' ? '#048af3' : ''}}
             className="bi bi-list-task"></i>
        </div>
        <div
          onClick={() => navigate('/pomodoro')}
          className={'d-flex flex-column align-items-center'}>
          <i style={{fontSize: '30px', color: pathname === '/pomodoro' ? '#048af3' : ''}} className="bi bi-alarm"></i>
        </div>
        <div
          onClick={() => navigate('/sleep')}
          className={'d-flex flex-column align-items-center'}>
          <i style={{fontSize: '30px', color: pathname === '/sleep' ? '#048af3' : ''}} className="bi bi-moon-stars"></i>
        </div>
      </div>
    </>
  );
}

export default App;
