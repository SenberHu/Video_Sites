import React, { Component } from 'react';
import { Link, IndexLink, hashHistory } from 'react-router';
import NavItem from './nav-item.jsx';
import { connect } from 'react-redux'
import api from './../../api'
import { fetchPostsIfNeeded } from '../../actions/user'
import { searchVideo } from './../../actions/user.js'

require('./nav.scss');

class Nav extends Component {
	constructor(props) {
		super(props);

		this.state = {
			items: [
				{ title: "Home", link: "/home", isActive: true },
				{ title: "Setting", link: "/upload", isActive: true },
				{ title: "Person-center", link: "/person/love", isActive: true }
			],
			currentItem: "Home",
			small: false
		}

		this.changeActive = this.changeActive.bind(this);
	}

	search() {
		const value = this.refs.search.value
		const { fetchPostsIfNeeded } = this.props

		fetchPostsIfNeeded(api.searchFetch, searchVideo, `searchValue=${value}`)

		hashHistory.push('/search')
	}

	render() {
		
		return (
			<header className="header small-header">
				<div className="header-container">
					<div>
						<h1 className="header-logo"><IndexLink to="/home">CLASS</IndexLink></h1>
						<div className="search-container">
							<input type="text" className="search-input" ref="search" />
							<div className="comment-submit" onClick={this.search.bind(this)}>
								<button>Search</button>
							</div>
						</div>
					</div>
					<nav className="header-nav">
						<NavItem changeActive={this.changeActive} items={this.state.items} currentItem={this.state.currentItem} />
					</nav>
				</div>
			</header>
		)
	}

	changeActive(item) {
		this.setState({ currentItem: item });
	}
}

const mapStateToProps = state => {
	return {
		searchVideos: state.user.searchVideos
	}
}

export default connect(
	mapStateToProps, {
		fetchPostsIfNeeded
	}
)(Nav)