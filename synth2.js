$.getScript('http://web.media.mit.edu/~ericr/scratch-extensions/synth/timbre.js', function()
{


(function(ext) {

	var currentFreq = 440;
	var glide = T("param", {value:currentFreq});  
	var osc = T("osc", {wave:"sin", freq:glide});
	var env  = T("adsr", {a:50, d:1500, s:0.75, r:50}, osc);
	var delayTime = T("param", {value:"100ms"});
	var del = T("delay", {time:delayTime, fb:0.4, mix:0}, env).play();
	/* var reverb = T("reverb", {room:0.9, damp:0.2, mix:0.45}, del).play(); */
	 
	
	ext.setWaveType = function(wave) {
		osc.wave = wave;
	}
	
	ext.waveOn = function() {
		env.bang();
	}
	
	/* ext.loadURL = function(url) {
		window.location = url;
		return false;
	} */	

	ext.waveOff = function() {
		env.release();
	}	

	ext.waveSetFreq = function(f) {
	    glide.linTo(f, "100ms");
		currentFreq = f;
	}	
	
	ext.setDelaySecs = function(secs) {
		if (secs > 0) {			
			delayTime.set({value:secs*1000});
			del.set({mix:0.25});
		} else {
			del.set({mix:0});
		}
	}
	
	/* ext.setReverbParams = function(room, damp, mix) {
		reverb.room = room;
		reverb.damp = damp;
		reverb.mix = mix;
	} */

	ext.resetAll = ext.waveOff;

    ext._shutdown = ext.waveOff;
    
    ext._getStatus = function() {
        return {status: 2, msg: 'connected'};
    }

    var descriptor = {
        blocks: [
        	[' ', 'wave on',						'waveOn'],
        	[' ', 'wave off',						'waveOff'],
        	/* [' ', 'load website %s',				'loadURL', "http://www.nyu.edu/projects/ruthmann/CMSD/piano"], */
        	[' ', 'wave frequency %n',				'waveSetFreq', 440],
        	[' ', 'set wave type %m.waveType',		'setWaveType', "sin"],
        	[' ', 'delay effect %n secs',			'setDelaySecs', 0.5]
        	/* [' ', 'reverb effect %n room  %n damp %n mix',	'setReverbParams', 0.9, 0.2, 0.45] */
        	        ],
        menus: {
        	waveType: ['sin', 'saw','tri', 'pulse', 'fami'],
        },
        url: ''
    };
    ScratchExtensions.register('synth test 2', descriptor, ext);
})({});

});