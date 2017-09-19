/**
 * Vinicius Diogo <viniciusdiogo@gmail.com>
 * Canvas Rectangle Component
 */
import React from 'react';

export default class CanvasRectangle extends React.Component {
    constructor(props){
        super(props);
        this.width = props.width;
    }

    componentDidMount() {
        this.updateCanvas();
    }
    componentDidUpdate() {
        this.updateCanvas();
    }
    updateCanvas() {
        const ctx = this.refs.canvas.getContext('2d');
        ctx.clearRect(0, 0, this.width, this.width);
        ctx.lineWidth=10;
        ctx.rect(0, 0, this.width, this.width);      
        ctx.stroke();
    }
    render() {
         return (
             <canvas ref="canvas" width={this.width} height={this.width}/>
         );
    }
}
