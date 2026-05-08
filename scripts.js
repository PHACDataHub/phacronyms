let fuse; // accessible outside the fetch

const data = fetch('data.json')
    .then(response => response.json())
    .then(data => {

        // --- Fuse setup ---
        fuse = new Fuse(data, {
            keys: ['acronym', 'definition'],
            threshold: 0.3,       // 0 = exact, 1 = match anything
            minMatchCharLength: 1
        });

        // --- existing DataTable setup (unchanged) ---
        const table = $('#phacronymTable').DataTable({
            data: data,
            columns: [
                { data: "acronym" },
                { data: "definition" },
            ]
        });

        table.on('draw', function () {
            var body = $(table.table().body());
            body.unhighlight();
            if (table.rows({ filter: 'applied' }).data().length) {
                body.highlight(table.search());
            }
        });
    })
    .catch(error => console.error('Error fetching JSON:', error));


$(document).ready(function () {

    $('#fuseSearch').on('input', function () {
        const query = this.value.trim();
        const $results = $('#fuseResults');

        if (!fuse || query.length < 1) {
            $results.hide().empty();
            return;
        }

        const hits = fuse.search(query, { limit: 10 });
        $results.empty();

        if (hits.length === 0) {
            $results.append('<li class="list-group-item text-muted">No results</li>');
        } else {
            hits.forEach(({ item }) => {
                $results.append(
                    `<li class="list-group-item">
                        <strong>${item.acronym.toUpperCase()}</strong> — ${item.definition}
                    </li>`
                );
            });
        }

        $results.show();
    });

});