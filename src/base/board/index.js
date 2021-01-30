import './index.scss';
import Node from '../node';
import Rect from '@ele/rect';
import Circle from '@ele/circle';
import { Camel2Normal } from '@utils';
import { SvgDom } from '@constant';

const initBoardOption = {
    width: 600,
    height: 400,
    container: 'body'
};

class Board {
    constructor(boardOption = {}) {
        this.children = [];

        this.option = {
            ...initBoardOption,
            ...boardOption
        };

        this.root = this.init();

        if(this.option.container === 'body') {
            document.body.appendChild(this.root);
        } else {
            const wrapper = document.getElementById(this.option.container);
            wrapper.appendChild(this.root);
        }
    }

    init() {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', SvgDom.Root);
        
        Object.keys(this.option).forEach(k => {
            const key = Camel2Normal(k);
            svg.setAttribute(key, this.option[k]);
        });

        const defs = new Node(SvgDom.Defs);
        const pattern = new Node(SvgDom.Pattern, {
            id: "dots",
            x: 0,
            y: 0,
            width: 16,
            height: 16,
            patternUnits: "userSpaceOnUse"
        });
        const circle = new Node(SvgDom.Circle, {
            fill: "#e6eced",
            cx: 8,
            cy: 8,
            r: 1
        });
        const rect = new Node(SvgDom.Rect, {
            x: 0,
            y: 0,
            width: "100%",
            height: "100%",
            fill: "url(#dots)"
        });

        pattern.el.appendChild(circle.el);
        defs.el.appendChild(pattern.el);
        svg.appendChild(defs.el);
        svg.appendChild(rect.el);

        return svg;
    }

    addRect(createRectOption = {}) {
        const newChild = new Rect(createRectOption);
        this.children.push(newChild);

        const el = newChild.el;
        this.root.appendChild(el);
    }

    addCircle(createCircleOption = {}) {
        const newChild = new Circle(createCircleOption);
        this.children.push(newChild);

        const el = newChild.el;
        this.root.appendChild(el);
    }
}

export default Board;