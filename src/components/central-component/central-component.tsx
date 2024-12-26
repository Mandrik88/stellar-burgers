import { FC, memo, useEffect, useState } from 'react';
import { CentralComponentUI } from '../ui/central-component';
import { TCentral } from './type';
import { useLocation } from 'react-router-dom';

export const CentralComponent: FC<TCentral> = memo(({ title, children }) => {
  const location = useLocation();
  const [titleStyle, setTitleStyle] = useState('text_type_main-large');

  useEffect(() => {
    if (/feed|profile/i.test(location.pathname)) {
      setTitleStyle('text_type_digits-default');
    }
  }, []);

  return (
    <>
      <CentralComponentUI
        title={title}
        titleStyle={titleStyle}
        children={children}
      />
    </>
  );
});
