import { ReactMic } from 'react-mic';
import React from 'react';
import "./record.css"
import axios from '../../../axios';
import Search from '../search/search';
import Item from '../search/components/results/item';
import Spinner from '../../spinner/spinner';
import ResultGroup from '../search/components/results/resultGroup';

export class Record extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      item: null,
      type: 'Songs',
    }
  }

  startRecording = async () => {
    this.setState({ record: true });
    
    const data = await fetch('http://localhost:5000/record').then(data => { 
        return data.text()
    })
    const trackInfo = data.split('\n')
    trackInfo.shift()
    trackInfo.unshift()
    console.log(trackInfo)

    const query = trackInfo[2] + '  ' + trackInfo[0]

    const song = await axios.get(`/search?q=${query}&type=track&limit=1`).then(response => {

        console.log(response.data.tracks.items[0])
        this.setState({
          item: response.data.tracks.items[0]
        });
        return response
    });

    setTimeout(() => {
        this.setState({record: false})
    }, 3000)

    // console.log(song)
    
    
  }

//   stopRecording = () => {
//     this.setState({ record: false });
//   }

  onData(recordedBlob) {
//     console.log('chunk of real-time data is: ', recordedBlob);
  }

  onStop(recordedBlob) {
    console.log('recordedBlob is: ', recordedBlob);
  }

  render() {
    return (
      <div className='record_container'>
            <ReactMic
            record={this.state.record}
            className="sound-wave"
            onStop={this.onStop}
            onData={this.onData}
            strokeColor="#000000"
            backgroundColor="#FF4081" />
            <button onClick={this.startRecording} type="button">Record</button>
            <li className="result-body">
                {this.state.item? <Item key={1} item={this.state.item} type={this.state.type}/> : null}
            </li>
        

        </div>

    );
  }
}