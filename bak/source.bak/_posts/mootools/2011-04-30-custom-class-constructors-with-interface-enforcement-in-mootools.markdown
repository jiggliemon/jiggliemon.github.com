Chris Pojer's Interface class mutates a class, and inforces a well architected interface on your class.  The Interface is checked when the class's "initialize" method is run. What we're doing here is attaching a pre-defined interface to a new `Module` constructor.  This module constructor ensures that the `namespace` property is declared - an is a string; Also it states that `theother` property is a function.  This is how I enforce a particular class structure on the rest of the team for large scal projects.
  
  
For more information on this particular Interface mixin, look at <a href="http://cpojer.net/MooTools/interface/Demos/Example.js" target="_blank">this example</a> and download Chris Pojer's interface <a href="https://github.com/cpojer/mootools-interface" target="_blank">here</a>.
  

	var TheModuleInterface = new Interface({
	      namespace: String,
	      theother: Function
	});
	
	var Module = new Type('Module', function (params){
	    // Mind the order.  Your Interface needs to be the first argument when appending.
	    params = Object.append({ Interface: TheModuleInterface }, params || {} ) ;
	    return new Class(params);
	});
	
	var aModuleInstance = new Module({
	    theother: "some string",
	    namespace: {some:'object'},
	    initialize: function(){
	        // Remember your module needs an initialize method...
	    }
	});
	var theMod = new Mod(); // Uncaught Error: Property "namespace" is implemented but not an instance of "String"

