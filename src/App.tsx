import Homepage from './pages/Homepage'
import HomepageContext  from './pages/utils/HomepageContext'
import './App.css'

function App() {

  return (
    <>
    <HomepageContext>
      <Homepage/>
    </HomepageContext>
    </>
  )
}

export default App
