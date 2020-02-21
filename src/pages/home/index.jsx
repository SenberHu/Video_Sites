import React, { Component } from 'react';
import { hashHistory, Link } from 'react-router'
import Slider from './slider.jsx';
import HomeNav from './nav.jsx';
import VideoList from './video-list.jsx';
import VideoPlay from './video-play.jsx';
import Hot from './hot.jsx'
import { connect } from 'react-redux'
import api from './../../api'
import { fetchPostsIfNeeded } from '../../actions/user'
import { getVideoList, play } from './../../actions/user.js'
import { formatTime } from '../../utils/index.js'


class Home extends Component {
	constructor(props) {
		super(props);

		this.state = {

		}

		//this.changeNav = this.changeNav.bind(this)
	}

	componentWillReceiveProps(nextProps) {
		const { userId ,userType } = nextProps
		console.log('componentWillReceiveProps wo shi ' + userType)
		console.log('componentWillReceiveProps wo shi ' + userId)
		if( !userType)
		{
			hashHistory.push('/login')
		}
		if (userId && userType == 'teacher') {
			hashHistory.push('/teacher')
		}
		else if (userId && userType == 'student')
		{
			hashHistory.push('/student')
		}
	}
	
	componentDidMount() {
		const { userId, userType } = this.props
		console.log('userid' + userId)
		console.log('usertype' + userType)
		if( !userType || !userId)
		{
			hashHistory.push('/login')
		}
		if (userId && userType == 'teacher') {
			hashHistory.push('/teacher')
		}
		else if (userId && userType == 'student')
		{
			hashHistory.push('/student')
		}
	}



	render() {
		
		return (
			<div>
				this is home！
			</div>
		)
	}
}

const mapStateToProps = state => {
	return {
		userId: state.user.userId,
		userType : state.user.userType
	}
}

function setVideoId(id) {
  return (dispatch, getState) => dispatch(play({videoId: id}))
}

export default connect(
	mapStateToProps, { setVideoId, fetchPostsIfNeeded }
)(Home)