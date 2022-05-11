jQuery(document).ready(function() {
    function normalizeSidebarLink(href) {
        var parser = document.createElement('a');
        parser.href = href;

        return new URL(`${parser.protocol}//${parser.host}${parser.pathname}${parser.search}${parser.hash}`);
    }

    function isRequireReload(link, addrRef) {
        return (link.pathname !== addrRef.pathname || link.search !== addrRef.search);
    }

    // Some menu item has hash link and other has action=domain....
    // So, we make sure that the hash works by redirect the hash to action=domaindetails#someHash.
    if (window.location.search.indexOf('?action=domain') > -1 && window.location.search.indexOf('?action=domaindetails&') === -1) {
        jQuery(".list-group-tab-nav a").off('click');

        // Sidebar active class toggle
        jQuery(".list-group-tab-nav a").on('click', function() {
            if (jQuery(this).hasClass('disabled')) {
                return false;
            }

            var href = this.href;
            if (this.href[0] === '#') {
                var href = normalizeSidebarLink(this.href);
            }

            if (isRequireReload(href, window.location)) {
                window.location = href.toString();
            }

            var urlFragment = this.href.split('#')[1];
            if (urlFragment) {
                // set the fragment in the URL bar for bookmarking and such.
                window.location.hash = '#' + urlFragment;
            }
        });
    }


    // Undo selected active on Primary sidebar when secondary sidebar item selected and vice versa
    $('.card-sidebar .list-group-tab-nav a').on('click', function () {
        if (this.href[0] === '#' || this.href.indexOf(window.location.hostname + '/#') !== -1) {
            $('.card-sidebar .list-group-tab-nav a').removeClass('active');
        }
    });
});
