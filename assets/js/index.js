


$("#add_foodItem").submit(function (event) {
    alert("Food item inserted to menu Successfully!");
})

$("#update_foodItem").submit(function (event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function (n, i) {
        data[n['name']] = n['value']
    })


    var request = {
        "url": `http://localhost:3000/api/foodItems/${data.id}`,
        "method": "PUT",
        "data": data
    }

    $.ajax(request).done(function (response) {
        alert("Food Item Updated Successfully!");
    })

})

if (window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function () {
        var id = $(this).attr("data-id")

        var request = {
            "url": `http://localhost:3000/api/foodItems/${id}`,
            "method": "DELETE"
        }

        if (confirm("Do you really want to delete this item from the menu?")) {
            $.ajax(request).done(function (response) {
                alert("Item Deleted Successfully!");
                location.reload();
            })
        }

    })
}