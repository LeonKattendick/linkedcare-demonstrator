import { Button } from 'antd';
import { TestButton } from 'core/component/TestButton';
import 'core/util/i18n';
import ReactDOM from 'react-dom/client';
import { useTranslation } from 'react-i18next';

const App = () => {
  const { t, i18n } = useTranslation();

  return (
    <>
      <TestButton />
      <Button
        onClick={() => {
          i18n.changeLanguage('en');
        }}
      >
        {t('english')}
      </Button>
      <Button
        onClick={() => {
          i18n.changeLanguage('de');
        }}
      >
        {t('german')}
      </Button>
    </>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
