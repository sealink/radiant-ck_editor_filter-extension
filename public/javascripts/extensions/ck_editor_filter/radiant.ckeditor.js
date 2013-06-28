function instantiateCkEditor(partIndex){
  // Fixes parts with underscores or spaces in the name
  partIndex = partIndex.replace(/(_| )/g,'-');

  CKEDITOR.config.extraPlugins = 'autogrow,codemirror,scayt,showblocks';

  CKEDITOR.config.startupOutlineBlocks = true;
  CKEDITOR.config.autoParagraph = false;
  CKEDITOR.config.skin = "moono";
  CKEDITOR.config.colorButton_enableMore = false;
  // Code Cleanup
  CKEDITOR.config.protectedSource.push(/<r:([\S]+)*>.*<\/r:\1>/g);
  CKEDITOR.config.protectedSource.push(/<r:[^>\/]*\/>/g);
  CKEDITOR.config.emailProtection = "encode";
  CKEDITOR.config.forcePasteAsPlainText = true;
  CKEDITOR.config.pasteFromWordPromptCleanup = true;
  CKEDITOR.config.pasteFromWordNumberedHeadingToList = true;
  // Auto Spell correct
  CKEDITOR.config.scayt_autoStartup = true;
  // Autogrow settings
  CKEDITOR.config.height = 300;
  CKEDITOR.config.autoGrow_onStartup = true;
  CKEDITOR.config.autoGrow_maxHeight = 800;
  CKEDITOR.config.autoGrow_minHeight = 300;
  CKEDITOR.config.autoGrow_bottomSpace = 20;
  // For allowing classes on divs - http://docs.ckeditor.com/#!/api/CKEDITOR.config
  CKEDITOR.config.allowedContent = true;
  // Nice source highlighting
  CKEDITOR.config.codemirror = {
    highlightActiveLine: false,
    theme: 'rubyblue'
  };
  // Your custom stylesheet
  // CKEDITOR.config.contentsCss = '/stylesheets/bootstrap.css';
  CKEDITOR.config.toolbar =
  [
    ['Format'],
    ['Bold','Italic','Strike','-','Subscript','Superscript'],
    ['NumberedList','BulletedList','-','Outdent','Indent','Blockquote'],
    ['Undo','Redo','-','Find','Replace','-', 'Paste', 'RemoveFormat'],
    ['Link','Unlink','Anchor'],
    ['Image','Table','HorizontalRule','SpecialChar','-','ShowBlocks'],
    ['Source']
  ],
  CKEDITOR.on('instanceReady',
    function( evt ) {
      var editor = evt.editor;
      var ck_holder = $("cke_" + editor.name);
      if(ck_holder){
        Droppables.add(ck_holder, {
          accept: 'asset',
          onDrop: function(element) {
            var link = element.select('a.bucket_link')[0];
            var classes = element.className.split(' ');
            var tag_type = classes[0];
            if(tag_type == 'image') {
              var tag = '<img src="'+ link.href +'" />';
            }
            else {
              var asset_id = element.id.split('_').last();
              var tag = '<a href="'+ link.href +'">'+ link.title +'</a>';
            }
            var element = CKEDITOR.dom.element.createFromHtml(tag);
            editor.insertElement(element);
          }
        });
      }
    }
  );

  var usedFilter = $('part_' + partIndex +'_filter_id');
  if(usedFilter.value == 'CKEditor'){
    putInEditor(partIndex);
  }

  var timer = setInterval(function() {
    // Make image asset draggable
    Asset.MakeDraggables;
    // Make asset bucket thumbnails draggable
    $$('div.resized').each(function(element){
      if(!element.hasClassName("move"));
        new Draggable(element, { revert: true });
        element.addClassName('move');
    });
  }, 5000);

}

function toggleEditor(partIndex){
  var filterId = $('part_' + partIndex + '_filter_id');
  if(filterId.value == 'CKEditor'){
    putInEditor(partIndex);
  } else {
    removeEditor(partIndex);
  }
}

function removeEditor(partIndex){
  var instance = CKEDITOR.instances['part_'+ partIndex +'_content'];
  instance.destroy();
}

function putInEditor(partIndex){
  var textarea = $('part_' + partIndex + '_content');
  CKEDITOR.replace(textarea);
}

InsertIntoCk = Behavior.create({
  onclick: function(e) {
    if (e) e.stop();
    var part_name = TabControlBehavior.instances[0].controller.selected.caption;
    var textbox = $('part_' + part_name + '_content');

    var tag_parts = this.element.getAttribute('rel').split('_');
    var href = this.element.getAttribute('href');
    var tag_name = tag_parts[0];
    var asset_size = tag_parts[1];
    var asset_id = tag_parts[2];

    if($('part_' + part_name + '_filter_id').value == 'CKEditor'){
      editor = CKEDITOR.instances['part_'+ part_name +'_content'];
      if(tag_name == 'image') {
        editor.insertHtml("<img src=\"" + href + "\" alt=\"\" />");
      } else {
        editor.insertHtml("<a href=\"" + href + "\">" + this.element.up(".back").down(".title").innerHTML + "</a>");
      }
    }
  }
});
