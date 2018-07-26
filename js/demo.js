/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2018, Codrops
 * http://www.codrops.com
 */
{
    // The Slide class.
    class Slide {
        constructor(el) {
			this.DOM = {el: el};
			// The image conteiner.
			this.DOM.imgWrap = this.DOM.el.querySelector('.slide__img-wrap');
			// The revealer element (the element with the same color of the body that covers the image).
			this.DOM.revealer = this.DOM.imgWrap.querySelector('.slide__img-reveal');
			// The title element.
			this.DOM.title = this.DOM.el.querySelector('.slide__title');
			// The slide´s number element
			this.DOM.number = this.DOM.el.querySelector('.slide__number');
			// The large preview elements (also an image and revealer for the cover/uncover effect)
			this.DOM.preview = {
				imgWrap: this.DOM.el.querySelector('.preview__img-wrap'),
				revealer: this.DOM.el.querySelector('.preview__img-wrap > .preview__img-reveal'),
				title: this.DOM.el.querySelector('.preview__title'),
				content: this.DOM.el.querySelector('.preview__content')
			};

			// Some config values.
            this.config = {
                animation: {
                    duration: 0.6,
                    ease: Expo.easeOut
				}
            };
		}
		// Sets the current class.
		setCurrent(isCurrent = true) {
			this.DOM.el.classList[isCurrent ? 'add' : 'remove']('slide--current');
		}
        // Hide the slide.
        hide(direction) {
			return this.toggle('hide', direction);
        }
        // Show the slide.
        show(direction) {
            return this.toggle('show', direction);
        }
        // Show/Hide the slide.
        toggle(action, direction) {
			// Hide/Show revealer on top of the image and move the image, title and number.
            return new Promise((resolve, reject) => {
				let revealerOpts = {
					delay: action === 'hide' ? 0 : this.config.animation.duration/2,
					ease: this.config.animation.ease,
					onComplete: resolve
				};

				const commonOpts = {
					delay: action === 'hide' ? 0 : this.config.animation.duration/2,
					ease: this.config.animation.ease,
					opacity: action === 'hide' ? 0 : 1
				};
				let imgOpts = Object.assign({},commonOpts);
				let numberOpts = Object.assign({},commonOpts);
				let titleOpts = Object.assign({},commonOpts);

				if ( direction === 'left' || direction === 'right' ) {
					revealerOpts.startAt = action === 'hide' ? {x: direction === 'left' ? '-100%' : '100%', y:'0%'} : {x: '0%', y:'0%'};
					revealerOpts.x = action === 'hide' ? '0%' : direction === 'left' ? '100%' : '-100%';
					imgOpts.startAt = action === 'show' ? {opacity: 0, x: direction === 'left' ? '-20%' : '20%'} : {};
					imgOpts.x = action === 'hide' ? direction === 'left' ? '20%' : '-20%' : '0%';
					titleOpts.startAt = action === 'show' ? {opacity: 1, scale: 0.2, x: direction === 'left' ? '-200%' : '200%'} : {};
					titleOpts.x = action === 'hide' ? direction === 'left' ? '200%' : '-200%' : '0%';
					titleOpts.scale = action === 'hide' ? 0.2 : 1;
					numberOpts.startAt = action === 'show' ? {opacity: 1, x: direction === 'left' ? '-50%' : '50%'} : {};
					numberOpts.x = action === 'hide' ? direction === 'left' ? '50%' : '-50%' : '0%';
				}
				else {
					revealerOpts.startAt = action === 'hide' ? {x:'0%', y: direction === 'down' ? '-100%' : '100%'} : {x:'0%', y: '0%'};
					revealerOpts.y = action === 'hide' ? '0%' : direction === 'down' ? '100%' : '-100%';
					imgOpts.startAt = action === 'show' ? {opacity: 1, y: direction === 'down' ? '-10%' : '10%'} : {};
					imgOpts.y = action === 'hide' ? direction === 'down' ? '10%' : '-10%' : '0%';
					titleOpts.ease = this.config.animation.ease,
					titleOpts.startAt = action === 'show' ? {opacity: 1, y: direction === 'down' ? '-100%' : '100%'} : {};
					titleOpts.y = action === 'hide' ? direction === 'down' ? '100%' : '-100%' : '0%';
				}

				// Toggling the revealer.
				TweenMax.to(this.DOM.revealer, this.config.animation.duration, revealerOpts);
				// Moving & fading the image (wrappper).
				TweenMax.to(this.DOM.imgWrap, this.config.animation.duration, imgOpts);
				// Moving & fading the title and number.
				TweenMax.to(this.DOM.title, this.config.animation.duration*1.5, titleOpts);
				TweenMax.to(this.DOM.number, this.config.animation.duration, numberOpts);
            });
		}
		// Hide the preview element.
		hidePreview(delay) {
			return this.togglePreview('hide');
		}
		// Show the preview element.
		showPreview(delay) {
			return this.togglePreview('show');
		}
		// Show/Hide the preview.
		togglePreview(action) {
			return new Promise((resolve, reject) => {
				// Hide/Show revealer.
				TweenMax.to(this.DOM.preview.revealer, this.config.animation.duration, {
					delay: action === 'hide' ? 0 : this.config.animation.duration/2,
					ease: this.config.animation.ease,
					startAt: action === 'hide' ? {x:'0%', y:'-100%'} : {x:'0%', y:'0%'},
					y: action === 'hide' ? '0%' : '-100%',
					onComplete: resolve
				});
				// Move and fade the image wrapper.
				TweenMax.to(this.DOM.preview.imgWrap, this.config.animation.duration, {
					delay: action === 'hide' ? 0 : this.config.animation.duration/2,
					ease: this.config.animation.ease,
					startAt: action === 'hide' ? {} : {opacity: 0, y: '20%'},
					y: action === 'hide' ? '20%' : '0%',
					opacity: action === 'hide' ? 0 : 1
				});
				// Move and fade the title and content.
				TweenMax.to([this.DOM.preview.title,this.DOM.preview.content], this.config.animation.duration, {
					delay: action === 'hide' ? 0 : this.config.animation.duration/2,
					ease: this.config.animation.ease,
					startAt: action === 'hide' ? {} : {opacity: 0, y: '200%'},
					y: action === 'hide' ? '200%' : '0%',
					opacity: action === 'hide' ? 0 : 1
				});
			});
		}
    }

    // The Slideshow class.
    class Slideshow {
        constructor(el) {
			this.DOM = {el: el};
			// Navigation controls (prev, next and preview ctrls)
			this.DOM.prevCtrl = this.DOM.el.querySelector('.slidenav__item--prev');
			this.DOM.nextCtrl = this.DOM.el.querySelector('.slidenav__item--next');
			this.DOM.previewCtrl = this.DOM.el.querySelector('.slidenav__preview');
			// The slides.
            this.slides = [];
            Array.from(this.DOM.el.querySelectorAll('.slide')).forEach(slideEl => this.slides.push(new Slide(slideEl)));
            // The total number of slides.
            this.slidesTotal = this.slides.length;
            // Current slide position.
            this.current = 0;
			// initialize the slideshow.
			this.init();
		}
		// init: set the current slide and initialize some events..
        init() {
			this.slides[this.current].setCurrent();
			this.initEvents();
		}
		initEvents() {
			this.DOM.prevCtrl.addEventListener('click', () => this.prev());
			this.DOM.nextCtrl.addEventListener('click', () => this.next());
			this.DOM.previewCtrl.addEventListener('click', (ev) => {
				if ( this.isAnimating ) return;
				if ( ev.target.classList.contains('slidenav__preview--open') ) {
					ev.target.classList.remove('slidenav__preview--open');
					this.exitPreview();
				}
				else {
					ev.target.classList.add('slidenav__preview--open')
					this.enterPreview();
				}
			});
		}
		prev() {
			this.navigate('left');
		}
		next() {
			this.navigate('right');
		}
		enterPreview() {
			this.togglePreview('enter');
		}
		exitPreview() {
			this.togglePreview('exit');
		}
		togglePreview(action) {
			// If animating return.
            if ( this.isAnimating ) return;
			this.isAnimating = true;
			
			const processing = action === 'enter' ? 
					[this.slides[this.current].hide('up'), this.slides[this.current].showPreview()] :
					[this.slides[this.current].show('down'), this.slides[this.current].hidePreview()];

			// Hide the next/prev controls.
			this.toggleNavCtrls(action);

			Promise.all(processing).then(() => this.isAnimating = false);
		}
		toggleNavCtrls(action) {
			TweenMax.to([this.DOM.prevCtrl, this.DOM.nextCtrl], 0.5, {
				ease: 'Expo.easeOut',
				opacity: action === 'enter' ? 0 : 1,
				onStart: () => this.DOM.prevCtrl.style.pointerEvents = this.DOM.nextCtrl.style.pointerEvents = action === 'enter' ? 'none' : 'auto'
			});
		}
		// Navigate the slideshow.
        navigate(direction) {
            // If animating return.
            if ( this.isAnimating ) return;
            this.isAnimating = true;

            const nextSlidePos = direction === 'right' ? 
                    this.current < this.slidesTotal-1 ? this.current+1 : 0 :
                    this.current > 0 ? this.current-1 : this.slidesTotal-1;
			
			Promise.all([this.slides[this.current].hide(direction), this.slides[nextSlidePos].show(direction)])
				   .then(() => {
						// Update current.
						this.slides[this.current].setCurrent(false);
						this.current = nextSlidePos;
						this.isAnimating = false;
						this.slides[this.current].setCurrent();
				   });
		}
    }

	const slideshow = new Slideshow(document.querySelector('.slideshow'));
	
    // Preload all the images in the page..
    imagesLoaded(document.querySelectorAll(['.slide__img','.preview__img']), {background: true}, () => {
        document.body.classList.remove('loading');
    });
}
