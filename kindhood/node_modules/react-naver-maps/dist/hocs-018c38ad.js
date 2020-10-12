'use strict';

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var createReactContext = _interopDefault(require('create-react-context'));
var React = _interopDefault(require('react'));
var PropTypes = _interopDefault(require('prop-types'));
var recompose = require('recompose');
var camelCase = _interopDefault(require('lodash.camelcase'));
var shallowequal = _interopDefault(require('shallowequal'));
var hoistNonReactStatics = _interopDefault(require('hoist-non-react-statics'));
var warning = _interopDefault(require('warning'));
var invariant = _interopDefault(require('invariant'));
var ResizeDetector = _interopDefault(require('react-resize-detector'));

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _possibleConstructorReturn(self, call) {
  if (call && (typeof call === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}

var MapContext = createReactContext(null);
var Provider = MapContext.Provider;
var Consumer = MapContext.Consumer;

var pick = function pick(keys) {
  return function (props) {
    return keys.reduce(function (ret, key) {
      /* eslint-disable no-param-reassign */
      if (props[key] !== undefined) {
        ret[key] = props[key];
      }

      return ret;
      /* eslint-enable no-param-reassign */
    }, {});
  };
};

var propsListenerNameCache = {};

function generateEventLookup(naverEventNames) {
  return naverEventNames.reduce(function (ret, eventName) {
    // first find cached propsListerName
    if (!propsListenerNameCache[eventName]) {
      propsListenerNameCache[eventName] = camelCase("on_".concat(eventName));
    } // propsListener is event listener defined on props. (user input)


    var propsListenerName = propsListenerNameCache[eventName];
    return _objectSpread({}, ret, _defineProperty({}, propsListenerName, eventName));
  }, {});
}
/**
 * Managing Naver Event Handlers. KVO instance must be registered
 * in the child component by props.registerEventInstance
 * @param {*} WrappedComponent
 */


var bridgeEventHandlers = function bridgeEventHandlers(WrappedComponent) {
  var Wrapper =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Wrapper, _React$Component);

    function Wrapper(props) {
      var _this;

      _classCallCheck(this, Wrapper);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Wrapper).call(this, props));
      _this.naverListeners = {};
      _this.naverEventLookup = {};
      _this.handlingPropNames = [];
      _this.registerEventInstance = _this.registerEventInstance.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Wrapper, [{
      key: "componentDidMount",
      value: function componentDidMount() {
        this.updateLookup();
        this.updateListeners();
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        var shouldUpdateLookup = this.shouldLookupUpdate(prevProps);

        if (shouldUpdateLookup) {
          this.updateLookup();
        }

        if (shouldUpdateLookup || this.shouldListenersUpdate(prevProps)) {
          this.updateListeners();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        var _this2 = this;

        Object.values(this.naverListeners).forEach(function (listener) {
          _this2.unlisten(listener);
        });
      }
    }, {
      key: "shouldLookupUpdate",
      value: function shouldLookupUpdate(prevProps) {
        return prevProps.events !== this.props.events && !shallowequal(prevProps.events, this.props.events);
      }
    }, {
      key: "updateLookup",
      value: function updateLookup() {
        this.naverEventLookup = generateEventLookup(this.props.events);
        this.handlingPropNames = Object.keys(this.naverEventLookup);
        this.pickHandlers = pick(this.handlingPropNames);
      }
    }, {
      key: "shouldListenersUpdate",
      value: function shouldListenersUpdate(prevProps) {
        return !shallowequal(this.pickHandlers(prevProps), this.pickHandlers(this.props));
      }
    }, {
      key: "updateListeners",
      value: function updateListeners() {
        var _this3 = this;

        var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.props;
        // prepare new naver listeners
        var prevNaverListeners = this.naverListeners;
        this.naverListeners = {};
        var orphans = {};
        var updateds = {};
        this.handlingPropNames.forEach(function (propName) {
          var handler = props[propName];

          if (prevNaverListeners[propName]) {
            var prevNaverListener = prevNaverListeners[propName];
            var prevHandler = prevNaverListener.listener; // handler unchanged

            if (prevHandler === handler) {
              _this3.naverListeners[propName] = prevNaverListeners[propName]; // handler changed
            } else {
              orphans[propName] = prevNaverListener;
              updateds[propName] = handler;
            } // new handler

          } else if (handler) {
            updateds[propName] = handler;
          }
        }); // listen updated handlers

        Object.keys(updateds).forEach(function (updatedPropName) {
          var evt = _this3.getEventByHandlerName(updatedPropName);

          _this3.naverListeners[updatedPropName] = _this3.listen(evt, updateds[updatedPropName]);
        }); // unlisten orphan handlers

        Object.values(orphans).forEach(function (orphan) {
          _this3.unlisten(orphan);
        });
      }
    }, {
      key: "getEventByHandlerName",
      value: function getEventByHandlerName(handlerName) {
        return this.naverEventLookup[handlerName];
      }
    }, {
      key: "registerEventInstance",
      value: function registerEventInstance(instance) {
        warning(!this.instance, 'react-naver-maps: bridgeEventHandlers - Tried to Change instance.');
        invariant(instance, "react-naver-maps: bridgeEventHandlers - required naver instance, but ".concat(instance));
        this.instance = instance;
        if (this.props.registerEventInstance) this.props.registerEventInstance(instance);
      }
    }, {
      key: "listen",
      value: function listen(eventName, listener) {
        var navermaps = this.props.navermaps;
        invariant(navermaps, 'props.navermaps required');
        invariant(this.instance, 'may be forgot to call registerEventInstance');
        return navermaps.Event.addListener(this.instance, eventName, listener);
      }
    }, {
      key: "unlisten",
      value: function unlisten(listener) {
        var navermaps = this.props.navermaps;
        navermaps.Event.removeListener(listener);
      }
    }, {
      key: "render",
      value: function render() {
        return React.createElement(WrappedComponent, _extends({}, this.props, {
          registerEventInstance: this.registerEventInstance
        }));
      }
    }]);

    return Wrapper;
  }(React.Component);

  Wrapper.displayName = recompose.wrapDisplayName(WrappedComponent, 'bridgeEventHandlers');
  hoistNonReactStatics(Wrapper, WrappedComponent);
  Wrapper.defaultProps = _objectSpread({}, WrappedComponent.defaultProps);
  Wrapper.propTypes = {
    events: PropTypes.arrayOf(PropTypes.string),
    registerEventInstance: PropTypes.func,
    navermaps: PropTypes.object
  };
  return Wrapper;
};

var namedWrapper = function namedWrapper(displayName) {
  return function (WrappedComponent) {
    var Wrapper = function Wrapper(props) {
      return React.createElement(WrappedComponent, props);
    };

    Wrapper.displayName = displayName;
    return Wrapper;
  };
};

/**
 * inject navermaps to WrappedComponent.
 * use props.navermaps or window.naver.maps
 * if there is no naver maps module, raise.
 * @param {*} WrappedComponent
 */

var withNavermaps = function withNavermaps(WrappedComponent) {
  var Navermaps =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Navermaps, _React$Component);

    function Navermaps(props) {
      var _this;

      _classCallCheck(this, Navermaps);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Navermaps).call(this, props));

      var navermaps = _this.getNavermaps();

      invariant(navermaps, 'props.navermaps or window.naver.maps is required.');
      return _this;
    }

    _createClass(Navermaps, [{
      key: "getNavermaps",
      value: function getNavermaps() {
        return this.props.navermaps || window.naver && window.naver.maps;
      }
    }, {
      key: "render",
      value: function render() {
        var navermaps = this.getNavermaps();
        return React.createElement(WrappedComponent, _extends({}, this.props, {
          navermaps: navermaps
        }));
      }
    }]);

    return Navermaps;
  }(React.Component);

  Navermaps.displayName = recompose.wrapDisplayName(WrappedComponent, 'withNavermaps');
  Navermaps.propTypes = {
    navermaps: PropTypes.object
  };
  hoistNonReactStatics(Navermaps, WrappedComponent);
  return Navermaps;
};

var injectNaverRef = function injectNaverRef(WrappedComponent) {
  function Wrapper(_ref) {
    var naverRef = _ref.naverRef,
        restProps = _objectWithoutProperties(_ref, ["naverRef"]);

    return React.createElement(WrappedComponent, _extends({}, restProps, {
      ref: naverRef
    }));
  }

  Wrapper.displayName = recompose.wrapDisplayName(WrappedComponent, 'injectNaverRef');
  Wrapper.defaultProps = _objectSpread({}, WrappedComponent.defaultProps);
  Wrapper.propTypes = {
    naverRef: PropTypes.oneOfType([PropTypes.func, PropTypes.shape({
      current: PropTypes.instanceOf(Element)
    })])
  };
  hoistNonReactStatics(Wrapper, WrappedComponent);
  return Wrapper;
};

var autoResize = function autoResize(WrappedComponent) {
  var Wrapper =
  /*#__PURE__*/
  function (_React$Component) {
    _inherits(Wrapper, _React$Component);

    function Wrapper(props) {
      var _this;

      _classCallCheck(this, Wrapper);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(Wrapper).call(this, props));
      _this.state = {
        style: {
          width: '100%',
          height: '100%'
        }
      };
      _this.handleResize = _this.handleResize.bind(_assertThisInitialized(_this));
      return _this;
    }

    _createClass(Wrapper, [{
      key: "handleResize",
      value: function handleResize(width, height) {
        this.setState({
          size: {
            width: width,
            height: height
          }
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this$props = this.props,
            id = _this$props.id,
            className = _this$props.className,
            style = _this$props.style,
            restProps = _objectWithoutProperties(_this$props, ["id", "className", "style"]);

        return React.createElement("div", {
          id: id,
          className: className,
          style: style
        }, React.createElement(WrappedComponent, _extends({}, restProps, {
          id: "wrapped-".concat(id),
          style: this.state.style,
          size: this.state.size
        })), React.createElement(ResizeDetector, {
          handleWidth: true,
          handleHeight: true,
          onResize: this.handleResize,
          refreshMode: "debounce",
          refreshRate: 100
        }));
      }
    }], [{
      key: "getDerivedStateFromProps",
      value: function getDerivedStateFromProps(props, state) {
        if (props.size) {
          return _objectSpread({}, state, {
            size: props.size
          });
        }

        return null;
      }
    }]);

    return Wrapper;
  }(React.Component);

  Wrapper.propTypes = {
    id: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object
  };
  Wrapper.displayName = recompose.wrapDisplayName(WrappedComponent, 'autoResize');
  hoistNonReactStatics(Wrapper, WrappedComponent);
  return Wrapper;
};

/**
 * inject context 'map'
 * @param {*} WrappedComponent
 */

var withMap = function withMap(WrappedComponent) {
  function Wrapper(props) {
    return React.createElement(MapContext.Consumer, null, function (map) {
      return React.createElement(WrappedComponent, _extends({}, props, {
        map: map
      }));
    });
  }

  Wrapper.displayName = recompose.wrapDisplayName(WrappedComponent, 'withMap');
  return Wrapper;
};

exports._objectSpread = _objectSpread;
exports._classCallCheck = _classCallCheck;
exports._createClass = _createClass;
exports._possibleConstructorReturn = _possibleConstructorReturn;
exports._getPrototypeOf = _getPrototypeOf;
exports._inherits = _inherits;
exports.MapContext = MapContext;
exports.pick = pick;
exports.withNavermaps = withNavermaps;
exports.bridgeEventHandlers = bridgeEventHandlers;
exports.injectNaverRef = injectNaverRef;
exports.withMap = withMap;
exports._extends = _extends;
exports.namedWrapper = namedWrapper;
exports.autoResize = autoResize;
