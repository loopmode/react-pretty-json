import PropTypes from 'prop-types';
import React from 'react';
import cx from 'classnames';
import style from './PrettyJson.css';
import pojo from './pojo';

// http://jsfiddle.net/unlsj/

/**
 * A component that displays json data as pretty-printed html.
 */
export default class PrettyJson extends React.PureComponent {
    static propTypes = {
        className: PropTypes.string,
        json: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        onPrettyPrint: PropTypes.func,
        onError: PropTypes.func,
    };
    static defaultProps = {
        json: {},
    };
    componentDidUpdate(prevProps) {
        if (prevProps.json !== this.props.json) {
            this.convertHtml(this.elementRef);
        }
    }
    render() {
        const { className, json, ...props } = this.props;
        const html = this.prettyPrint(json);
        return (
            <div className={cx(className, style.PrettyJson, 'PrettyJson')} {...props}>
                <pre>
                    <code dangerouslySetInnerHTML={{ __html: html }} ref={this.handleElementRef} />
                </pre>
            </div>
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
        var r = pIndent || '';
        if (pKey) r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal) r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    }
    prettyPrint(obj) {
        try {    
            obj = typeof obj === 'string' ? JSON.parse(obj) : pojo(obj);
            var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/gm;
            const html = JSON.stringify(obj, null, 3)
                .replace(/&/g, '&amp;')
                .replace(/\\"/g, '&quot;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(jsonLine, this.replacer);
            if (this.props.onPrettyPrint) {
                this.props.onPrettyPrint(html)
            }
            return html;
        }
        catch (error) {
            if (this.props.onError) {
                this.props.onError(error);
            }
        }
    }
    convertHtml(element) {
        if (element) {
            const nodes = [...element.querySelectorAll('.json-string')];
            const tabStyles = 'display: inline-block; width: 4em';
            nodes.forEach(node => {
                const withBreaks = str => str.replace(/\\n/g, '<br />');
                const withTabs = str => str.replace(/\\t/g, `<span style="${tabStyles}"></span>`);
                const current = node.innerHTML;
                const clean = withBreaks(withTabs(current));
                if (clean !== current) {
                    node.innerHTML = clean;
                }
            });
        }
    }
}
