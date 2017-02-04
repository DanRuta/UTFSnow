"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var UTFSnow = function () {
    function UTFSnow() {
        var _this = this;

        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            _ref$content = _ref.content,
            content = _ref$content === undefined ? "&#x2744;" : _ref$content,
            _ref$limit = _ref.limit,
            limit = _ref$limit === undefined ? 25 : _ref$limit,
            _ref$color = _ref.color,
            color = _ref$color === undefined ? "black" : _ref$color,
            _ref$speedMultiplier = _ref.speedMultiplier,
            speedMultiplier = _ref$speedMultiplier === undefined ? 1 : _ref$speedMultiplier,
            _ref$densityMultiplie = _ref.densityMultiplier,
            densityMultiplier = _ref$densityMultiplie === undefined ? 1 : _ref$densityMultiplie,
            _ref$mouseTilt = _ref.mouseTilt,
            mouseTilt = _ref$mouseTilt === undefined ? true : _ref$mouseTilt,
            _ref$mouseNudge = _ref.mouseNudge,
            mouseNudge = _ref$mouseNudge === undefined ? true : _ref$mouseNudge,
            _ref$mousePop = _ref.mousePop,
            mousePop = _ref$mousePop === undefined ? true : _ref$mousePop;

        _classCallCheck(this, UTFSnow);

        this.content = content;
        this.limit = limit;
        this.color = color;
        this.speedMultiplier = speedMultiplier;
        this.active = true;

        this.mouseTilt = mouseTilt;
        this.mouseNudge = mouseNudge;
        this.mousePop = mousePop;

        this.particles = [], this.mouseCoords = { x: 0, y: 0 };

        // Displayed particles container
        this.particleContainer = document.createElement("div");
        this.applyContainerStyles(this.particleContainer);
        this.particleContainer.style.zIndex = "-10000000000000";
        document.body.appendChild(this.particleContainer);

        // Particle interaction container
        this.interactionContainer = document.createElement("div");
        this.applyContainerStyles(this.interactionContainer);
        this.interactionContainer.style.zIndex = "10000000000000";
        this.interactionContainer.style.marginTop = "-100vh";

        document.body.appendChild(this.interactionContainer);

        window.addEventListener("mousemove", function (event) {
            _this.mouseCoords.x = event.clientX;
            _this.mouseCoords.y = event.clientY;
        });

        this.render();
        setInterval(this.addItems.bind(this), 1000 * (1 / densityMultiplier));
    }

    _createClass(UTFSnow, [{
        key: "applyContainerStyles",
        value: function applyContainerStyles(element) {
            element.style.height = "100vh";
            element.style.width = "100vw";
            element.style.position = "fixed";
            element.style.top = "0";
            element.style.left = "0";
        }
    }, {
        key: "applyItemStyles",
        value: function applyItemStyles(element) {
            element.style.position = "absolute";
            element.style.color = this.color;
            element.style.willChange = "margin-top margin-left";
            element.style.userSelect = "none";
            element.style.cursor = "default";
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            requestAnimationFrame(this.render.bind(this));

            if (!this.active) return;

            this.particles.forEach(function (particle) {

                var leftOrRightTilt = _this2.mouseTilt ? (_this2.mouseCoords.x - window.innerWidth / 2) / 750 : 0,
                    xNudgeValue = _this2.mouseNudge ? 2 * particle.xNudge * (1 / particle.size) : 0,
                    yNudgeValue = _this2.mouseNudge ? 1.5 * particle.yNudge * (1 / (particle.size / 2)) : 0;

                particle.x += _this2.speedMultiplier * (particle.size * leftOrRightTilt + particle.direction) + xNudgeValue;
                particle.y += 0.1 + _this2.speedMultiplier * (particle.size / 4 + _this2.speedMultiplier * 0.2 * Math.random() * 1.25) + yNudgeValue;

                if (_this2.mouseNudge) {
                    particle.xNudge *= 0.98;
                    particle.yNudge *= 0.98;
                }

                particle.element.style.marginTop = particle.y + "px";
                particle.element.style.marginLeft = particle.x + "px";

                particle.interactionElement.style.marginTop = "calc(100vh + " + particle.y + "px)";
                particle.interactionElement.style.marginLeft = particle.x + "px";

                if (particle.y <= window.innerHeight * 0.1) particle.element.style.opacity = Math.min(parseFloat(particle.element.style.opacity) * 1.02 * Math.max(1, _this2.speedMultiplier), particle.opacity);else if (particle.y >= window.innerHeight * 0.8) {
                    particle.element.style.opacity = parseFloat(particle.element.style.opacity) * 0.98;

                    if (particle.y >= window.innerHeight) _this2.removeParticle(particle);
                }
            });
        }
    }, {
        key: "addItems",
        value: function addItems() {
            if (this.particles.length < this.limit && this.active) this.particles.push(this.createItems());
        }
    }, {
        key: "createItems",
        value: function createItems() {
            var _this3 = this;

            var size = Math.random() + 0.5,
                opacity = Math.random() / 1.5 + 0.35;

            var particleElem = document.createElement("div");

            if (this.content instanceof HTMLElement) particleElem.appendChild(this.content.cloneNode());else particleElem.innerHTML = this.content;

            this.applyItemStyles(particleElem);

            particleElem.style.opacity = 0.1;
            particleElem.style.fontSize = size * 150 + "%";
            this.particleContainer.appendChild(particleElem);

            var interactionElem = document.createElement("div");
            interactionElem.innerHTML = this.content;
            interactionElem.style.fontSize = size * 150 + "%";
            interactionElem.style.opacity = 0;

            this.applyItemStyles(interactionElem);
            this.interactionContainer.appendChild(interactionElem);

            var particle = {
                element: particleElem,
                interactionElement: interactionElem,
                speed: Math.random(),
                size: size,
                opacity: opacity,
                direction: (Math.random() - 0.5) / 2,
                x: Math.random() * window.innerWidth * 0.8 + window.innerWidth * 0.1,
                y: 0,
                xNudge: 0,
                yNudge: 0
            };

            if (this.mouseNudge) {
                particle.interactionElement.onmouseenter = function (e) {

                    var innerPosRatio = {
                        x: event.offsetX / particle.element.offsetWidth * 0.8 + 0.1,
                        y: event.offsetY / particle.element.offsetHeight
                    },
                        deltaXNudge = (innerPosRatio.x < 0.5 ? 1 : -1) * (0.5 - Math.abs(innerPosRatio.x - 0.5)) * 3.75;

                    particle.xNudge += deltaXNudge < 0 ? Math.max(deltaXNudge, -5) : Math.min(deltaXNudge, 5);
                    particle.yNudge = -1 * innerPosRatio.y;
                };
            }

            if (this.mousePop) {
                particle.interactionElement.onclick = function () {
                    _this3.removeParticle(particle);
                };
            }

            return particle;
        }
    }, {
        key: "removeParticle",
        value: function removeParticle(particle) {
            particle.element.remove();
            particle.interactionElement.onmouseenter = null;
            particle.interactionElement.onclick = null;
            particle.interactionElement.remove();
            this.particles.splice(this.particles.indexOf(particle), 1);
        }
    }, {
        key: "pause",
        value: function pause() {
            this.active = false;
        }
    }, {
        key: "resume",
        value: function resume() {
            this.active = true;
        }
    }]);

    return UTFSnow;
}();
