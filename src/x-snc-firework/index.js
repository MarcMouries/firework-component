import {createCustomElement} from '@servicenow/ui-core';
import snabbdom from '@servicenow/ui-renderer-snabbdom';
import styles from './styles.scss';
import view from './view';

createCustomElement('x-snc-firework', {
	renderer: { type: snabbdom, view },
	view,
	styles
});
