(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Alt"] = factory();
	else
		root["Alt"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	import React from 'react';
	import createReactClass from 'create-react-class';

	// @todo Where to get these from?
	const isFunction = x => typeof x === 'function';
	const eachObject = (f, o) => {
	  o.forEach(from => {
	    Object.keys(Object(from)).forEach(key => {
	      f(key, from[key]);
	    });
	  });
	};
	const assign = (target, ...source) => {
	  eachObject((key, value) => target[key] = value, source);
	  return target;
	};

	function connectToStores(Spec, Component = Spec) {
	  // Check for required static methods.
	  if (!isFunction(Spec.getStores)) {
	    throw new Error('connectToStores() expects the wrapped component to have a static getStores() method');
	  }
	  if (!isFunction(Spec.getPropsFromStores)) {
	    throw new Error('connectToStores() expects the wrapped component to have a static getPropsFromStores() method');
	  }

	  const StoreConnection = createReactClass({
	    displayName: 'StoreConnection',

	    getInitialState() {
	      return Spec.getPropsFromStores(this.props, this.context);
	    },

	    componentWillReceiveProps(nextProps) {
	      this.setState(Spec.getPropsFromStores(nextProps, this.context));
	    },

	    componentDidMount() {
	      const stores = Spec.getStores(this.props, this.context);
	      this.storeListeners = stores.map(store => {
	        return store.listen(this.onChange);
	      });
	      if (Spec.componentDidConnect) {
	        Spec.componentDidConnect(this.props, this.context);
	      }
	    },

	    componentWillUnmount() {
	      this.storeListeners.forEach(unlisten => unlisten());
	    },

	    onChange() {
	      this.setState(Spec.getPropsFromStores(this.props, this.context));
	    },

	    render() {
	      return React.createElement(Component, assign({}, this.props, this.state));
	    }
	  });

	  return StoreConnection;
	}

	export default connectToStores;

/***/ })
/******/ ])
});
;