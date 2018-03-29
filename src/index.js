import React from 'react';
import ReactDOM from 'react-dom';

// Import Css
import './style/css/bootstrap.min.css';
import './index.css';

// Import personnal JS
//import { sampleText } from './sampleText';

// Marked.js
import marked from 'marked';

class App extends React.Component {

    state = {
        text: ''
    };

    componentWillMount() { 
        const text = localStorage.getItem('text');

        if(text){
            this.setState({ text });
        }
    };

    // Methode de REACT qui va se charger avant le rendu final
    componentWillUpdate(nextProps, nextState) {
        localStorage.setItem('text', nextState.text);
    };

    editText = (event) => {
        const text = event.target.value;
        this.setState({ text });
    };

    renderText = (text) => {
        const renderText = marked(text, {sanitize: true});
        return { __html: renderText };
    };

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-6">
                        <textarea 
                        value={this.state.text} 
                        rows="35" 
                        className="form-control"
                        onChange={(e) => this.editText(e)}
                        >

                        </textarea>
                    </div>

                <div className="col-sm-6">
                    <div dangerouslySetInnerHTML={this.renderText(this.state.text)}/>
                </div>

                </div>
            </div>
        );
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));



