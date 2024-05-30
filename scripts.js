//get the catalogue data from the JSON file
const data = fetch('data.json')
    .then(response => response.json())
    .then(data => {
        //console.log(data); // Your JSON data as an array

        // initializes the DataTables table
        const table = $('#phacronymTable').DataTable({
            data: data,
            columns: [
                { data: "acronym" },
                { data: "definition" },
            ]
            
        });
        
        // highlight word that's being searched
        table.on('draw', function () {
            var body = $(table.table().body());

            body.unhighlight();

            if ( table.rows( { filter: 'applied' } ).data().length ) {
                body.highlight( table.search() );
            }
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));


$(document).ready(function () {

});