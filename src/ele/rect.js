import Node from '../base/node';
import { SvgDom } from '@constant';

const initOption = {
    x: 0,
    y: 0,
    width: 100,
    height: 50,
    strokeWidth: 5,
    stroke: 'blue',
    fill: 'transparent',
    strokeLinejoin: "round",
    strokeOpacity: 0.7
};

class Rect extends Node {
    constructor(rectOption = {}) {
        super();

        this.option = {
            ...this.option,
            ...initOption,
            ...rectOption
        };

        this.init(SvgDom.Rect);
    }
}

export default Rect;