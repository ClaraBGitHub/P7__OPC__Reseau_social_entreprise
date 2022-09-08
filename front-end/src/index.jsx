import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// old - v5
// import { BrowserRouter, Switch, Route } from 'react-router-dom';
// const App = () => {
//   return (
//     <BrowserRouter>
//       <Switch>
//         <Route exact path="/" component={Home} />
//         <Route path="/users" component={Users} />
//       </Switch>
//     </BrowserRouter>
//   );
// }

// new - v6
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="users" element={<Users />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }
