import Node from '../base/node';
import { SvgDom } from '@constant';

const initOption = {
    cx: 0,
    cy: 0,
    r: 30,
    strokeWidth: 5,
    stroke: 'red',
    fill: 'transparent',
    strokeOpacity: 0.7
};

class Circle extends Node {
    constructor(rectOption = {}) {
        super();

        this.option = {
            ...this.option,
            ...initOption,
            ...rectOption
        };

        this.init(SvgDom.Circle);
    }
}

export default Circle;