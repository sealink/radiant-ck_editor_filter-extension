/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.html or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {

  config.startupOutlineBlocks = true;
  config.autoParagraph = false;
  config.skin = "moono";
  config.extraPlugins = 'codemirror,scayt,autogrow,MediaEmbed';
  config.colorButton_enableMore = false;
  // Code Cleanup
  config.protectedSource.push(/<r:([\S]+)*>.*<\/r:\1>/g);
  config.protectedSource.push(/<r:[^>\/]*\/>/g);
  config.emailProtection = "encode";
  config.forcePasteAsPlainText = true;
  config.pasteFromWordPromptCleanup = true;
  config.pasteFromWordNumberedHeadingToList = true;
  // Auto Spell correct
  config.scayt_autoStartup = true;
  // Autogrow settings
  config.height = 300;
  config.autoGrow_onStartup = true;
  config.autoGrow_maxHeight = 800;
  config.autoGrow_minHeight = 300;
  config.autoGrow_bottomSpace = 20;
  // For allowing classes on divs - http://docs.ckeditor.com/#!/api/CKEDITOR.config
  config.allowedContent = true;
  // Nice source highlighting
  config.codemirror = {
    highlightActiveLine: false,
    theme: 'rubyblue'
  };
  // Your custom stylesheet
  // config.contentsCss = '/stylesheets/bootstrap.css';
  config.toolbar = [
    ['Format'],
    ['Bold','Italic','Strike','-','Subscript','Superscript'],
    ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
    ['Undo','Redo','-','Find','Replace','-', 'Paste', 'RemoveFormat', 'Scayt'],
    ['Link','Unlink','Anchor'],
    ['Image', 'MediaEmbed', 'Table','HorizontalRule','SpecialChar','-','ShowBlocks'],
    ['Source']
  ];
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
};
