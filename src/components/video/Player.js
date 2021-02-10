import React from 'react';
import { Player } from 'video-react';

import { Map } from '../map/Map';
import { Chapter } from './Chapter';
import { Keyword } from './Keyword';
import { ChatRoom } from '../chatroom/ChatRoom';

import Jumbotron from 'react-bootstrap/Jumbotron';
import Button from 'react-bootstrap/Button'

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
                <div className="container-fluid">
                    <Jumbotron>
                        <h1>{film.Film.title}</h1>
                        <p>"An infectiously funny docu-drama road trip across America that you'll never forget." CINEQUEST</p>
                        <p>
                            <Button href={film.Film.synopsis_url}>Synopsis</Button>
                        </p>
                    </Jumbotron>
                    <div className="d-flex flex-row justify-content-center">
                        <Player
                            ref={player => {this.player = player;}}
                            autoPlay
                            playsInline
                            src={film.Film.file_url}
                            height={600}
                            fluid={false}
                        />
                        <ChatRoom
                            currentTime = {this.state.player ? this.state.player.currentTime : 0}
                        />
                    </div>
                    <aside className="d-flex flex-column justify-content-center align-items-center mt-5">
                        <h1>You want more information ?</h1>
                        <div className="d-flex flex-row justify-content-around align-items-start">
                            <Chapter 
                                items = {film.Chapters}
                                onClick = {this.getChapterPos.bind(this)}
                                currentTime = {this.state.player ? this.state.player.currentTime : 0}
                            />
                            <Map
                                items = {film.Waypoints}
                                onClick = {this.getMapPos.bind(this)}
                            />
                            <Keyword
                                items = {film.Keywords}
                                currentTime = {this.state.player ? this.state.player.currentTime : 0}
                            />
                        </div>
                    </aside>
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