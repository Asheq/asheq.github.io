Polymer({
  is: 'vim-normal-keys-app',
  properties: {
    keys: {
      type: Object,
      value: function() {}
    },
    descriptionDisplayOrder: {
      type: Array,
      value: function() {
        return ['shift', 'control', 'g', 'z', 'squareBracket', 'gShift', 'zShift', 'squareBracketShift'];
      }
    },
    showDescription: {
      type: Boolean,
      value: true
    }
  },
  ready: function() {
    var el = this;
    $.get('../../data/default-normal-mode-keys.json', function(data) {
      el.keys = el._augmentKeysData(data).keys;
    });
  },
  _augmentKeysData: function(data) {
    var el = this;
    // Not a pure function
    data.keys.forEach(function(keyObj) {
      var variationObj = keyObj.variations;
      for (variation in variationObj) {
        if (variationObj.hasOwnProperty(variation)) {
          variationObj[variation].prettyDisplay = el._getVariationPrefix(variation) + el._getKeyCase(keyObj, variation);
        }
      }
    });
    return data;
  },
  _toArray: function(obj) {
    var arr =  Object.keys(obj).map(function(key) {
      return {
        name: key,
        value: obj[key]
      };
    });

    var el = this;
    arr.sort(function(a, b) {
      return el.descriptionDisplayOrder.indexOf(a.name) > el.descriptionDisplayOrder.indexOf(b.name);
    });
    return arr;
  },
  _getVariationPrefix(variation) {
    return {
      'solo': '',
      'shift': '',
      'control': '^',
      'g': 'g',
      'z': 'z',
      'squareBracket': '[',
      'gShift': 'g',
      'zShift': 'z',
      'squareBracketShift': '[',
    }[variation];
  },
  _getKeyCase(keyObj, variation) {
    var variationsWithShift = ['shift', 'gShift', 'zShift', 'squareBracketShift'];
    var key;
    if (variationsWithShift.indexOf(variation) > -1) {
      key = keyObj.shiftKey;
    } else {
      key = keyObj.baseKey;
    }
    return key;
  }
});
