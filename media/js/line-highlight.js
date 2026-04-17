(function() {
  function highlightLines() {
    var hash = window.location.hash;
    if (!hash) return;

    // Parse #L5 or #L5-L10 format
    var match = hash.match(/^#L(\d+)(?:-L?(\d+))?$/);
    if (!match) return;

    var startLine = parseInt(match[1], 10);
    var endLine = match[2] ? parseInt(match[2], 10) : startLine;

    // Find code block (assume first/only one on code file pages)
    var codeBlock = document.querySelector('.sourceCode');
    if (!codeBlock) return;

    // Get the code block ID prefix (e.g., "cb1")
    var firstLine = codeBlock.querySelector('span[id^="cb"]');
    if (!firstLine) return;
    var prefix = firstLine.id.replace(/-\d+$/, '');

    // Highlight lines in range
    for (var i = startLine; i <= endLine; i++) {
      var lineEl = document.getElementById(prefix + '-' + i);
      if (lineEl) {
        lineEl.classList.add('line-highlight');
      }
    }

    // Scroll first highlighted line into view
    var firstHighlight = document.getElementById(prefix + '-' + startLine);
    if (firstHighlight) {
      firstHighlight.scrollIntoView({ block: 'center' });
    }
  }

  // Run on page load and hash change
  document.addEventListener('DOMContentLoaded', highlightLines);
  window.addEventListener('hashchange', function() {
    // Clear previous highlights
    document.querySelectorAll('.line-highlight').forEach(function(el) {
      el.classList.remove('line-highlight');
    });
    highlightLines();
  });
})();
