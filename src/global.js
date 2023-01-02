/**
 * Preload fonts
 * @param {String} id
 */
 const preloadFonts = id => {
    return new Promise((resolve) => {
        WebFont.load({
            typekit: {
                id: id
            },
            active: resolve
        });
    });
};

/**
 * Return Bounding Box adjusted
 * @param {HTMLElement} el
 */
const adjustedBoundingRect = (el) => {
    let rect = el.getBoundingClientRect();
    let style = getComputedStyle(el);
    let tx = style.transform;

    if (tx) {
        let sx, sy, dx, dy;

        if (tx.startsWith('matrix3d(')) {
            let ta = tx.slice(9,-1).split(/, /);
            sx = +ta[0];
            sy = +ta[5];
            dx = +ta[12];
            dy = +ta[13];
        } else if (tx.startsWith('matrix(')) {
            let ta = tx.slice(7,-1).split(/, /);
            sx = +ta[0];
            sy = +ta[3];
            dx = +ta[4];
            dy = +ta[5];
        } else {
            return rect;
        }

        let to = style.transformOrigin;
        let x = rect.x - dx - (1 - sx) * parseFloat(to);
        let y = rect.y - dy - (1 - sy) * parseFloat(to.slice(to.indexOf(' ') + 1));
        let w = sx ? rect.width / sx : el.offsetWidth;
        let h = sy ? rect.height / sy : el.offsetHeight;
        
        return {
            x: x, y: y, width: w, height: h, top: y, right: x + w, bottom: y + h, left: x
        };
    } else {
        return rect;
    }
};

/**
 * Offset
 * @param {HTMLElement} el
 */
const offset = (el) => {
	const rect = el.getBoundingClientRect(),
		scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
		scrollTop = window.pageYOffset || document.documentElement.scrollTop;
	return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

/**
 * Convert String to Colour
 * @param {String} str
 */
const stringToColour = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}

export { 
    preloadFonts,
    adjustedBoundingRect,
    offset,
    stringToColour
};