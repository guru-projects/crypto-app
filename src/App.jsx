import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Coins from './pages/Coins'
import Layout from './Layout'
import { styled } from '@mui/system'
function App() {

  const AppContainer = styled('div')({
    root:{},
      backgroundColor: '#14161a',
      color: 'white',
      minHeight: '100vh',
    
  })
  return (
      <BrowserRouter>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Layout/>} >
            <Route index exact element={<Home/>} />
            <Route path="/coins/:id" element={<Coins/>} />
            </Route>
          </Routes>
        </AppContainer>
      </BrowserRouter>
  )
}

export default App
