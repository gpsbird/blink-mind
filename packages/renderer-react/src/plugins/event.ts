import { FocusMode, OpType } from '@blink-mind/core';

import debug from 'debug';

const log = debug('plugin:event');

export function EventPlugin() {
  return {
    handleTopicClick(props) {
      log('handleTopicClick');
      const { controller, model, topicKey } = props;
      if (model.editingDescKey !== null) return;
      if (model.editingContentKey === topicKey) return;
      if (
        model.focusKey === topicKey &&
        model.focusMode === FocusMode.EDITING_CONTENT
      )
        return;
      controller.run('operation', {
        ...props,
        opType: OpType.FOCUS_TOPIC,
        focusMode: FocusMode.NORMAL
      });
    },

    handleTopicDoubleClick(props) {
      const { controller, model } = props;
      if (model.editingDescKey !== null) return;
      controller.run('operation', {
        ...props,
        opType: OpType.FOCUS_TOPIC,
        focusMode: FocusMode.EDITING_CONTENT
      });
    },

    handleTopicContextMenu(props) {
      const { controller } = props;
      controller.run('operation', {
        ...props,
        opType: OpType.FOCUS_TOPIC,
        focusMode: FocusMode.SHOW_POPUP
      });
    },

    handleActiveModalClose(props) {
      const { controller } = props;
      const activeModalProps = controller.run('getActiveModalProps', props);
      if (activeModalProps == null) return null;
      if (activeModalProps.name === 'edit-desc') {
        return function() {
          controller.run('operation', {
            ...props,
            focusMode: FocusMode.NORMAL,
            opType: OpType.FOCUS_TOPIC
          });
        };
      }
    }
  };
}
