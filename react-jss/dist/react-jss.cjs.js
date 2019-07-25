'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var _extends = _interopDefault(require('@babel/runtime/helpers/extends'));
var _inheritsLoose = _interopDefault(require('@babel/runtime/helpers/inheritsLoose'));
var _objectWithoutPropertiesLoose = _interopDefault(require('@babel/runtime/helpers/objectWithoutPropertiesLoose'));
var React = require('react');
var React__default = _interopDefault(React);
var hoistNonReactStatics = _interopDefault(require('hoist-non-react-statics'));
var theming = require('theming');
var warning = _interopDefault(require('tiny-warning'));
var defaultJss$1 = require('jss');
var defaultJss$1__default = _interopDefault(defaultJss$1);
var preset = _interopDefault(require('jss-preset-default'));
var isInBrowser = _interopDefault(require('is-in-browser'));
var PropTypes = _interopDefault(require('prop-types'));
var shallowEqual = require('shallow-equal');
var isPropValid = _interopDefault(require('@emotion/is-prop-valid'));
var defaultCss = _interopDefault(require('css-jss'));

var getDisplayName = (function (Component) {
  return Component.displayName || Component.name || 'Component';
});

var memoize = function memoize(fn) {
  var lastArgs;
  var lastResult;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (Array.isArray(lastArgs) && args.length === lastArgs.length) {
      var isSame = true;

      for (var i = 0; i < args.length; i++) {
        if (args[i] !== lastArgs[i]) {
          isSame = false;
        }
      }

      if (isSame) {
        return lastResult;
      }
    }

    lastArgs = args;
    lastResult = fn.apply(void 0, args);
    return lastResult;
  };
};

function mergeClasses(baseClasses, additionalClasses) {
  var combinedClasses = _extends({}, baseClasses);

  for (var name in additionalClasses) {
    combinedClasses[name] = name in combinedClasses ? combinedClasses[name] + " " + additionalClasses[name] : additionalClasses[name];
  }

  return combinedClasses;
}

var JssContext = React__default.createContext({
  classNamePrefix: '',
  disableStylesGeneration: false
});

/**
 * Global index counter to preserve source order.
 * As we create the style sheet during componentWillMount lifecycle,
 * children are handled after the parents, so the order of style elements would
 * be parent->child. It is a problem though when a parent passes a className
 * which needs to override any childs styles. StyleSheet of the child has a higher
 * specificity, because of the source order.
 * So our solution is to render sheets them in the reverse order child->sheet, so
 * that parent has a higher specificity.
 *
 * We start at [Number.MIN_SAFE_INTEGER] to always insert sheets from react-jss first before any
 * sheet which might be inserted manually by the user.
 */
var index = Number.MIN_SAFE_INTEGER;

var getSheetIndex = function getSheetIndex() {
  return index++;
};

var defaultManagers = new Map();
var getManager = function getManager(context, managerId) {
  // If `managers` map is present in the context, we use it in order to
  // let JssProvider reset them when new response has to render server-side.
  if (context.managers) {
    if (!context.managers[managerId]) {
      context.managers[managerId] = new defaultJss$1.SheetsManager();
    }

    return context.managers[managerId];
  }

  var manager = defaultManagers.get(managerId);

  if (!manager) {
    manager = new defaultJss$1.SheetsManager();
    defaultManagers.set(managerId, manager);
  }

  return manager;
};
var manageSheet = function manageSheet(options) {
  var sheet = options.sheet,
      context = options.context,
      index = options.index,
      theme = options.theme;

  if (!sheet) {
    return;
  }

  var manager = getManager(context, index);
  manager.manage(theme);

  if (context.registry) {
    context.registry.add(sheet);
  }
};
var unmanageSheet = function unmanageSheet(options) {
  if (!options.sheet) {
    return;
  }

  var manager = getManager(options.context, options.index);
  manager.unmanage(options.theme);
};

var defaultJss = defaultJss$1.create(preset());

var sheetsMeta = new WeakMap();
var getMeta = function getMeta(sheet) {
  return sheetsMeta.get(sheet);
};
var addMeta = function addMeta(sheet, meta) {
  sheetsMeta.set(sheet, meta);
};

var getStyles = function getStyles(options) {
  var styles = options.styles;

  if (typeof styles !== 'function') {
    return styles;
  }

  process.env.NODE_ENV !== "production" ? warning(styles.length !== 0, "[JSS] <" + (options.name || 'Hook') + " />'s styles function doesn't rely on the \"theme\" argument. We recommend declaring styles as an object instead.") : void 0;
  return styles(options.theme);
};

function getSheetOptions(options, link) {
  var minify;

  if (options.context.id && options.context.id.minify != null) {
    minify = options.context.id.minify;
  }

  var classNamePrefix = options.context.classNamePrefix || '';

  if (options.name && !minify) {
    classNamePrefix += options.name.replace(/\s/g, '-') + "-";
  }

  var meta = '';
  if (options.name) meta = options.name + ", ";
  meta += typeof options.styles === 'function' ? 'Themed' : 'Unthemed';
  return _extends({}, options.sheetOptions, {
    index: options.index,
    meta: meta,
    classNamePrefix: classNamePrefix,
    link: link,
    generateId: options.context.generateId
  });
}

var createStyleSheet = function createStyleSheet(options) {
  if (options.context.disableStylesGeneration) {
    return undefined;
  }

  var manager = getManager(options.context, options.index);
  var existingSheet = manager.get(options.theme);

  if (existingSheet) {
    return existingSheet;
  }

  var jss = options.context.jss || defaultJss;
  var styles = getStyles(options);
  var dynamicStyles = defaultJss$1.getDynamicStyles(styles);
  var sheet = jss.createStyleSheet(styles, getSheetOptions(options, dynamicStyles !== null));
  addMeta(sheet, {
    dynamicStyles: dynamicStyles,
    styles: styles,
    dynamicRuleCounter: 0
  });
  manager.add(options.theme, sheet);
  return sheet;
};
var removeDynamicRules = function removeDynamicRules(sheet, rules) {
  // Loop over each dynamic rule and remove the dynamic rule
  // We can't just remove the whole sheet as this has all of the rules for every component instance
  for (var key in rules) {
    sheet.deleteRule(rules[key].key);
  }
};
var updateDynamicRules = function updateDynamicRules(data, sheet, rules) {
  // Loop over each dynamic rule and update it
  // We can't just update the whole sheet as this has all of the rules for every component instance
  for (var key in rules) {
    // $FlowFixMe
    sheet.update(rules[key].key, data);
  }
};
var addDynamicRules = function addDynamicRules(sheet, data) {
  var meta = getMeta(sheet);

  if (!meta) {
    return undefined;
  }

  var rules = {}; // Loop over each dynamic rule and add it to the stylesheet

  for (var key in meta.dynamicStyles) {
    var name = key + "-" + meta.dynamicRuleCounter++;
    var initialRuleCount = sheet.rules.index.length;
    var originalRule = sheet.addRule(name, meta.dynamicStyles[key]); // Loop through all created rules, fixes updating dynamic rules

    for (var i = initialRuleCount; i < sheet.rules.index.length; i++) {
      var rule = sheet.rules.index[i]; // $FlowFixMe: Not sure why flow has an issue here

      sheet.update(rule.key, data); // If it's the original rule, we need to add it by the correct key so the hook and hoc
      // can correctly concat the dynamic class with the static one

      rules[originalRule === rule ? key : rule.key] = rule;
    }
  }

  return rules;
};

var getSheetClasses = function getSheetClasses(sheet, dynamicRules) {
  if (!dynamicRules) {
    return sheet.classes;
  }

  var classes = {};
  var meta = getMeta(sheet);

  if (!meta) {
    return sheet.classes;
  }

  for (var key in meta.styles) {
    classes[key] = sheet.classes[key];

    if (key in dynamicRules) {
      classes[key] += " " + sheet.classes[dynamicRules[key].key];
    }
  }

  return classes;
};

var NoRenderer = function NoRenderer(props) {
  return props.children || null;
};

var noTheme = {};
/**
 * HOC creator function that wrapps the user component.
 *
 * `withStyles(styles, [options])(Component)`
 */

var withStyles = function withStyles(styles, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$index = _options.index,
      index = _options$index === void 0 ? getSheetIndex() : _options$index,
      theming$1 = _options.theming,
      injectTheme = _options.injectTheme,
      sheetOptions = _objectWithoutPropertiesLoose(_options, ["index", "theming", "injectTheme"]);

  var isThemingEnabled = typeof styles === 'function';
  var ThemeConsumer = theming$1 && theming$1.context.Consumer || theming.ThemeContext.Consumer;
  return function (InnerComponent) {
    if (InnerComponent === void 0) {
      InnerComponent = NoRenderer;
    }

    var displayName = getDisplayName(InnerComponent);

    var getTheme = function getTheme(props) {
      return isThemingEnabled ? props.theme : noTheme;
    };

    var WithStyles =
    /*#__PURE__*/
    function (_Component) {
      _inheritsLoose(WithStyles, _Component);

      // $FlowFixMe
      WithStyles.createState = function createState(props) {
        var sheet = createStyleSheet({
          styles: styles,
          theme: getTheme(props),
          index: index,
          name: displayName,
          context: props.jssContext,
          sheetOptions: sheetOptions
        });

        if (!sheet) {
          return {
            classes: {},
            dynamicRules: undefined,
            sheet: undefined
          };
        }

        var dynamicRules = addDynamicRules(sheet, props);
        return {
          sheet: sheet,
          dynamicRules: dynamicRules,
          classes: getSheetClasses(sheet, dynamicRules)
        };
      };

      WithStyles.manage = function manage(props, state) {
        var sheet = state.sheet;

        if (sheet) {
          manageSheet({
            sheet: sheet,
            index: index,
            context: props.jssContext,
            theme: getTheme(props)
          });
        }
      };

      WithStyles.unmanage = function unmanage(props, state) {
        var sheet = state.sheet,
            dynamicRules = state.dynamicRules;

        if (sheet) {
          unmanageSheet({
            context: props.jssContext,
            index: index,
            sheet: sheet,
            theme: getTheme(props)
          });

          if (dynamicRules) {
            removeDynamicRules(sheet, dynamicRules);
          }
        }
      };

      function WithStyles(props) {
        var _this;

        _this = _Component.call(this, props) || this;
        _this.mergeClassesProp = memoize(function (sheetClasses, classesProp) {
          return classesProp ? mergeClasses(sheetClasses, classesProp) : sheetClasses;
        });
        _this.state = WithStyles.createState(props);
        var registry = props.jssContext.registry;
        var sheet = _this.state.sheet;

        if (sheet && registry) {
          registry.add(sheet);
        }

        return _this;
      }

      var _proto = WithStyles.prototype;

      _proto.componentDidMount = function componentDidMount() {
        var props = this.props,
            state = this.state;

        if (props && state) {
          WithStyles.manage(props, state);
        }
      };

      _proto.componentDidUpdate = function componentDidUpdate(prevProps, prevState) {
        if (isThemingEnabled && this.props.theme !== prevProps.theme) {
          var newState = WithStyles.createState(this.props);
          WithStyles.manage(this.props, newState);
          WithStyles.unmanage(prevProps, prevState); // eslint-disable-next-line react/no-did-update-set-state

          this.setState(newState);
        } else if (this.state.sheet && this.state.dynamicRules) {
          // Only update the rules when we don't generate a new sheet
          updateDynamicRules(this.props, this.state.sheet, this.state.dynamicRules);
        }
      };

      _proto.componentWillUnmount = function componentWillUnmount() {
        WithStyles.unmanage(this.props, this.state);
      };

      _proto.render = function render() {
        var _this$props = this.props,
            innerRef = _this$props.innerRef,
            jssContext = _this$props.jssContext,
            theme = _this$props.theme,
            classes = _this$props.classes,
            rest = _objectWithoutPropertiesLoose(_this$props, ["innerRef", "jssContext", "theme", "classes"]);

        var sheetClasses = this.state.classes;

        var props = _extends({}, rest, {
          classes: this.mergeClassesProp(sheetClasses, classes)
        });

        if (innerRef) props.ref = innerRef;
        if (injectTheme) props.theme = theme;
        return React__default.createElement(InnerComponent, props);
      };

      return WithStyles;
    }(React.Component);

    WithStyles.displayName = "WithStyles(" + displayName + ")";
    WithStyles.defaultProps = _extends({}, InnerComponent.defaultProps);
    var JssContextSubscriber = React__default.forwardRef(function (props, ref) {
      return React__default.createElement(JssContext.Consumer, null, function (context) {
        if (isThemingEnabled || injectTheme) {
          return React__default.createElement(ThemeConsumer, null, function (theme) {
            return React__default.createElement(WithStyles, _extends({
              innerRef: ref,
              theme: theme
            }, props, {
              jssContext: context
            }));
          });
        }

        return React__default.createElement(WithStyles, _extends({
          innerRef: ref
        }, props, {
          jssContext: context,
          theme: noTheme
        }));
      });
    });
    JssContextSubscriber.displayName = 'JssContextSubscriber'; // $FlowFixMe - React's types should allow custom static properties on component.

    JssContextSubscriber.InnerComponent = InnerComponent;
    return hoistNonReactStatics(JssContextSubscriber, InnerComponent);
  };
};

var useEffectOrLayoutEffect = isInBrowser ? React__default.useLayoutEffect : React__default.useEffect;
var noTheme$1 = {};

var reducer = function reducer(prevState, action) {
  if (action.type === 'updateSheet') {
    return action.payload;
  }

  return prevState;
};

var createUseStyles = function createUseStyles(styles, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$index = _options.index,
      index = _options$index === void 0 ? getSheetIndex() : _options$index,
      theming$1 = _options.theming,
      name = _options.name,
      sheetOptions = _objectWithoutPropertiesLoose(_options, ["index", "theming", "name"]);

  var ThemeContext = theming$1 && theming$1.context || theming.ThemeContext;
  var useTheme = typeof styles === 'function' ? // $FlowFixMe
  function () {
    return React__default.useContext(ThemeContext) || noTheme$1;
  } : // $FlowFixMe
  function () {
    return noTheme$1;
  };
  return function useStyles(data) {
    var isFirstMount = React__default.useRef(true);
    var context = React__default.useContext(JssContext);
    var theme = useTheme();

    var _React$useReducer = React__default.useReducer(reducer, null, function () {
      var sheet = createStyleSheet({
        context: context,
        styles: styles,
        name: name,
        theme: theme,
        index: index,
        sheetOptions: sheetOptions
      });
      var dynamicRules;
      var classes;

      if (sheet) {
        if (context.registry) {
          context.registry.add(sheet);
        }

        dynamicRules = addDynamicRules(sheet, data);
        classes = getSheetClasses(sheet, dynamicRules);
      }

      return {
        sheet: sheet,
        dynamicRules: dynamicRules,
        classes: classes || {}
      };
    }),
        state = _React$useReducer[0],
        dispatch = _React$useReducer[1];

    useEffectOrLayoutEffect(function () {
      if (state.sheet) {
        manageSheet({
          index: index,
          context: context,
          sheet: state.sheet,
          theme: theme
        });
      }

      return function () {
        var sheet = state.sheet,
            dynamicRules = state.dynamicRules;
        if (!sheet) return;
        unmanageSheet({
          index: index,
          context: context,
          sheet: sheet,
          theme: theme
        });

        if (dynamicRules) {
          removeDynamicRules(sheet, dynamicRules);
        }
      };
    }, [state.sheet]);
    useEffectOrLayoutEffect(function () {
      // We only need to update the rules on a subsequent update and not in the first mount
      if (state.sheet && state.dynamicRules && !isFirstMount.current) {
        updateDynamicRules(data, state.sheet, state.dynamicRules);
      }
    }, [data]);
    useEffectOrLayoutEffect(function () {
      if (!isFirstMount.current) {
        var newSheet = createStyleSheet({
          context: context,
          styles: styles,
          name: name,
          theme: theme,
          index: index,
          sheetOptions: sheetOptions
        });
        var newDynamicRules = newSheet && addDynamicRules(newSheet, data);
        var newClasses = newSheet ? getSheetClasses(newSheet, newDynamicRules) : {};
        dispatch({
          type: 'updateSheet',
          payload: {
            sheet: newSheet,
            dynamicRules: newDynamicRules,
            classes: newClasses
          }
        });
      }
    }, [theme, context]); // $FlowFixMe

    React__default.useDebugValue(state.classes); // $FlowFixMe

    React__default.useDebugValue(theme === noTheme$1 ? 'No theme' : theme);
    React__default.useEffect(function () {
      isFirstMount.current = false;
    });
    return state.classes;
  };
};

var initialContext = {};

var JssProvider =
/*#__PURE__*/
function (_Component) {
  _inheritsLoose(JssProvider, _Component);

  function JssProvider() {
    var _this;

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _Component.call.apply(_Component, [this].concat(args)) || this;
    _this.managers = {};

    _this.createContext = function (parentContext, prevContext) {
      if (prevContext === void 0) {
        prevContext = initialContext;
      }

      var _this$props = _this.props,
          registry = _this$props.registry,
          classNamePrefix = _this$props.classNamePrefix,
          jss = _this$props.jss,
          generateId = _this$props.generateId,
          disableStylesGeneration = _this$props.disableStylesGeneration,
          media = _this$props.media,
          id = _this$props.id;

      var context = _extends({}, parentContext);

      if (registry) {
        context.registry = registry; // This way we identify a new request on the server, because user will create
        // a new Registry instance for each.

        if (registry !== _this.registry) {
          // We reset managers because we have to regenerate all sheets for the new request.
          _this.managers = {};
          _this.registry = registry;
        }
      }

      context.managers = _this.managers;

      if (id !== undefined) {
        context.id = id;
      }

      if (generateId !== undefined) {
        context.generateId = generateId;
      }

      if (!context.generateId || !prevContext || context.id !== prevContext.id) {
        context.generateId = defaultJss$1.createGenerateId(context.id);
      }

      if (classNamePrefix) {
        context.classNamePrefix += classNamePrefix;
      }

      if (media !== undefined) {
        context.media = media;
      }

      if (jss) {
        context.jss = jss;
      }

      if (disableStylesGeneration !== undefined) {
        context.disableStylesGeneration = disableStylesGeneration;
      }

      if (prevContext && shallowEqual.shallowEqualObjects(prevContext, context)) {
        return prevContext;
      }

      return context;
    };

    _this.prevContext = void 0;
    _this.generateId = void 0;
    _this.registry = void 0;

    _this.renderProvider = function (parentContext) {
      var children = _this.props.children;

      var context = _this.createContext(parentContext, _this.prevContext);

      _this.prevContext = context;
      return React__default.createElement(JssContext.Provider, {
        value: context
      }, children);
    };

    return _this;
  }

  var _proto = JssProvider.prototype;

  _proto.render = function render() {
    return React__default.createElement(JssContext.Consumer, null, this.renderProvider);
  };

  return JssProvider;
}(React.Component);

JssProvider.propTypes = {
  registry: PropTypes.instanceOf(defaultJss$1.SheetsRegistry),
  jss: PropTypes.instanceOf(defaultJss$1__default.constructor),
  generateId: PropTypes.func,
  classNamePrefix: PropTypes.string,
  disableStylesGeneration: PropTypes.bool,
  children: PropTypes.node.isRequired,
  media: PropTypes.string,
  id: PropTypes.shape({
    minify: PropTypes.bool
  })
};

/* eslint-disable react/prop-types, react/require-default-props */

var parseStyles = function parseStyles(args) {
  var dynamicStyles = [];
  var staticStyle;
  var labels = []; // Not using ...rest to optimize perf.

  for (var key in args) {
    var style = args[key];
    if (!style) continue;

    if (typeof style === 'function') {
      dynamicStyles.push(style);
    } else {
      if (!staticStyle) staticStyle = {};
      Object.assign(staticStyle, style);

      if (staticStyle.label) {
        if (labels.indexOf(staticStyle.label) === -1) labels.push(staticStyle.label);
      }
    }
  }

  var styles = {};
  var label = labels.length === 0 ? 'sc' : labels.join('-');

  if (staticStyle) {
    // Label should not leak to the core.
    if ('label' in staticStyle) delete staticStyle.label;
    styles[label] = staticStyle;
  } // When there is only one function rule, we don't need to wrap it.


  if (dynamicStyles.length === 1) {
    styles.scd = dynamicStyles[0];
  } // We create a new function rule which will call all other function rules
  // and merge the styles they return.


  if (dynamicStyles.length > 1) {
    styles.scd = function (props) {
      var merged = {};

      for (var i = 0; i < dynamicStyles.length; i++) {
        var dynamicStyle = dynamicStyles[i](props);
        if (dynamicStyle) Object.assign(merged, dynamicStyle);
      }

      return merged;
    };
  }

  return {
    styles: styles,
    label: label
  };
};

var shouldForwardPropSymbol = Symbol('react-jss-styled');

var getShouldForwardProp = function getShouldForwardProp(tagOrComponent, options) {
  var shouldForwardProp = options.shouldForwardProp; // $FlowIgnore that prop shouldn't be there.

  var childShouldForwardProp = tagOrComponent[shouldForwardPropSymbol];
  var finalShouldForwardProp = shouldForwardProp || childShouldForwardProp;

  if (shouldForwardProp && childShouldForwardProp) {
    finalShouldForwardProp = function finalShouldForwardProp(prop) {
      return childShouldForwardProp(prop) && shouldForwardProp(prop);
    };
  }

  return finalShouldForwardProp;
};

var getChildProps = function getChildProps(props, shouldForwardProp, isTag) {
  var childProps = {};

  for (var prop in props) {
    if (shouldForwardProp) {
      if (shouldForwardProp(prop) === true) {
        childProps[prop] = props[prop];
      }

      continue;
    } // We don't want to pass non-dom props to the DOM.


    if (isTag) {
      if (isPropValid(prop)) {
        childProps[prop] = props[prop];
      }

      continue;
    }

    childProps[prop] = props[prop];
  }

  return childProps;
};

var configureStyled = function configureStyled(tagOrComponent, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      theming$1 = _options.theming;
  var isTag = typeof tagOrComponent === 'string';
  var ThemeContext = theming$1 ? theming$1.context : theming.ThemeContext;
  var shouldForwardProp = getShouldForwardProp(tagOrComponent, options);
  return function createStyledComponent() {
    // eslint-disable-next-line prefer-rest-params
    var _parseStyles = parseStyles(arguments),
        styles = _parseStyles.styles,
        label = _parseStyles.label;

    var useStyles = createUseStyles(styles, options);

    var Styled = function Styled(props) {
      var as = props.as,
          className = props.className; // $FlowFixMe theming ThemeContext types need to be fixed.

      var theme = React__default.useContext(ThemeContext);
      var propsWithTheme = Object.assign({
        theme: theme
      }, props);
      var classes = useStyles(propsWithTheme);
      var childProps = getChildProps(props, shouldForwardProp, isTag); // $FlowIgnore we don't care label might not exist in classes.

      var classNames = ((classes[label] || classes.sc || '') + " " + (classes.scd || '')).trim();
      childProps.className = className ? className + " " + classNames : classNames;

      if (!isTag && shouldForwardProp) {
        // $FlowIgnore we are not supposed to attach random properties to component functions.
        tagOrComponent[shouldForwardPropSymbol] = shouldForwardProp;
      }

      if (isTag && as) {
        return React__default.createElement(as, childProps);
      }

      return React__default.createElement(tagOrComponent, childProps);
    };

    return Styled;
  };
};

/* eslint-disable prefer-rest-params, prefer-spread */
var create = function create(css) {
  if (css === void 0) {
    css = defaultCss;
  }

  return (// $FlowIgnore we don't care about the types here, since this is going to be called by the build tool.
    function createElement(type, props) {
      var args = arguments;

      if (props && props.css) {
        var className = css(props.css);
        var newProps = Object.assign({}, props);
        newProps.className = props.className ? props.className + " " + className : className;
        delete newProps.css;
        args[1] = newProps;
      } // $FlowIgnore


      return React__default.createElement.apply(undefined, args);
    }
  );
};
var jsx = create();

Object.defineProperty(exports, 'ThemeProvider', {
  enumerable: true,
  get: function () {
    return theming.ThemeProvider;
  }
});
Object.defineProperty(exports, 'createTheming', {
  enumerable: true,
  get: function () {
    return theming.createTheming;
  }
});
Object.defineProperty(exports, 'useTheme', {
  enumerable: true,
  get: function () {
    return theming.useTheme;
  }
});
Object.defineProperty(exports, 'withTheme', {
  enumerable: true,
  get: function () {
    return theming.withTheme;
  }
});
Object.defineProperty(exports, 'SheetsRegistry', {
  enumerable: true,
  get: function () {
    return defaultJss$1.SheetsRegistry;
  }
});
Object.defineProperty(exports, 'createGenerateId', {
  enumerable: true,
  get: function () {
    return defaultJss$1.createGenerateId;
  }
});
exports.JssContext = JssContext;
exports.JssProvider = JssProvider;
exports.createJsx = create;
exports.createUseStyles = createUseStyles;
exports.default = withStyles;
exports.jss = defaultJss;
exports.jsx = jsx;
exports.styled = configureStyled;
exports.withStyles = withStyles;