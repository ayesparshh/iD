import { t } from '../core/localizer';
import { uiConfirm } from './confirm';

/** @param {iD.Context} context */
export function uiAsyncModal(context) {
  let _modal;

  /**
   * Open a model, and returns a promise. The promise
   * resolves with `true` if the user clicked 'Okay',
   * or `false` if they clicked 'Cancel'
   * @returns {Promise<boolean>}
   */
  function open(title, subtitle) {
    return new Promise((resolve) => {
      context.container().call(selection => {
        _modal = uiConfirm(selection).okButton();

        _modal.select('.modal-section.header')
          .append('h3')
          .call(title);

        // insert the modal body
        const textSection = _modal.select('.modal-section.message-text');
        textSection.call(subtitle);

        // insert a cancel button
        const buttonSection = _modal.select('.modal-section.buttons');

        buttonSection
          .insert('button', '.ok-button')
          .attr('class', 'button cancel-button secondary-action')
          .call(t.append('confirm.cancel'));


        buttonSection.select('.cancel-button')
          .on('click.cancel', () => {
            _modal.remove();
            resolve(false);
          });

        buttonSection.select('.ok-button')
          .on('click.save', () => resolve(true));
      });
    });
  }

  function close() {
    _modal.remove();
    _modal = undefined;
  }


  return { open, close };
}
