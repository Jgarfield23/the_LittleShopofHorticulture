
$(document).ready(function() {
    var plantList = $("#plantList");

    $.ajax({
        url: "http://localhost:3000/api/plants",
        method: "GET",
        dataType: "json",
        success: function(data) {
            if (data && data.length > 0) {
                data.forEach(function(plant) {
                    var listItem = $("<li>").text(plant.name + " - $" + plant.price);
                    plantList.append(listItem);
                });
            } else {
                var listItem = $("<li>").text("No plants available.");
                plantList.append(listItem);
            }
        },
        error: function() {
            var listItem = $("<li>").text("Failed to fetch plants.");
            plantList.append(listItem);
        }
    });
});