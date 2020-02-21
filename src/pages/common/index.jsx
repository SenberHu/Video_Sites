import React, { Component } from 'react';
import Nav from './nav.jsx';
import Footer from './footer.jsx';
import Sider from 'antd/lib/layout/Sider';
import { Layout } from 'antd';

require("./reset.scss");
require("./common.scss");

export default class App extends Component {
	render() {
		return (
			<div>
				<Nav />
				<Layout>
					{/* <Slider>Slider</Slider> */}
        			{this.props.children}
				</Layout>
				{/* <Footer /> */}
			</div>
		)
	}
}