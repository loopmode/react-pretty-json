import PropTypes from "prop-types";
import React from "react";
import cx from "classnames";
import pojo from "./pojo";

import styled from "styled-components";

const StyledContainer = styled.div`
    pre {
        background-color: ghostwhite;
        border: 1px solid silver;
        padding: 10px 20px;
        margin: 0;
        overflow: auto;
    }

    .json-key {
        color: brown;
    }

    .json-value {
        color: navy;
    }

    .json-string {
        color: olive;
    }
`;

// http://jsfiddle.net/unlsj/

/**
 * A component that displays json data as pretty-printed html.
 */
export default class PrettyJson extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        // @since 1.0.3
        data: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        // @since 1.0.3 legacy alias for "data"
        // TODO maybe drop legacy support?
        json: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        onPrettyPrint: PropTypes.func,
        onError: PropTypes.func
    };
    warnLegacyProp =
        process.env.NODE_ENV !== "production"
            ? (oldProp, newProp) =>
                  console.warn(
                      `[PrettyJson] The prop "${oldProp}" is deprecated. Please use "${newProp}" instead.`
                  )
            : null;
    componentDidMount() {
        if (process.env.NODE_ENV !== "production") {
            if (this.props.json) {
                this.warnLegacyProp("json", "data");
            }
        }
    }
    componentDidUpdate(prevProps) {
        if (
            prevProps.json !== this.props.json ||
            prevProps.data !== this.props.data
        ) {
            if (process.env.NODE_ENV !== "production") {
                if (this.props.json) {
                    this.warnLegacyProp("json", "data");
                }
            }
            this.convertHtml(this.elementRef);
        }
    }
    render() {
        const { className, data, json, ...props } = this.props;
        const html = this.prettyPrint(data || json);
        return (
            <StyledContainer className={cx(className, "PrettyJson")} {...props}>
                <pre>
                    <code
                        dangerouslySetInnerHTML={{ __html: html }}
                        ref={this.handleElementRef}
                    />
                </pre>
            </StyledContainer>
        );
    }
    handleElementRef = ref => {
        this.elementRef = ref;
        if (ref) {
            this.convertHtml(ref);
        }
    };
    replacer(match, pIndent, pKey, pVal, pEnd) {
        var key = '<span class="json-key">';
        var val = '<span class="json-value">';
        var str = '<span class="json-string">';
        var r = pIndent || "";
        if (pKey) r = r + key + pKey.replace(/[": ]/g, "") + "</span>: ";
        if (pVal) r = r + (pVal[0] === '"' ? str : val) + pVal + "</span>";
        return r + (pEnd || "");
    }
    prettyPrint(obj) {
        if (!obj) {
            return "";
        }
        try {
            obj = typeof obj === "string" ? JSON.parse(obj) : pojo(obj);
            var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
            const html = JSON.stringify(obj, null, 3)
                .replace(/&/g, "&amp;")
                .replace(/\\"/g, "&quot;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(jsonLine, this.replacer);
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
    convertHtml(element) {
        if (element) {
            const nodes = [...element.querySelectorAll(".json-string")];
            const tabStyles = "display: inline-block; width: 4em";
            nodes.forEach(node => {
                const withBreaks = str => str.replace(/\\n/g, "<br />");
                const withTabs = str =>
                    str.replace(/\\t/g, `<span style="${tabStyles}"></span>`);
                const current = node.innerHTML;
                const clean = withBreaks(withTabs(current));
                if (clean !== current) {
                    node.innerHTML = clean;
                }
            });
        }
    }
}
