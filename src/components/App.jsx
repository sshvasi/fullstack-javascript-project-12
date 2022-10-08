import { useEffect, useState } from 'react';

const App = () => {
  const [state, setState] = useState(null);

  useEffect(() => {
    (async () => {
      const response = await fetch('/');
      const text = await response.text();
      setState(text);
    })();
  }, []);

  return <pre>{state}</pre>;
};

export default App;
