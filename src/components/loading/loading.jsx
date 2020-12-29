import React from 'react';
import styles from './loading.module.css';

const Loading = () => (
    <div className={styles.loading} aria-label="Loading">
        <span aria-hidden="true" className={styles.noAnimation}>Loading</span>
        <div className={styles.spinner}>
            <div className={styles.spinnerItem} />
            <div className={styles.spinnerItem} />
            <div className={styles.spinnerItem} />
        </div>
    </div>
);

export default Loading;
