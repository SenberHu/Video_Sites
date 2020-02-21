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
import { Steps, Popover } from 'antd';
//import { Input } from 'antd';
import MyTag from './mytag.jsx';
import { Button } from 'antd';
import { Chart, Tooltip, Axis, Legend, Coord, Guide, Pie } from 'viser-react';
//import * as React from 'react';



// //import React, { Component } from 'react';
// //import { connect } from 'react-redux'
// //import { hashHistory, Link } from 'react-router'
// import api from './../../api/index'
// //import { formatTime } from '../../utils/index.js'

//const URL = location.href.includes('localhost') ?  "http://127.0.0.1/" : "http://suvllian.top/"
const { Step } = Steps;
//const { TextArea } = Input;

//chart
const DataSet = require('@antv/data-set');

const sourceData = [
  { name: 'Slow', 'Speed.': 18.9},
  { name: 'Fast', 'Speed.': 12.4},
  { name: 'Easy', 'Difficulty.': 20.4},
  { name: 'Difficult', 'Difficulty.': 30.4},
];

//饼图1
// const sourceData1 = [
// 	{ item: '', count: 40 },
// 	{ item: '事例二', count: 21 },
// 	{ item: '事例三', count: 17 },
// 	{ item: '事例四', count: 13 },
// 	{ item: '事例五', count: 9 }
// ];

//chart
const dv= new DataSet.View().source(sourceData);
dv.transform({
  type: 'fold',
  fields: ['Speed.', 'Difficulty.'],
  key: '月份',
  value: '月均降雨量',
});
const data = dv.rows;

const customDot = (dot, { status, index }) => (
	<Popover
		content={
		<span>
			step {index} status: {status}
		</span>
		}
	>
		{dot}
	</Popover>
);

//饼图1
// const scale = [{
// 	dataKey: 'percent',
// 	min: 0,
// 	formatter: '.0%',
// }];

// const dv1 = new DataSet.View().source(sourceData1);
// 	dv1.transform({
// 	type: 'percent',
// 	field: 'count',
// 	dimension: 'item',
// 	as: 'percent'
// });
// const data1 = dv1.rows;


class teacher extends Component {
	constructor(props) {
		super(props);

		this.state = {
			videoList: [],
			videoClass: 0,
			navs: ['Lecture', 'Forum', 'Self-scoring'],
			playStatus: false, //list

			// commentList: [],
			// isLoved: false,
			// loveCount: 0,
			// isCollected: false,
			// collectCount: 0,
			// videoInfo: {}
		}
	

		this.changeNav = this.changeNav.bind(this)
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		this.getIndexData();
	}

	getIndexData() {
		const { fetchPostsIfNeeded } = this.props

		console.log(this.props)
		const { videoClass } = this.state

		// const { userId } = this.props

		// if (!userId && videoClass!=0) {
		// 		hashHistory.push('/login')
		// }

		fetchPostsIfNeeded(api.getIndexData, getVideoList, `videoClass=${videoClass}`)
	}

	changeNav(index) {
		this.setState({
			videoClass: index,
			playStatus: false
		}, () => {
			this.getIndexData()
		})
	}

	linkTo(id, e) {
		e.preventDefault()
		this.props.setVideoId(id)
		hashHistory.push(`/home/${id}`)
	}

	// clickCollectBtn() {
	// 	const { userId, videoId } = this.props
	// 	const count = this.state.isCollected ? -1 : 1

	// 	if (!userId) {
	// 		hashHistory.push('/login')
	// 	}

	// 	api.collectFetch(`userId=${userId}&videoId=${videoId}`)

	// 	this.setState({
	// 		isCollected: !this.state.isCollected,
	// 		collectCount: this.state.collectCount + count
	// 	})
	// }

	// clickLoveBtn() {
	// 	const { userId, videoId } = this.props
	// 	const count = this.state.isLoved ? -1 : 1

	// 	if (!userId) {
	// 		hashHistory.push('/login')
	// 	}

	// 	api.loveFetch(`userId=${userId}&videoId=${videoId}`)
	// 	// 加载页面判断用户是否添加喜欢
	// 	this.setState({
	// 		isLoved: !this.state.isLoved,
	// 		loveCount: this.state.loveCount + count
	// 	})
	// }

	submitComment() {
		const { userId, videoId } = this.props
		const commentValue = this.refs.comment.value
		const $this = this

		if (!userId) {
			hashHistory.push('/login')
		}

		if (!commentValue) {
			console.log('请输入内容')

			return
		}

		api.commentFetch(`userId=${userId}&videoId=${videoId}&content=${commentValue}`).then(res => {
			$this.refs.comment.value = ''
			$this.getCommentList()
		})
	}

	render() {
		const { navs, videoClass } = this.state;
		const { videoList = [] } = this.props
		const { newVideos = [], hotVideos = [] } = videoList
		const showType = this.props.params.type
		const recommendVideo = [...hotVideos]
		
		// const { commentList = [], isLoved, loveCount, isCollected, collectCount, videoInfo = {} } = this.state
		// const { title, videoSrc } = videoInfo
		// const loveImgSrc = isLoved ? 'love-after.png' : 'love-before.png'
		// const collectImgSrc = isCollected ? 'collect-after.png' : 'collect-before.png'

		recommendVideo.length = 4

		return (
			<div>
				<Slider />
				
				<HomeNav navs={navs} changeNav={this.changeNav} toRouter="/home/list" />
				{
					
				}
				
				{/* <div className="operate-list">
					<div className="operate-btn" onClick={this.clickCollectBtn.bind(this)}>
						<img src={require("./../../assets/" + collectImgSrc)} className="operate-img" />
						收藏({collectCount})
					</div>
					<div className="operate-btn" onClick={this.clickLoveBtn.bind(this)}>
						<img src={require("./../../assets/" + loveImgSrc)} className="operate-img" />
						喜欢({loveCount})
					</div>
				</div> */}
				<div> this is teacher page!</div>
				<br/>
				<Steps className="steps" current={1} progressDot={customDot} size="defult">
					<Step title="topic1" description="brief description of topic1" />
					<Step title="topic2" description="You can hover on the dot." />
					<Step title="topic3" description="You can hover on the dot." />
					<Step title="topic4" description="You can hover on the dot." />
					<Step title="topic5" description="You can hover on the dot." />
					<Step title="topic6" description="You can hover on the dot." />
				</Steps>
				
				{/* <div className="discuss-container">
					<h2 className="comment-title">DISCUSSION: </h2>
					<TextArea placeholder="Title" autosize />
					<div style={{ margin: '24px 0' }} />
					<TextArea
					placeholder="Content"
					autosize={{ minRows: 2, maxRows: 6 }}
					cols="30" rows="10"
					/>
					<div className="comment-submit">
						<button onClick={this.submitComment.bind(this)}>发表</button>
					</div>
				</div> */}
				
				//柱状图
				<div  className="chart">
				<Chart forceFit="false" height={400} data={data}> 
					<Tooltip />
					<Axis />
					<Legend />
					<Bar position="月份*月均降雨量" color="name" adjust={[{ type: 'dodge', marginRatio: 1 / 32 }]} />
				</Chart>
				</div>

				{/* //饼图1
				<Chart forceFit="false" height={400} data1={data1} scale={scale}>
					<Tooltip showTitle={false} />
					<Axis />
					<Legend dataKey="item" />
					<Coord type="theta" radius={0.75} innerRadius={0.6} />
					<Pie position="percent" color="item" style={{ stroke: '#fff', lineWidth: 1 }}
						label={['percent', {
							formatter: (val, item) => {
							return item.point.item + ': ' + val;
							}
						}]}
					/>
				</Chart> */}

				<div className="Button">
				<h1>TOPIC: </h1>
					<Button className="button" onClick="">Next Topic</Button>
					<Button className="button" onClick="">Previous Topic</Button>
				</div>

				<div className="comment-container">
					<h2 className="comment-title">DISCUSSION: </h2>
					<textarea name="comment" id="comment-input" placeholder="Title" cols="30" rows="1" ref="comment" ></textarea>
					<div style={{ margin: '24px 0' }} />
					<textarea name="comment" id="comment-input" placeholder="Content" cols="30" rows="10" ref="comment"></textarea>
				

					<div className="mytag">
						<MyTag>Topic1</MyTag>
						<MyTag>Topic2</MyTag>
						<MyTag>Topic3</MyTag>
						<MyTag>Topic4</MyTag>
						<MyTag>Topic5</MyTag>
						<MyTag>Topic6</MyTag>
					</div>
				
					<div className="comment-submit">
						<button onClick={this.submitComment.bind(this)}>发表</button>
					</div>
					<h2 className="comment-title">Question Board</h2>
					<div className="comment-list">
						{/* {
							commentList.map((comment, index) => (<div className="comment-item" key={index}>
								<div className="comment-info">
									<div className="comment-username">{comment.username}</div>
									<div className="comment-time">{formatTime(comment.aTime)}</div>
								</div>
								<div>{comment.content}</div>
							</div>
							))
						} */}
					</div>
				</div>

				<Hot />
			</div>
		
		)
	}
}

const mapStateToProps = state => {
	return {
		videoList: state.user.videoList
	}
}

function setVideoId(id) {
  return (dispatch, getState) => dispatch(play({videoId: id}))
}

// const getUser = state => {
// 	return {
// 		userId: state.user.userId,
// 		videoId: state.user.videoId
// 	}
// }

export default connect(
	//getUser,
	mapStateToProps, { setVideoId, fetchPostsIfNeeded }
)(teacher)