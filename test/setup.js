(function() {
  window.React = {
    useEffect: function(effect) {
      var cleanup = effect();
      if (typeof cleanup === 'function') {
        cleanup();
      }
    }
  };
  window.Vue = {};

  window.jasmine = window.jasmine || {};

  var styleFixtures = {
    fixturesPath: '',
    set load(fileName) {
      this.cleanUp();
      var link = document.createElement('link');
      link.id = 'jasmine-style-fixture';
      link.rel = 'stylesheet';
      var path = this.fixturesPath;
      if (path.indexOf('/') !== 0) {
        path = '/' + path;
      }
      link.href = path + '/' + fileName;
      document.head.appendChild(link);
    },
    cleanUp: function() {
      var link = document.getElementById('jasmine-style-fixture');
      if (link) {
        link.parentNode.removeChild(link);
      }
    }
  };

  var htmlFixtures = {
    fixturesPath: '',
    load: function(fileName) {
      this.cleanUp();
      var xhr = new XMLHttpRequest();
      var path = this.fixturesPath;
      if (path.indexOf('/') !== 0) {
        path = '/' + path;
      }
      var url = path + '/' + fileName;
      xhr.open('GET', url, false); // synchronous request
      xhr.send(null);

      if (xhr.status >= 200 && xhr.status < 300) {
        var container = document.createElement('div');
        container.id = 'jasmine-fixture-container';
        container.innerHTML = xhr.responseText;
        document.body.appendChild(container);
      } else {
        throw new Error('Failed to load fixture: ' + url + ' (status: ' + xhr.status + ')');
      }
    },
    cleanUp: function() {
      var container = document.getElementById('jasmine-fixture-container');
      if (container) {
        container.parentNode.removeChild(container);
      }
    }
  };

  window.jasmine.getStyleFixtures = function() {
    return styleFixtures;
  };

  window.jasmine.getFixtures = function() {
    return htmlFixtures;
  };
})();
