var panels = [];
var xyPanel;
function handleSliderEvent (context) {
	if(context.isTouched) { 
		console.log(context.value);
	}
}

function handleXYEvent (context) {
	if(context.isTouched) { 
		console.log(context.values[0]);
		// context.label = context.value;
		// context.refresh();
	}
}

function handleButtonEvent (context) {
	context.value ? console.log("Button Activated") : console.log("Button Deactivated");
}


function initControls () {
	var primaryColour = "#00c5a8";
	var secondaryColour = "#0e2d27";

	var yearButtonsPanel = $('.year-buttons');
		

	//First add all the year buttons
	var buttonLabels = ['2004','2005','2006','2007','2008','2009','2010','2011','2012','2013','2014','2015'];
	for(var i = 0; i < buttonLabels.length; i++ ) {
		yearButtonsPanel.eq(i).css("height",yearButtonsPanel.eq(0).width());
		var panel = new Interface.Panel({ useRelativeSizesAndPositions:true, container:yearButtonsPanel[i] });
		var button = new Interface.Button({
			bounds: [0,0,1,1],
			label: buttonLabels[i],
			stroke: "white",
		    fill: primaryColour,
		    background: secondaryColour,
		    ontouchmousedown: function() {handleButtonEvent(this)}
		});
		panel.add(button);
		panels.push(panel);
	};


	// Now add additional buttons
	var waterBtn = $('#emit-water-btn');
	var btnPanel = new Interface.Panel({ useRelativeSizesAndPositions:true, container: waterBtn});
	btnPanel.add(new Interface.Button({
		bounds: [0,0,1,1],
		label: "Emit Water",
		stroke: "white",
	    fill: primaryColour,
	    background: secondaryColour,
	    ontouchmousedown: function() {handleButtonEvent(this)}
	}));
	panels.push(btnPanel);



	// Add slider panel
	var sliderPanelSelector = $('#slider');
	var sliderPanel = new Interface.Panel({ useRelativeSizesAndPositions:true, container:sliderPanelSelector});
	sliderPanel.add(new Interface.Slider({
	    bounds: [0,0,1,1],
	    ontouchmousedown: function() { this.isTouched = true },
	    ontouchmousemove: _.throttle(function(){handleSliderEvent(this)},300),
	    ontouchmouseup: function() {this.isTouched = false;},
	    label: "Size",
	    stroke: "white",
	    fill: primaryColour,
	    background: secondaryColour,    
	}))
	panels.push(sliderPanel);


	// Add XY Pad
	var xySelector = $('#xy');
	xyPanel = new Interface.Panel({ useRelativeSizesAndPositions:true, container:xySelector});
	xyPanel.add(new Interface.XY({
		bounds: [0,0,1,1],
		numChildren: 1,
		friction: 0,
		childWidth: 10,
		stroke: "#00c5a8",
	    fill: "#00c5a8",
	    background: secondaryColour,
	    label: "Gravity Direction",
	    ontouchmousedown: function() { this.isTouched = true },
	    ontouchmousemove: _.throttle(function(){handleXYEvent(this)},300),
	    ontouchmouseup: function() {this.isTouched = false;},
	}));
	panels.push(xyPanel);

};
initControls();

// In case client resizes window
function resizeInterface() {
	var i;
	for( i = 0; i < panels.length; i++ ) {
		panels[i].redoBoundaries();
	}
}

// Debounce the resizing of window: limits updates
var lazyLayout = _.debounce(resizeInterface,300);
$(window).resize(lazyLayout);

