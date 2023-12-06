import React, { useEffect, useMemo, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { ProgressBar, Row, Col, ListGroup } from 'react-bootstrap';
import './player.css'

import PreImg from '../assets/pre.png';
import nextImg from '../assets/next.png';
import stopImg from '../assets/stop.png';
import runImg from '../assets/run.png';

import { wordData } from '../mock/index'
let MyMusicPlayer = () => {
	const PlayRef = useRef(null);
	const [activeId, setActiveId] = useState(0); 
	const [song, setSong] = useState([])
	const [songPress, setSongPress] = useState(0); // 进度条的值
	const [isPlaying, setIsPlaying] = useState(false);

	// 音乐播放进度回
	// playedSeconds 当前播放进度时间  kk
	// loadedSeconds 当前音频总时间
	const onProgress = (e) => {
		let playedSeconds =e.playedSeconds;
		let loadedSeconds = e.loadedSeconds;
		let data = 0;
		if (playedSeconds >= loadedSeconds) {
			data =  100
		} else {
			data =  (playedSeconds / loadedSeconds) * 100
		}
		setSongPress(data)
	}
	// 列表点击播放
	const play = (id) => {
		setActiveId(id)
		setSong(wordData[id])
	}
	// 图标点击播放
	const action = (flag) => {
		setIsPlaying(flag)
	}
	// 上一首
	const prePlay = (id) => {
		if (id <= 0) {
			setActiveId(0)
			setSong(wordData[0])
		} else {
			setActiveId(id)
			setSong(wordData[id])
		}
	}
	// 下一首
	const nextPlay = (id) => {
		if (id >= wordData.length - 1) {
			setActiveId(wordData.length - 1)
			setSong(wordData[wordData.length - 1])
		} else {
			setActiveId(id)
			setSong(wordData[id])
		}
	}
	// 页面挂载后会执行
	useEffect(() => {
		setSong(wordData[0])
	}, [])
	return (
		<div className="playerPage">
			<Row className='playContent'>
				<Col style={{ paddingTop: '40px', width: 'calc(100% - 640px)' }}>
					<ListGroup>
						<ListGroup.Item style={{ backgroundColor: '#000' }}>歌名
							<span>
								歌手
							</span></ListGroup.Item>
						{
							wordData.map((item, id) =>
								<ListGroup.Item key={id} style={{ backgroundColor: activeId === id ? '#ccc' : '#000' }} onClick={() => play(id)}>
									{item.title}
									<span>
										{item.art}
									</span>
								</ListGroup.Item>)
						}
					</ListGroup>
				</Col>
				<Col>
					<ReactPlayer
						url={song.musicUrl}
						playing={isPlaying}
						ref={PlayRef}
						onProgress={onProgress}
					/>
					<div className='songContent'>
						<img src={song.imgUrl} alt={song.title} />
						<h3>歌词</h3>
						<div>
							{
								song?.word?.map((item, id) => <p key={id}>{item}</p>)
							}
						</div>
					</div>
				</Col>
			</Row>
			<Row className='playFooter'>
				<Col sm={1} md={1} xs={1}></Col>
				<Col sm={1} md={1} xs={1}>
					<img src={PreImg} alt='pre' onClick={() => prePlay(activeId - 1)} />
				</Col>
				<Col sm={1} md={1} xs={1}></Col>
				{
					!isPlaying ?
						<Col sm={1} md={1} xs={1}>
							<img src={runImg} alt='pre' onClick={() => action(true)} />
						</Col>
						:
						<Col sm={1} md={1} xs={1}>
							<img src={stopImg} alt='pre' onClick={() => action(false)} />
						</Col>
				}
				<Col sm={1} md={1} xs={1}></Col>
				<Col sm={1} md={1} xs={1}>
					<img src={nextImg} alt='pre' onClick={() => nextPlay(activeId + 1)} />
				</Col>
				<Col sm={6} md={6} xs={6} style={{ paddingTop: '36px' }}>
					<ProgressBar now={songPress} animated status="active" />
				</Col>
			</Row>
		</div>
	);
};

export default MyMusicPlayer;
