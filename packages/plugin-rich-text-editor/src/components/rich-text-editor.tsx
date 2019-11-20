import * as React from 'react';
import { BaseWidget } from '@blink-mind/renderer-react';
import styled from 'styled-components';
import RichMarkDownEditor from 'awehook-rich-markdown-editor';
import debug from 'debug';
const log = debug('node:topic-content-editor');

interface NodeContentProps {
  readOnly?: boolean;
}

const NodeContent = styled.div<NodeContentProps>`
  padding: 6px;
  background-color: ${props => (props.readOnly ? null : 'white')};
  cursor: ${props => (props.readOnly ? 'pointer' : 'text')};
`;

export class RichTextEditor extends BaseWidget {
  onMouseDown = e => {
    e.stopPropagation();
  };

  onMouseMove = e => {
    e.stopPropagation();
  };
  onChange = (value: () => string) => {};

  onBlur = (event, editor, next) => {};

  getCustomizeProps = () => {
    return null;
  };

  render() {
    const { topicKey, saveRef } = this.props;
    const {
      block,
      readOnly,
      refKeyPrefix,
      placeholder
    } = this.getCustomizeProps();
    log('placeholder', placeholder);
    const content = block.data;
    if (content == null) return null;
    const key = `${refKeyPrefix}-${topicKey}`;
    const { onChange, onBlur, onMouseDown, onMouseMove } = this;
    const richEditorProps = {
      editorValue: content,
      readOnly,
      onChange,
      // onBlur,
      placeholder
    };

    const nodeContentProps = {
      key,
      readOnly,
      ref: saveRef(key),
      onMouseDown,
      onMouseMove
    };
    return (
      <NodeContent {...nodeContentProps}>
        <RichMarkDownEditor {...richEditorProps} />
      </NodeContent>
    );
  }
}
