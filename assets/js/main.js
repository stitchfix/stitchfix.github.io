jQuery(function( $ ) {
    var $jobList = $( '.joblist' ).children();

    $( document ).on( 'click', '.js-nav-filter', function( ev ) {
        ev.preventDefault();

        var $t = $( this );

        var kind = $t.data( 'kind' );
        var target = $t.attr( 'href' ).substr( 1 );

        $jobList.show();

        if ( target ) {
            var filtered = $jobList.filter( function( item ) {
                return $( this ).data( kind ) !== target;
            });

            filtered.hide();
        }

        $t.closest( '.nav-filter' )
            .find( '.expand-input' )
                .attr( 'checked', function() {
                    return !$( this ).prop( 'checked' )
                })
                .end()
            .find( '.filterlabel' )
                .text( $t.text() );
    });

    $( '.js-nav-filter-fill' ).each( function() {
        var $t = $( this );
        var i;
        var l;

        var kind = $t.data( 'kind' );

        var items = $jobList.map( function() {
                return $.trim( $( this ).data( kind ) );
            });

        var filtered = [];

        for ( i = 0, l = items.length; i < l; i++ ) {
            if ( !!items[ i ] && $.inArray( items[ i ], filtered ) < 0 ) {
                filtered.push( items[ i ] );
            }
        }

        $.each( filtered, function() {
            var elem = $( '<a />' );

            elem.attr( 'href', '#' + this );
            elem.text( this );
            elem.addClass( 'dropdownitem' )
            elem.addClass( 'js-nav-filter' );
            elem.data( 'kind', kind );

            $t.append( elem );
        });
    });
});
