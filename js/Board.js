var board = {
  name: "Kanban Board",
  createColumn: function(column) {
    this.$element.append(column.$element);
    initSortable();
  },
  $element: $("#board .column-container")
};

$(".create-column").click(function() {
  var name = prompt("Enter a column name");
  if (name) {
    createAjaxColumn(name);
  } else if (name.length === 0) {
    createAjaxColumn("Empty Column");
  }
});

function createAjaxColumn(columnName) {
  $.ajax({
    url: baseUrl + "/column",
    method: "POST",
    data: {
      name: columnName
    },
    success: function(response) {
      var column = new Column(response.id, columnName);
      board.createColumn(column);
    }
  });
}

function initSortable() {
  $(".column-card-list")
    .sortable({
      connectWith: ".column-card-list",
      placeholder: "card-placeholder"
    })
    .disableSelection();
}
