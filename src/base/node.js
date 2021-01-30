import { Camel2Normal } from '@utils';
const excludeKey = [
    'patternUnits'
];

class Node {
    constructor(element, option) {
        this.isDown = false;
        this.option = option || {};

        if(element) {
            this.init(element);
        }
    }

    init(element) {
        const createOption = this.option;
        const elementDom = document.createElementNS('http://www.w3.org/2000/svg', element);
    
        Object.keys(createOption).forEach(k => {
            const key = excludeKey.includes(k) ? k : Camel2Normal(k);
            elementDom.setAttribute(key, createOption[k]);
        });
    
        this.el = elementDom;
        this.option.move && this.letsmove();
    }

    letsmove() {
        if(!this.el) {
            console.error('[error] node must have a svg dom!');
            return false;
        }
        const el = this.el;

        el.onmousedown = function onmousedown(e) {
            this.isDown = true;
            el.style.cursor = "grabbing";	
            
            el.begin = {
                x: e.offsetX,
                y: e.offsetY
            }
            
            if(!el.end) {
                el.end = { x: 0, y: 0 }
            }
        }
        el.onmouseup = function onmouseup() {
            el.style.cursor = "grab";
            this.isDown = false;
            const [x, y] = el.getAttribute("transform").match(/(?<=\()(.*)(?=\))/g)[0].split(",");
            el.end = {x: +x, y: +y};
        }	
        el.onmouseleave = function onmouseleave() {
            this.isDown = false;
        }
        el.onmousemove = function onmousemove(e) {
            if(this.isDown) {
                el.style.cursor = "grabbing";
                const moveX = e.offsetX - el.begin.x + el.end.x;
                const moveY = e.offsetY - el.begin.y + el.end.y;
                el.setAttribute('transform', `translate(${moveX},${moveY})`);	
            }
        }
    }
}

export default Node;