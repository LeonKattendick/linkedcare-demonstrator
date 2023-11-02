import { TestButton } from 'core/component/TestButton';
import ReactDOM from 'react-dom/client';

const App = () => {
  return (
    <>
      <TestButton />
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
