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

        // toggle visibility logic
        document.querySelectorAll('a.toggle-vis').forEach((el) => {
            el.addEventListener('click', function (e) {
                e.preventDefault();

                let columnIdx = e.target.getAttribute('data-column');
                let column = table.column(columnIdx);

                // Toggle the visibility
                column.visible(!column.visible());
                updateToggleLinkStyles(); // Update styles after toggle

                // Additional Trigger for Search Highlighting
                table.search(table.search()).draw();
            });
        });

        function updateToggleLinkStyles() {
            $('.toggle-vis').each(function () {
                const columnIdx = $(this).data('column');
                const column = table.column(columnIdx);

                if (column.visible()) {
                    $(this).addClass('visible-column');
                } else {
                    $(this).removeClass('visible-column');
                }
            });

        }
    })
    .catch(error => console.error('Error fetching JSON:', error));


$(document).ready(function () {

});