import { FC, memo } from 'react';
import { TCentralComponentUI } from './type';
import styles from './central-component.module.css';

export const CentralComponentUI: FC<TCentralComponentUI> = memo(
  ({ title, titleStyle, children }) => (
    <>
      <div className={styles.center}>
        <div className={styles.headerCenter}>
          <h3 className={`text ${titleStyle}`}>{title}</h3>
        </div>
        <div>{children}</div>
      </div>
    </>
  )
);
