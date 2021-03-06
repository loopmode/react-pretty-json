"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _taggedTemplateLiteral2 = require("babel-runtime/helpers/taggedTemplateLiteral");

var _taggedTemplateLiteral3 = _interopRequireDefault(_taggedTemplateLiteral2);

var _templateObject = (0, _taggedTemplateLiteral3.default)(["\n    pre {\n        background-color: ghostwhite;\n        border: 1px solid silver;\n        padding: 10px 20px;\n        margin: 0;\n        overflow: auto;\n    }\n\n    .json-key {\n        color: brown;\n    }\n\n    .json-value {\n        color: navy;\n    }\n\n    .json-string {\n        color: olive;\n    }\n"], ["\n    pre {\n        background-color: ghostwhite;\n        border: 1px solid silver;\n        padding: 10px 20px;\n        margin: 0;\n        overflow: auto;\n    }\n\n    .json-key {\n        color: brown;\n    }\n\n    .json-value {\n        color: navy;\n    }\n\n    .json-string {\n        color: olive;\n    }\n"]);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _pojo = require("./pojo");

var _pojo2 = _interopRequireDefault(_pojo);

var _styledComponents = require("styled-components");

var _styledComponents2 = _interopRequireDefault(_styledComponents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StyledContainer = _styledComponents2.default.div(_templateObject);

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

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = PrettyJson.__proto__ || Object.getPrototypeOf(PrettyJson)).call.apply(_ref, [this].concat(args))), _this), _this.warnLegacyProp = process.env.NODE_ENV !== "production" ? function (oldProp, newProp) {
            return console.warn("[PrettyJson] The prop \"" + oldProp + "\" is deprecated. Please use \"" + newProp + "\" instead.");
        } : null, _this.handleElementRef = function (ref) {
            _this.elementRef = ref;
            if (ref) {
                _this.convertHtml(ref);
            }
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(PrettyJson, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            if (process.env.NODE_ENV !== "production") {
                if (this.props.json) {
                    this.warnLegacyProp("json", "data");
                }
            }
        }
    }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate(prevProps) {
            if (prevProps.json !== this.props.json || prevProps.data !== this.props.data) {
                if (process.env.NODE_ENV !== "production") {
                    if (this.props.json) {
                        this.warnLegacyProp("json", "data");
                    }
                }
                this.convertHtml(this.elementRef);
            }
        }
    }, {
        key: "render",
        value: function render() {
            var _props = this.props,
                className = _props.className,
                data = _props.data,
                json = _props.json,
                props = (0, _objectWithoutProperties3.default)(_props, ["className", "data", "json"]);

            var html = this.prettyPrint(data || json);
            return _react2.default.createElement(
                StyledContainer,
                (0, _extends3.default)({ className: (0, _classnames2.default)(className, "PrettyJson") }, props),
                _react2.default.createElement(
                    "pre",
                    null,
                    _react2.default.createElement("code", {
                        dangerouslySetInnerHTML: { __html: html },
                        ref: this.handleElementRef
                    })
                )
            );
        }
    }, {
        key: "replacer",
        value: function replacer(match, pIndent, pKey, pVal, pEnd) {
            var key = '<span class="json-key">';
            var val = '<span class="json-value">';
            var str = '<span class="json-string">';
            var r = pIndent || "";
            if (pKey) r = r + key + pKey.replace(/[": ]/g, "") + "</span>: ";
            if (pVal) r = r + (pVal[0] === '"' ? str : val) + pVal + "</span>";
            return r + (pEnd || "");
        }
    }, {
        key: "prettyPrint",
        value: function prettyPrint(obj) {
            if (!obj) {
                return "";
            }
            try {
                obj = typeof obj === "string" ? JSON.parse(obj) : (0, _pojo2.default)(obj);
                var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
                var html = JSON.stringify(obj, null, 3).replace(/&/g, "&amp;").replace(/\\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(jsonLine, this.replacer);
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
        key: "convertHtml",
        value: function convertHtml(element) {
            if (element) {
                var nodes = [].concat((0, _toConsumableArray3.default)(element.querySelectorAll(".json-string")));
                var tabStyles = "display: inline-block; width: 4em";
                nodes.forEach(function (node) {
                    var withBreaks = function withBreaks(str) {
                        return str.replace(/\\n/g, "<br />");
                    };
                    var withTabs = function withTabs(str) {
                        return str.replace(/\\t/g, "<span style=\"" + tabStyles + "\"></span>");
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
    // @since 1.0.3
    data: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    // @since 1.0.3 legacy alias for "data"
    // TODO maybe drop legacy support?
    json: _propTypes2.default.oneOfType([_propTypes2.default.object, _propTypes2.default.string]),
    onPrettyPrint: _propTypes2.default.func,
    onError: _propTypes2.default.func
};
exports.default = PrettyJson;