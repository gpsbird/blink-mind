import * as React from 'react';
import { RichTextEditor } from './rich-text-editor';
import { BlockType, FocusMode, OpType } from '@blink-mind/core';

export class TopicContentEditor extends RichTextEditor {
  getCustomizeProps = () => {
    const { model, topicKey } = this.props;
    const block = model.getTopic(topicKey).getBlock(BlockType.CONTENT).block;
    const readOnly = model.editingContentKey !== topicKey;
    const refKeyPrefix = 'content-editor';
    return {
      block,
      readOnly,
      refKeyPrefix,
      placeholder: ' '
    };
  };
  onChange = (value: () => string) => {
    this.operation(OpType.SET_TOPIC_CONTENT, {
      ...this.props,
      content: value
    });
  };

  onBlur = (value, editor, next) => {
    const { topicKey } = this.props;
    this.operation(OpType.FOCUS_TOPIC, {
      ...this.props,
      topicKey: topicKey,
      focusMode: FocusMode.NORMAL
    });
  };
}
