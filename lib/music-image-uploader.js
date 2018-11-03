'use babel';

import MusicImageUploaderView from './music-image-uploader-view';
import { CompositeDisposable } from 'atom';

export default {

  musicImageUploaderView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.musicImageUploaderView = new MusicImageUploaderView(state.musicImageUploaderViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.musicImageUploaderView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'music-image-uploader:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.musicImageUploaderView.destroy();
  },

  serialize() {
    return {
      musicImageUploaderViewState: this.musicImageUploaderView.serialize()
    };
  },

  toggle() {
    console.log('MusicImageUploader was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
