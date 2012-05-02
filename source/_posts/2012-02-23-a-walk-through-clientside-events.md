## An exercise in event based programming

### Events in the wild

Describe Event Based architectures, and list off patterns.  
- Mediator Pattern  
- Hollywood Pattern

The DOM has built in events on elements  
- the DOM is a bad place to store you logical code.  
- DOM events should act as relays to a more ubiquitous event handling system

- [Scalable JavaScript Application Architecture](http://www.youtube.com/watch?v=vXjVFPosQHw) by [Nicholas Zakas](https://twitter.com/slicknet)  

- [Addy Osmani](http://twitter.com/addyosmani) expands on Zakas's talk in [Pattens for Large-Scale JavaScript Application Architecture](http://addyosmani.com/largescalejavascript).  

- [Modules and Callbacks: Going Hollywood with Mootools](http://keetology.com/blog/2010/10/01/modules-and-callbacks-going-hollywood-with-mootools) by [Mark Obcena](https://twitter.com/keeto)   

### The Goals
- Decouple objects
- Provide consistency and transparency

### Basic Event Structure
For simplicity's sake, we're going to place our Mediator object in the global space and we're going to assume some ES5 methods are available.

- ##### Mediator#addEvent  
We need a way to queue up events 

- ##### Mediator#removeEvent
- ##### Mediator#fireEvent  

Some Description:  
	
	(function (win, undefined) {

		function remove (from, to) {
	  		var rest = this.slice((to || from) + 1 || this.length);
	  		this.length = from < 0 ? this.length + from : from;
	  		return this.push.apply(this, rest);
		}
	
		win.Mediator = {
			_events: {}
			addEvent: function (key, fn) {
				var event = _events[key] || [];
				event.push(fn);
			},
			removeEvent: function (key, fn) {
				var event = _events[key];
				if(event === undefined) {
					event.forEach(function(func, i){
						if(func === fn) {
							event = remove.call(event,i); 
						}
					})
				}
			},
			fireEvents: function (key) {
				var args = Array.prototype.slice.call(arguments, 1),
					event = this._events[key];
				if(event === undefined) {
					event.forEach(function(fn,i) {
						fn.apply(this,args);
					});
				}
			}
		};
	}(window));

#### Drawbacks of using `Mock` events


### Latched Events

- Examples of native latched events
- When you want to latch an event
- Code examples  

Something

	Mediator.addEvent('DOM.ready', function() {
	
	});

### Compound Events

	Mediator.addEvent(['DOM.ready','FB.ready'], function() {
	
	});

### A Practical Example
