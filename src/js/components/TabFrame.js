import PropTypes from 'prop-types';
import React from 'react';

export default function TabFrame({ children, label, tab }) {
	if (tab !== label) {
		return null;
	}
	return (
		<div className="tab--frame">
			{children}
		</div>
	);
}

TabFrame.propTypes = {
	children: PropTypes.node.isRequired,
	label: PropTypes.string.isRequired,
	tab: PropTypes.string.isRequired,
};
