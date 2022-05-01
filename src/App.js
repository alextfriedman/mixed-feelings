// MVP
// Get cocktail data from API
// Listen for user selection (from dropdown menu) of which mood they're in
// Attribute each mood selection to an individual cocktail by adding a class name
// Display the cocktail to the screen based on user selection

// Stretch Goal #1
// include cocktail ingredients & recipe along with name & photo

// Stretch Goal #2
// Styling

// Modules
import { useEffect, useState } from "react";
import axios from "axios";

// Components
import DynamicDrink from "./Components/DynamicDrink";

// Styling
import './App.css';


const App = () => {
  const [drinkResult, setDrinkResult] = useState(null);
  const [userSelection, setUserSelection] = useState("initial");
  const [form, setForm] = useState(null);
  
  const handleClick = (e) => {
    e.preventDefault();
    // Update form state to userSelection value
    setForm(userSelection);
  }

  useEffect(() => {
    axios({
      url: "https://www.thecocktaildb.com/api/json/v1/1/search.php",
      method: "GET",
      dataResponse: "json",
      params: {
        s: userSelection
      },
    }).then((res) => {
      console.log(res.data.drinks[0]);
      setDrinkResult(res.data.drinks);
    })
  }, [form])

  return (
    <div className="App">
      <h1>Mixed Feelings</h1>
      <p>Select your mood to reveal what cocktail you should make!</p>
      <form onSubmit={handleClick}>
        <select name="mood" id="mood" onChange={(e) => {setUserSelection(e.target.value)}} value={userSelection}>
          <option value="initial" disabled>How are you feeling?</option>
          <option value="Strawberry_Margarita">Excited</option>
          <option value="Aperol_Spritz">Content</option>
          <option value="">Frustrated</option>
          <option value="White_Russian">Depressed</option>
          <option value="Vodka_Martini">Nervous</option>
          <option value="Vesper">Peaceful</option>
          <option value="Old_Fashioned">Nostalgic</option>
          <option value="French_75">Romantic</option>
        </select>
        <button>Submit</button>
      </form>

      <DynamicDrink drink={drinkResult}/>
    </div>
  );
}

export default App;