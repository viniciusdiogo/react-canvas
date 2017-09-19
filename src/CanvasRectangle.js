import React from 'react';

/*function rect(props) {
    const {ctx, x, y, width, height} = props;
    ctx.rect(x, y, width, height);
    ctx.stroke();
}*/

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
        ctx.rect(0, 0, this.width, this.width);
        ctx.stroke();
    }
    render() {
         return (
             <canvas ref="canvas" width={this.width} height={this.width}/>
         );
    }
}
