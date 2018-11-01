"use strict";

function Counter(name, listener) {
	this.count = 0;
	this.name = name;
    this.listener = listener;
}
Counter.prototype.setCount = function(count) {
	this.count = count;
    this.listener(this);
};
Counter.prototype.increment = function() {
	this.setCount(this.count+1);
};
Counter.prototype.decrement = function() {
	this.setCount(this.count-1);
};

// counter for tabs in current window; not using increment/decrement

function CurrentTabCounter(listener) {
	Counter.call(this,"CurrentTabs",listener);
	var self = this;
	chrome.tabs.query({currentWindow:true}, function(tabs) {
		self.setCount(tabs.length);
	});
	chrome.windows.onFocusChanged.addListener(function(tab) {
		chrome.tabs.query({currentWindow:true}, function(tabs) {
			self.setCount(tabs.length);
		});});
	chrome.tabs.onCreated.addListener(function(tab) {
		chrome.tabs.query({currentWindow:true}, function(tabs) {
			self.setCount(tabs.length);
		});});
	chrome.tabs.onRemoved.addListener(function(tab) {
		chrome.tabs.query({currentWindow:true}, function(tabs) {
			self.setCount(tabs.length);
		});});
}
CurrentTabCounter.prototype = new Counter();

// counter for tabs in all windows; using increment/decrement

function AllTabCounter(listener) {
	Counter.call(this,"AllTabs",listener);
	var self = this;
	chrome.tabs.query({}, function(tabs) {
		self.setCount(tabs.length);
	});
	chrome.tabs.onCreated.addListener(self.increment.bind(self));
	chrome.tabs.onRemoved.addListener(self.decrement.bind(self));
}
AllTabCounter.prototype = new Counter();

// counter for windows; using increment/decrement

function WindowCounter(listener) {
	Counter.call(this,"Windows",listener);
	var self = this;
	chrome.windows.getAll(function(windows) {
		self.setCount(windows.length);
	});
	chrome.windows.onCreated.addListener(self.increment.bind(self));
	chrome.windows.onRemoved.addListener(self.decrement.bind(self));
}
WindowCounter.prototype = new Counter();

// generating badge text and tooltip

function onUpdate() {
    var text = "",
        title = mode;

		if(mode === "CurrentTabs") {
        text += counters.CurrentTabs.count;
				title = "Tabs in current window: ";
				title += counters.CurrentTabs.count;
    }
		if(mode === "AllTabs") {
        text += counters.AllTabs.count;
				title = "Tabs in all windows: ";
				title += counters.AllTabs.count;
    }
    if(mode === "Both") {
				text += counters.AllTabs.count;
        text += "/";
				text += counters.Windows.count;
        title = "Tabs over Windows: ";
				title += counters.AllTabs.count;
				title += "/";
				title += counters.Windows.count;
    }
    if(mode === "Windows") {
        text += counters.Windows.count;
				title += ": ";
				title += counters.Windows.count;
    }
    chrome.browserAction.setBadgeText({text: text});
    chrome.browserAction.setTitle({title: title});
		chrome.browserAction.setBadgeBackgroundColor({ "color": [89, 65, 0, 225] });
}

const counters = {
		"CurrentTabs": new CurrentTabCounter(onUpdate),
		"AllTabs": new AllTabCounter(onUpdate),
    "Windows": new WindowCounter(onUpdate)
}
const modes = Object.keys(counters).concat(["Both"]);
var mode = modes[0];


chrome.browserAction.onClicked.addListener(function() {
	const nextIndex = (modes.indexOf(mode)+1)%modes.length;
    mode = modes[nextIndex];
	onUpdate();
});
onUpdate();
