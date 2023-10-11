import { useState } from 'react';


function App() {
  const [token, setToken] = useState('');
  const [isBot, setIsBot] = useState(false);
  const [userData, setUserData] = useState(null);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = `/api/validation?bot=${isBot}&token=${token}`;
    console.log(apiUrl);

  try {
  const response = await fetch(apiUrl, {
    method: 'POST',
  });

  if (response.ok) {
    const data = await response.json();
    setUserData(data); // Set the state with the retrieved data
  } else {
    // Handle the case when the response is not ok
  }
} catch (error) {
  // Handle errors
}

}

  return (<>

<div class="flex items-center justify-center h-fit overflow-y-scroll">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full sm:max-w-md" onSubmit={handleSubmit}>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="token">
        Token
      </label>
      <input
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="token"
        type="text"
        placeholder="Token"
        value={token}
        onChange={(e) => setToken(e.target.value)}
      />
    </div>
    <div class="mb-2">
      <label class="block text-gray-700 text-sm font-bold" for="bot">
        Bot
      </label>
      <input
        class="mr-2 leading-tight"
        type="checkbox"
        checked={isBot}
        onChange={(e) => setIsBot(e.target.checked)}
        id="bot"
      />
    </div>
    <div class="flex items-center justify-between">
      <button
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit
      </button>
    </div>


<div className="font-mono font-sm break-all h-auto">
      {userData ? (
        <ul>
          {Object.entries(userData.data).map(([key, value]) => (
            <li key={key}>
              <div className="font-bold">{key}:</div>
              <div className="p-2 rounded-md border-2 bg-zinc-200 shadow-md">{value}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>...</p>
      )}
    </div>


  </form>




</div>


  </>);
}

export default App;
