import React, {Component} from 'react';
require('./footer.scss');

export default class Footer extends Component {
	render() {
		return (
			<footer className="footer">
				<div className="footer-container">
					<p className="foot-p f-left"><small>© 2019. All Rights Reserved</small></p>
				</div>
			</footer>
		)
	}	
}