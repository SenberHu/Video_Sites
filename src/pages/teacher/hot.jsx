import React, {Component} from 'react';

const bottomHotItems = [
	{ src: '1.png', title: 'Rolling board' },
	{ src: '1.png', title: 'Rolling board' },
	{ src: '1.png', title: 'Rolling board' }
]

export default class Hot extends Component {
	render() {
		return (
			<section className="hot-article row">
			{
				bottomHotItems.map((item, index) => 
					<div className="col-md-4" key={index}>
					  <a href="#">
							<img className="hot-img" src={require("./../../assets/" + item.src)} />
							<p className="hot-title">{item.title}</p>
							<p className="hot-span">{item.content}</p>
						</a>
					</div>
				)
			}
			</section>
		)
	}

}