import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import {
    faEnvelopeSquare,
    faPhoneSquare,
} from '@fortawesome/free-solid-svg-icons';

import styles from './Contacts.module.css';

export default function Contacts() {
    return (
        <section className={styles['contacts-container']}>
            <h4>Блиндор ЕООД</h4>
            <p>Може да се свържете с нас по следните начини:</p>
            <ul>
                <li>
                    <FontAwesomeIcon icon={faPhoneSquare} />
                    <span>+359 881 122 121</span>
                </li>
                <li>
                    <FontAwesomeIcon
                        icon={faEnvelopeSquare}
                        className={styles['icon']}
                    />
                    <span>blindoorltd@test.com</span>
                </li>
                <li>
                    <FontAwesomeIcon
                        icon={faFacebookSquare}
                        className={styles['icon']}
                    />
                    <span>www.fb.com/blindoorltd</span>
                </li>
            </ul>
            <p>
                или да посетите нашия шоурум на адрес
                <strong> бул. Княз Александър Дондуков 1</strong>
            </p>
        </section>
    );
}
