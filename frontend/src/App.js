import Instructions from './components/Instructions';
import DisplayInfo from './components/DisplayInfo';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Instructions/>
        <DisplayInfo/>
        <Footer/>
      </header>
      
    </div>
  );
}

export default App;
