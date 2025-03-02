import '../../css/components/TabButton.css';
import PropTypes from 'prop-types';
import React from 'react';

export default function TabButton({ label, onClick, tab }) {
	return (
		<li className="tab--item">
			<button className={`tab--button${tab === label ? ' active' : ''}`} data-tab={label} onClick={onClick} type="button">{label}</button>
		</li>
	);
}

TabButton.propTypes = {
	label: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	tab: PropTypes.string.isRequired,
};
