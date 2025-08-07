import styles from './Login.module.scss';
import LoginForm from '@/app/components/LoginForm/LoginForm';

export default function LoginPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h1 className={styles.title}>Login</h1>
                <LoginForm/>
            </div>
        </div>
    );
}