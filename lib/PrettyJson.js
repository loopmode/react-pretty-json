'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PrettyJson = require('./PrettyJson.css');

var _PrettyJson2 = _interopRequireDefault(_PrettyJson);

var _pojo = require('./pojo');

var _pojo2 = _interopRequireDefault(_pojo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// http://jsfiddle.net/unlsj/

/**
 * A component that displays json data as pretty-printed html.
 */
var PrettyJson = function (_React$PureComponent) {
    (0, _inherits3.default)(PrettyJson, _React$PureComponent);

    function PrettyJson() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, PrettyJson);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PrettyJson.__proto__ || Object.getPrototypeOf(PrettyJson)).call.apply(_ref, [this].concat(args))), _this), _this.handleElementRef = function (ref) {
            _this.elementRef = ref;
            if (ref) {
                _this.convertHtml(ref);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(PrettyJson, [{
        key: 'componentDidUpdate',
        value: function componentDidUpdate(prevProps) {
            if (prevProps.json !== this.props.json || prevProps.data !== this.props.data) {
                if (this.props.data && process.env.NODE_ENV !== 'production') {
                    console.warn('[PrettyJson] The "json" prop is deprecated as of 1.0.3. Please use "data" instead.');
                }
                this.convertHtml(this.elementRef);
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var _props = this.props,
                className = _props.className,
                data = _props.data,
                json = _props.json,
                props = (0, _objectWithoutProperties3.default)(_props, ['className', 'data', 'json']);

            var html = this.prettyPrint(data || json);
            return _react2.default.createElement(
                'div',
                (0, _extends3.default)({ className: (0, _classnames2.default)(className, _PrettyJson2.default.PrettyJson, 'PrettyJson') }, props),
                _react2.default.createElement(
                    'pre',
                    null,
                    _react2.default.createElement('code', { dangerouslySetInnerHTML: { __html: html }, ref: this.handleElementRef })
                )
            );
        }
    }, {
        key: 'replacer',
        value: function replacer(match, pIndent, pKey, pVal, pEnd) {
            var key = '<span class="json-key">';
            var val = '<span class="json-value">';
            var str = '<span class="json-string">';
            var r = pIndent || '';
            if (pKey) r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
            if (pVal) r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
            return r + (pEnd || '');
        }
    }, {
        key: 'prettyPrint',
        value: function prettyPrint(obj) {
            try {
                obj = typeof obj === 'string' ? JSON.parse(obj) : (0, _pojo2.default)(obj);
                var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
                var html = JSON.stringify(obj, null, 3).replace(/&/g, '&amp;').replace(/\\"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(jsonLine, this.replacer);
                if (this.props.onPrettyPrint) {
                    this.props.onPrettyPrint(html);
                }
                return html;
            } catch (error) {
                if (this.props.onError) {
                    this.props.onError(error);
                }
            }
        }
    }, {
        key: 'convertHtml',
        value: function convertHtml(element) {
            if (element) {
                var nodes = [].concat((0, _toConsumableArray3.default)(element.querySelectorAll('.json-string')));
                var tabStyles = 'display: inline-block; width: 4em';
                nodes.forEach(function (node) {
                    var withBreaks = function withBreaks(str) {
                        return str.replace(/\\n/g, '<br />');
                    };
                    var withTabs = function withTabs(str) {
                        return str.replace(/\\t/g, '<span style="' + tabStyles + '"></span>');
                    };
                    var current = node.innerHTML;
                    var clean = withBreaks(withTabs(current));
                    if (clean !== current) {
                        node.innerHTML = clean;
                    }
                });
            }
        }
    }]);
    return PrettyJson;
}(_react2.default.PureComponent);

PrettyJson.propTypes = {
    className: _propTypes2.default.string,
    data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    // legacy for data
    json: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    onPrettyPrint: _propTypes2.default.func,
    onError: _propTypes2.default.func
};
PrettyJson.defaultProps = {
    json: {}
};
exports.default = PrettyJson;