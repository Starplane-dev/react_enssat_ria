import React from 'react';
import { Map } from '../map/Map';
import { Chapter } from './Chapter';
import { Keyword } from './Keyword';

import { Player } from 'video-react';

import "video-react/dist/video-react.css";
import { ChatRoom } from '../chatroom/ChatRoom';


export class MyPlayer extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            data_loaded: false,
            film: null,
            player: null
        }

        this.seek = this.seek.bind(this);
    }

    getChapterPos(chapter) {
        this.seek(chapter.pos);
    }

    getMapPos(marker) {
        this.seek(marker.timestamp);
    }

    render() {
        const { data_loaded, film } = this.state;

        if(data_loaded) {
            return (
                <div>
                    <h1>Title : {film.Film.title}</h1>
                    <h5><a href={film.Film.synopsis_url}>{film.Film.synopsis_url}</a></h5>
                    <Player
                        ref={player => {
                            this.player = player;
                        }}
                        autoPlay
                        playsInline
                        src={film.Film.file_url}
                    />
                    <aside>
                        <Chapter 
                            items = {film.Chapters}
                            onClick = {this.getChapterPos.bind(this)}
                        />
                    </aside>
                    <div>
                        <Map
                            items = {film.Waypoints}
                            onClick = {this.getMapPos.bind(this)}
                        />
                    </div>
                    <div>
                        <Keyword
                            items = {film.Keywords}
                            currentTime = {this.state.player ? this.state.player.currentTime : 0}
                        />
                    </div>
                    <div>
                        <ChatRoom />
                    </div>
                </div>
            );
        } else {
            return (
                <div>
                    <p>Loading film</p>
                </div>
            );
        }
    }

    handleStateChange(state) {
        this.setState({
            player: state
        });
    }

    seek(seconds) {
        this.player.seek(seconds);
    }    

    componentDidMount() {
        fetch("https://imr3-react.herokuapp.com/backend")
            .then(res => res.json())
            .then(result => {
                this.setState({ 
                    data_loaded: true,
                    film: result
                });
            }).then(() => {
                this.player.subscribeToStateChange(this.handleStateChange.bind(this));
            });
    }

}