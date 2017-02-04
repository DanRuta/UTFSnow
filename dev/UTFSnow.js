"use strict"

class UTFSnow {

    constructor ({content="&#x2744;", limit=25, color="black", speedMultiplier=1, 
        densityMultiplier=1, mouseTilt=true, mouseNudge=true, mousePop=true}={}) {

        this.content = content
        this.limit = limit
        this.color = color
        this.speedMultiplier = speedMultiplier
        this.active = true

        this.mouseTilt = mouseTilt
        this.mouseNudge = mouseNudge
        this.mousePop = mousePop

        this.particles = [],
        this.mouseCoords = {x:0, y:0}

        // Displayed particles container
        this.particleContainer = document.createElement("div")
        this.applyContainerStyles(this.particleContainer)
        this.particleContainer.style.zIndex = "-10000000000000"
        document.body.appendChild(this.particleContainer)

        // Particle interaction container
        this.interactionContainer = document.createElement("div")
        this.applyContainerStyles(this.interactionContainer)
        this.interactionContainer.style.zIndex = "10000000000000"
        this.interactionContainer.style.marginTop = "-100vh"

        document.body.appendChild(this.interactionContainer)

        window.addEventListener("mousemove", event => {
            this.mouseCoords.x = event.clientX
            this.mouseCoords.y = event.clientY
        })

        this.render()
        setInterval(this.addItems.bind(this), 1000*(1/densityMultiplier))
    }

    applyContainerStyles (element) {
        element.style.height = "100vh"
        element.style.width = "100vw"
        element.style.position = "fixed"
        element.style.top = "0"
        element.style.left = "0"
    }

    applyItemStyles (element) {
        element.style.position = "absolute"
        element.style.color = this.color
        element.style.willChange = "margin-top margin-left"
        element.style.userSelect = "none"
        element.style.cursor = "default"
    }

    render () {

        requestAnimationFrame(this.render.bind(this))

        if(!this.active) return

        this.particles.forEach(particle => {

            const leftOrRightTilt = this.mouseTilt ? (this.mouseCoords.x - window.innerWidth/2)/750 : 0,
            xNudgeValue = this.mouseNudge ? 2*particle.xNudge*(1/(particle.size)) : 0,
            yNudgeValue = this.mouseNudge ? 1.5*particle.yNudge*(1/(particle.size/2)) : 0

            particle.x += this.speedMultiplier * ((particle.size * leftOrRightTilt + particle.direction)) + xNudgeValue
            particle.y += 0.1 + this.speedMultiplier * (particle.size/4 + this.speedMultiplier*0.2 * Math.random()*1.25 ) + yNudgeValue


            if(this.mouseNudge){
                particle.xNudge *= 0.98
                particle.yNudge *= 0.98
            }

            particle.element.style.marginTop  = `${particle.y}px`
            particle.element.style.marginLeft = `${particle.x}px` 

            particle.interactionElement.style.marginTop = `calc(100vh + ${particle.y}px)`
            particle.interactionElement.style.marginLeft = `${particle.x}px`


            if(particle.y <= window.innerHeight*0.1)
                particle.element.style.opacity = Math.min(parseFloat(particle.element.style.opacity)*1.02*Math.max(1,this.speedMultiplier), particle.opacity) 

            else if(particle.y >= window.innerHeight*0.8){
                particle.element.style.opacity = parseFloat(particle.element.style.opacity)*0.98

                if(particle.y >= window.innerHeight)
                    this.removeParticle(particle)
            }
        })
    }

    addItems () {
        if(this.particles.length<this.limit && this.active)
            this.particles.push(this.createItems())
    }

    createItems () {

        const size = Math.random()+0.5,
        opacity = Math.random()/1.5+0.35

        const particleElem = document.createElement("div")

        if(this.content instanceof HTMLElement)
             particleElem.appendChild(this.content.cloneNode())
        else particleElem.innerHTML = this.content

        this.applyItemStyles(particleElem)

        particleElem.style.opacity = 0.1
        particleElem.style.fontSize = size*150+"%"
        this.particleContainer.appendChild(particleElem)

        const interactionElem = document.createElement("div")
        interactionElem.innerHTML = this.content
        interactionElem.style.fontSize = size*150+"%"
        interactionElem.style.opacity = 0

        this.applyItemStyles(interactionElem)
        this.interactionContainer.appendChild(interactionElem)

        const particle = {
            element : particleElem,
            interactionElement: interactionElem,
            speed: Math.random(),
            size,
            opacity,
            direction: (Math.random()-0.5)/2,
            x: Math.random()*window.innerWidth*0.8 + window.innerWidth*0.1,
            y: 0,
            xNudge: 0,
            yNudge: 0
        }

        if(this.mouseNudge){
            particle.interactionElement.onmouseenter = e => {

                const innerPosRatio = {
                    x: (event.offsetX / particle.element.offsetWidth) * 0.8 + 0.1,
                    y: event.offsetY / particle.element.offsetHeight
                },

                deltaXNudge = (innerPosRatio.x<0.5 ? 1 : -1) * (0.5-Math.abs(innerPosRatio.x-0.5)) * 3.75

                particle.xNudge += deltaXNudge < 0 ? Math.max(deltaXNudge, -5) : Math.min(deltaXNudge, 5)
                particle.yNudge = -1 * innerPosRatio.y
            }
        }

        if(this.mousePop){
            particle.interactionElement.onclick = () => {
                this.removeParticle(particle)
            }
        }

        return particle
    }

    removeParticle (particle) {
        particle.element.remove()
        particle.interactionElement.onmouseenter = null
        particle.interactionElement.onclick = null
        particle.interactionElement.remove()
        this.particles.splice(this.particles.indexOf(particle), 1)
    }

    pause () {
        this.active = false
    }

    resume () {
        this.active = true
    }
}