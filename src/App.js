/**
 * Vinicius Diogo <viniciusdiogo@gmail.com>
 * Main App Component
 */

import React from 'react';
import './App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentDelete from 'material-ui/svg-icons/content/clear';
import CanvasRectangle from './CanvasRectangle';
import ConstantsList from './Constants';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false,
            canvasList: []
        };
        this.onAddBtnClick = this.onAddBtnClick.bind(this);
        this.onClearBtnClick = this.onClearBtnClick.bind(this);
    }

    handleClose = () => {
        this.setState({ openDialog: false });
    };

    componentDidMount() {
        console.log('did mount')
        let countRectagles = localStorage.getItem('react-canvas-count');
        console.log('load localstorage', countRectagles);
        for (let i = 0; i < countRectagles; i++) {
            console.log('loading', i)
            this.onAddBtnClick.call(this, null, true);
        }
    }

    componentWillUnmount() {
        console.log('did unmount')
    }

    componentDidUpdate(prevProps, prevState) {

    }

    getViewportSize() {
        return {
            w: Math.max(document.documentElement.clientWidth, window.innerWidth || 0),
            h: Math.max(document.documentElement.clientHeight, window.innerHeight || 0)
        }
    }

    onAddBtnClick(event, ignoreLS) {
        const canvasList = this.state.canvasList;
        const canvasLength = canvasList.length;

        const viewPort = this.getViewportSize();
        const boxWidth = viewPort.w / 5;

        if (canvasLength < ConstantsList.MAX_NUMBER_RECTANGLE) {
            let newCanvas = <CanvasRectangle key={canvasLength} width={boxWidth} />
            canvasList.push(newCanvas)
            this.setState({
                canvasList: canvasList
            });
        }
        if (canvasLength === ConstantsList.MAX_NUMBER_RECTANGLE) {
            this.setState({ openDialog: true });
        }

        if (ignoreLS !== true) {
            localStorage.setItem('react-canvas-count', canvasList.length);
        }
    }

    onClearBtnClick(event) {
        this.setState({
            canvasList: []
        });
        localStorage.setItem('react-canvas-count', 0);
    }

    render() {
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />
        ];
        return (
            <div className="App">
                <section className="App-header">
                    <h2>React with canvas</h2>
                    <h3>Click on (+) to add the rectangle.</h3>
                </section>
                <section className="App-container">
                    <MuiThemeProvider>
                        <FloatingActionButton className="btn-actions" onClick={this.onAddBtnClick}>
                            <ContentAdd title="Add" />
                        </FloatingActionButton>
                    </MuiThemeProvider>
                    <MuiThemeProvider>
                        <FloatingActionButton className="btn-actions" onClick={this.onClearBtnClick}>
                            <ContentDelete title="Clear" />
                        </FloatingActionButton>
                    </MuiThemeProvider>
                    <div ref='canvasContainer' className="canvas-container" >
                        {this.state.canvasList}
                    </div>
                </section>
                <MuiThemeProvider>
                    <Dialog
                        title="React With Canvas"
                        actions={actions}
                        modal={false}
                        open={this.state.openDialog}
                        onRequestClose={this.handleClose}>
                        The number maximum of the rectangle is: {ConstantsList.MAX_NUMBER_RECTANGLE}
                    </Dialog>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default App;
